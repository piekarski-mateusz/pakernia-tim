from django.db import models
from django.contrib.auth.models import User


class Measurement(models.Model):
    """Pomiary ciała do śledzenia postępów"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='measurements')
    date = models.DateField()
    chest = models.FloatField()
    thigh = models.FloatField()
    arm = models.FloatField()
    belly = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.date}"


class TrainingDay(models.Model):
    """Dzień treningowy z ćwiczeniami"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='training_days')
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'date']
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.username} - {self.date}"


class TrainingExercise(models.Model):
    """Pojedyncze ćwiczenie w dniu treningowym"""
    training_day = models.ForeignKey(TrainingDay, on_delete=models.CASCADE, related_name='exercises')
    name = models.CharField(max_length=255)
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.sets}x{self.reps})"


class TrainingPlan(models.Model):
    """Predefiniowane plany/szablony treningowe"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='training_plans')
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.name}"


class TrainingPlanExercise(models.Model):
    """Ćwiczenia w szablonie planu treningowego"""
    training_plan = models.ForeignKey(TrainingPlan, on_delete=models.CASCADE, related_name='exercises')
    name = models.CharField(max_length=255)
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.sets}x{self.reps})"
