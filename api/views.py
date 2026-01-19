from rest_framework import viewsets, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema

from .serializers import UserSerializer, LoginSerializer


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(request=UserSerializer, responses={201: UserSerializer})
    def post(self, request):
        """Register a new user with email and password"""
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

    @extend_schema(request=LoginSerializer, responses={200: UserSerializer})
    def post(self, request):
        """Login with email and password"""
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
    @extend_schema(responses={200: UserSerializer})
    def get(self, request):
        """Get current user profile"""
        return Response(UserSerializer(request.user).data)

    @extend_schema(request=UserSerializer, responses={200: UserSerializer})
    def put(self, request):
        """Update current user profile"""
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    """Health check endpoint"""
    return Response({'status': 'ok'})
