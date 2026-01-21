from django.contrib import admin
from .models import Measurement, TrainingDay, TrainingExercise, TrainingPlan, TrainingPlanExercise


class TrainingExerciseInline(admin.TabularInline):
    model = TrainingExercise
    extra = 1


class TrainingPlanExerciseInline(admin.TabularInline):
    model = TrainingPlanExercise
    extra = 1


@admin.register(Measurement)
class MeasurementAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'chest', 'thigh', 'arm', 'belly', 'created_at']
    list_filter = ['user', 'date']
    search_fields = ['user__username']


@admin.register(TrainingDay)
class TrainingDayAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'exercise_count', 'created_at']
    list_filter = ['user', 'date']
    search_fields = ['user__username']
    inlines = [TrainingExerciseInline]

    def exercise_count(self, obj):
        return obj.exercises.count()
    exercise_count.short_description = 'Exercises'


@admin.register(TrainingPlan)
class TrainingPlanAdmin(admin.ModelAdmin):
    list_display = ['user', 'name', 'exercise_count', 'created_at']
    list_filter = ['user']
    search_fields = ['user__username', 'name']
    inlines = [TrainingPlanExerciseInline]

    def exercise_count(self, obj):
        return obj.exercises.count()
    exercise_count.short_description = 'Exercises'
