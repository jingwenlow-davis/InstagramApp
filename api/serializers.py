from rest_framework import serializers
from django.core.files.base import ContentFile
from .models import *
import uuid
import base64
import imghdr

ALLOWED_IMAGE_TYPES = (
    "jpeg",
    "jpg",
    "png",
    "gif"
)

class Base64ImageField(serializers.ImageField):
    """
        A django-rest-framework field for handling image-uploads through raw post data.
        It uses base64 for en-/decoding the contents of the file.
        """

    def to_internal_value(self, base64_data):
        # Check if this is a base64 string
        if not base64_data:
            return None

        if isinstance(base64_data, str):
            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(base64_data)
            except TypeError:
                raise serializers.ValidationError(_("Please upload a valid image."))
            # Generate file name:
            file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)
            if file_extension not in ALLOWED_IMAGE_TYPES:
                raise serializers.ValidationError(_("The type of the image couldn't been determined."))
            complete_file_name = file_name + "." + file_extension
            data = ContentFile(decoded_file, name=complete_file_name)
            return super(Base64ImageField, self).to_internal_value(data)
        raise serializers.ValidationError('This is not a base64 string')

    def to_representation(self, value):
        # Return url including domain name.
        return value.name

    def get_file_extension(self, filename, decoded_file):
        extension = imghdr.what(filename, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension
        return extension

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = (
            'last_login',
            'is_superuser',
            'is_staff',
            'is_active',
            'date_joined',
            'groups',
            'user_permissions'
        )

class PostSerializer(serializers.ModelSerializer):
    # image = Base64ImageField(required=False) 
    class Meta:
        model = Post
        exclude = (
            'date_created',
        )

    def create(self, validated_data):
        image = validated_data.pop('image')
        posted_by = validated_data.pop('posted_by')
        caption = validated_data.pop('caption')
        return Post.objects.create(image=image, posted_by=posted_by, caption=caption)

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('__all__')

    def create(self, validated_data):
        user = validated_data.pop('user')
        post = validated_data.pop('post')
        return Like.objects.create(user=user, post=post)


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('__all__')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('__all__')

class BlockedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlockedUser
        fields = ('__all__')

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('__all__')