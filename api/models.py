from django.db import models
from django.contrib.auth.models import User


class Measurement(models.Model):
    """Body measurements for progress tracking"""
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
    """Training day with exercises"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='training_days')
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'date']
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.username} - {self.date}"


class TrainingExercise(models.Model):
    """Individual exercise within a training day"""
    training_day = models.ForeignKey(TrainingDay, on_delete=models.CASCADE, related_name='exercises')
    name = models.CharField(max_length=255)
    sets = models.IntegerField()
    reps = models.IntegerField()
    weight = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.sets}x{self.reps})"
