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
