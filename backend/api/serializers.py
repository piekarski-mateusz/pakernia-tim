from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Measurement, TrainingDay, TrainingExercise, TrainingPlan, TrainingPlanExercise


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'password']
        read_only_fields = ['id']

    def create(self, validated_data):
        email = validated_data['email'].lower()
        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=validated_data.get('first_name', ''),
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = ['id', 'date', 'chest', 'thigh', 'arm', 'belly', 'created_at']
        read_only_fields = ['id', 'created_at']


class TrainingExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingExercise
        fields = ['id', 'name', 'sets', 'reps', 'weight']
        read_only_fields = ['id']


class TrainingDaySerializer(serializers.ModelSerializer):
    exercises = TrainingExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = TrainingDay
        fields = ['id', 'date', 'exercises', 'created_at']
        read_only_fields = ['id', 'created_at']


class TrainingDayCreateSerializer(serializers.Serializer):
    exercises = TrainingExerciseSerializer(many=True)


class TrainingPlanExerciseSerializer(serializers.ModelSerializer):
    series = serializers.IntegerField(source='sets', read_only=True)

    class Meta:
        model = TrainingPlanExercise
        fields = ['id', 'name', 'sets', 'series', 'reps', 'weight']
        read_only_fields = ['id', 'series']


class TrainingPlanSerializer(serializers.ModelSerializer):
    exercises = TrainingPlanExerciseSerializer(many=True, read_only=True)
    excercises = TrainingPlanExerciseSerializer(many=True, read_only=True, source='exercises')

    class Meta:
        model = TrainingPlan
        fields = ['id', 'name', 'exercises', 'excercises', 'created_at']
        read_only_fields = ['id', 'created_at', 'excercises']


class TrainingPlanCreateSerializer(serializers.ModelSerializer):
    exercises = TrainingPlanExerciseSerializer(many=True, required=False)
    excercises = TrainingPlanExerciseSerializer(many=True, required=False, write_only=True)

    class Meta:
        model = TrainingPlan
        fields = ['name', 'exercises', 'excercises']

    def create(self, validated_data):
        exercises_data = validated_data.pop('exercises', []) or validated_data.pop('excercises', [])
        plan = TrainingPlan.objects.create(**validated_data)
        for ex_data in exercises_data:
            TrainingPlanExercise.objects.create(training_plan=plan, **ex_data)
        return plan

    def update(self, instance, validated_data):
        exercises_data = validated_data.pop('exercises', None) or validated_data.pop('excercises', None)
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        if exercises_data is not None:
            instance.exercises.all().delete()
            for ex_data in exercises_data:
                TrainingPlanExercise.objects.create(training_plan=instance, **ex_data)

        return instance
