from django.db import models
from django.contrib.auth.models import AbstractUser

# store users and passwords
class User(AbstractUser):
    # First/last name is not a global-friendly pattern
    # name = models.CharField(blank=True, max_length=255)

    def __str__(self):
        return self.username
