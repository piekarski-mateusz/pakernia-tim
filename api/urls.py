from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'measurements', views.MeasurementViewSet, basename='measurement')
router.register(r'training', views.TrainingDayViewSet, basename='training')
router.register(r'training-plans', views.TrainingPlanViewSet, basename='training-plan')

urlpatterns = [
    # Auth
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('auth/me/', views.ProfileView.as_view(), name='profile'),
    
    # Healthcheck
    path('health/', views.health_check, name='health'),
    
    # API
    path('', include(router.urls)),
]

