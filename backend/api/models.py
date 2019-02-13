from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

# This code is triggered whenever a new user has been created and saved to the database

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)

# store users and passwords
class User(AbstractUser):
	location_radius = models.IntegerField(null=True, blank=True)
	display_name = models.CharField(max_length=30, blank=True)
	profile_picture = models.CharField(max_length=100, blank=True)
	bio = models.TextField(max_length=500, blank=True)
	age = models.IntegerField(null=True, blank=True)
	age_range = models.IntegerField(null=True, blank=True)
	
	GENDER_CHOICES = (
		('M', 'Male'),
		('F', 'Female'),
		('O', 'Other'),
	)
	gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

	def __str__(self):
		return self.username
