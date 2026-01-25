from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from .models import Measurement, TrainingDay, TrainingExercise, TrainingPlan
from .serializers import (
    UserSerializer, LoginSerializer, MeasurementSerializer,
    TrainingDaySerializer, TrainingDayCreateSerializer,
    TrainingPlanSerializer, TrainingPlanCreateSerializer
)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """Rejestracja nowego użytkownika z email i hasłem"""
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email'].lower()
            if User.objects.filter(email=email).exists():
                return Response({'error': 'Użytkownik z tym adresem email już istnieje'}, status=status.HTTP_400_BAD_REQUEST)
            
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Rejestracja zakończona pomyślnie',
                'user': UserSerializer(user).data,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """Logowanie z email i hasłem"""
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email'].lower()
            password = serializer.validated_data['password']
            
            user = authenticate(username=email, password=password)
            
            if user:
                token, _ = Token.objects.get_or_create(user=user)
                return Response({
                    'message': 'Zalogowano pomyślnie',
                    'user': UserSerializer(user).data,
                    'token': token.key
                })
            return Response({'error': 'Nieprawidłowy email lub hasło'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            Token.objects.filter(user=request.user).delete()
        return Response({'message': 'Wylogowano pomyślnie'})


class ProfileView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        """Aktualizacja profilu użytkownika"""
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeasurementViewSet(viewsets.ModelViewSet):
    serializer_class = MeasurementSerializer

    def get_queryset(self):
        return Measurement.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['delete'])
    def clear_all(self, request):
        """Usuń wszystkie pomiary dla aktualnego użytkownika"""
        count = self.get_queryset().delete()[0]
        return Response({'deleted': count})


class TrainingDayViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingDaySerializer

    def get_queryset(self):
        return TrainingDay.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def map(self, request):
        training_days = self.get_queryset()
        result = {}
        for day in training_days:
            exercises = [
                {'id': ex.id, 'name': ex.name, 'sets': ex.sets, 'reps': ex.reps, 'weight': ex.weight}
                for ex in day.exercises.all()
            ]
            result[str(day.date)] = exercises
        return Response(result)

    @action(detail=False, methods=['get'], url_path='marked-dates')
    def marked_dates(self, request):
        dates = self.get_queryset().values_list('date', flat=True)
        result = {
            str(d): {'marked': True, 'dotColor': '#aa1b18', 'selected': False}
            for d in dates
        }
        return Response(result)

    @action(detail=False, methods=['get', 'post', 'delete'], url_path='date/(?P<date>[0-9-]+)')
    def by_date(self, request, date=None):
        """Obsługuje GET, POST i DELETE dla konkretnej daty treningu"""
        if request.method == 'GET':
            try:
                day = TrainingDay.objects.get(user=request.user, date=date)
                return Response(TrainingDaySerializer(day).data)
            except TrainingDay.DoesNotExist:
                return Response({'date': date, 'exercises': []})
        
        elif request.method == 'POST':
            exercises_data = request.data.get('exercises', [])

            if not exercises_data:
                TrainingDay.objects.filter(user=request.user, date=date).delete()
                return Response({'date': date, 'exercises': [], 'message': 'Dzień treningowy usunięty'})

            day, created = TrainingDay.objects.get_or_create(user=request.user, date=date)

            day.exercises.all().delete()
            for ex_data in exercises_data:
                # Konwertuj pusty string na None dla weight
                weight = ex_data.get('weight')
                if weight == '' or weight is None:
                    weight = None
                else:
                    try:
                        weight = float(weight)
                    except (ValueError, TypeError):
                        weight = None
                
                TrainingExercise.objects.create(
                    training_day=day,
                    name=ex_data.get('title', ex_data.get('name', '')),
                    sets=int(ex_data.get('sets', 0) or 0),
                    reps=int(ex_data.get('reps', 0) or 0),
                    weight=weight
                )

            return Response(TrainingDaySerializer(day).data)
        
        elif request.method == 'DELETE':
            deleted = TrainingDay.objects.filter(user=request.user, date=date).delete()[0]
            return Response({'success': True, 'deleted': deleted > 0})


class TrainingPlanViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return TrainingPlanCreateSerializer
        return TrainingPlanSerializer

    def get_queryset(self):
        return TrainingPlan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    return Response({'status': 'ok'})
