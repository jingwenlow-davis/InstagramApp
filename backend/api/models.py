from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from datetime import datetime
from rest_framework.authtoken.models import Token

# This code is triggered whenever a new user has been created and saved to the database
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
	if created:
		Token.objects.create(user=instance)


class User(AbstractUser):
	'''
	User info and Profile
	'''
	display_name = models.CharField(max_length=30, blank=True)
	location_radius = models.IntegerField(null=True, blank=True)
	profile_picture = models.CharField(max_length=100, blank=True)
	bio = models.TextField(max_length=500, blank=True)
	age_range = models.IntegerField(null=True, blank=True)

	GENDER_CHOICES = (
		('M', 'Male'),
		('F', 'Female'),
		('O', 'Other'),
	)
	gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

	def __str__(self):
		return self.username


class Post(models.Model):
	'''
	User's posts that appear in feed
	'''
	posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
	
	date_created = models.DateTimeField(default=datetime.now)
	image = models.ImageField(upload_to='staticfiles')
	caption = models.TextField(max_length=500, blank=False)

	def __str__(self):
		return "{posted_by}, {date_created}, {caption}".format(
			posted_by=self.posted_by.username,
			date_created=self.date_created,
			caption=self.caption
		)

class Like(models.Model):
	'''
	Likes on posts
	'''
	post = models.ForeignKey(Post, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.CASCADE)

	def __str__(self):
		return "{post}, {user}".format(
			post=self.post.id,
			user=self.user.username
		)

class Message(models.Model):
	'''
	Messages sent between various users
	'''
	sent_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
	received_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="receiver")

	content = models.TextField(max_length=None, blank=False)
	time_sent = models.DateTimeField(default=datetime.now())
	time_received = models.DateTimeField(default=datetime.now())

	def __str__(self):
		return "{sent_by}, {received_by}, {time_sent}, {time_received}, {content}".format(
			sent_by=self.sent_by.username,
			received_by=self.received_by.username,
			content=self.content,
			time_sent=self.time_sent,
			time_received=self.time_received
		)

class Location(models.Model):
	'''
	Location of each user  
	'''
	user = models.ForeignKey(User, on_delete=models.CASCADE)

	location_coordinates = models.FloatField(null=True)
	timestamp = models.DateTimeField(default=datetime.now())

	def __str__(self):
		return "{sent_by}, {location_coordinates}, {timestamp}".format(
			user=self.user.username,
			location_coordinates=self.location,
			timestamp=self.timestamp
		)


class BlockedUser(models.Model):
	'''
	User that is blocked by another user
	'''
	blocker_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blocker")
	blocked_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blocked")

	def __str__(self):
		return "{blocker_user}, {blocked_user}".format(
			blocker_user=self.blocker_user,
			blocked_user=self.blocked_user
		)

class Report(models.Model):
	'''
	Reporting of either posts or messages 
	'''
	target_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	target_id = models.PositiveIntegerField()
	target_object=GenericForeignKey('target_type', 'target_id')

	reason = models.TextField(max_length=None)

	def __str__(self):
		return "{target_object}, {reason}".format(
			target_object=self.target_object,
			time_received=self.reason
		)
