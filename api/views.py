from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from django.http import HttpResponse
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import status, viewsets
from rest_framework.views import APIView
from django_filters import rest_framework as filters
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from .models import *
from .serializers import *

import json
import base64
from datetime import datetime
from django.core import serializers


# All Users
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    @action(detail=False)
    def currentuser(self, request):
        '''
        Get current user's info
        '''
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user
        user = User.objects.filter(pk=user.pk)
        serializer = serializers.serialize('json', user)
        return Response(serializer)


@method_decorator(csrf_exempt, name='dispatch')
class LoginUser(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        print(request.body)
        data = json.loads(request.body)
        username = data['username']
        password = data['password']

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'},
                            status=HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        # user not found
        if not user:
            return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)

        # user found
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class SignUpUser(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        print(type(request.body.decode('utf-8')))
        rawData = request.body.decode('utf-8')

        data = json.loads(rawData)
        print(data)
        email = data['email']
        first_name = data['first_name']
        last_name = data['last_name']
        username = data['username']
        gender = data['gender']
        password = data['password']

        # check it email is taken
        if User.objects.filter(email=email).exists():
            return Response({'error': 'An account with this email already exists'}, status=HTTP_400_BAD_REQUEST)

        # check if username is taken
        elif User.objects.filter(email=email).exists():
            return Response({'error': 'This username is already taken'}, status=HTTP_400_BAD_REQUEST)

        # create new user
        else:
            user = User.objects.create_user(
                email = email,
                first_name = first_name,
                last_name = last_name,
                username = username,
                gender = gender,
                password = password
            )

            return Response(status=HTTP_200_OK)

@method_decorator(csrf_exempt, name='dispatch')
class UpdateSettings(APIView):

    def post(self, request):
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        data = json.loads(request.body)
        first_name = data['first_name']
        last_name = data['last_name']
        username = data['username']
        email = data['email']
        gender = data['gender']
        birthday = data['birthday']

        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user

        if first_name: user.first_name=first_name
        if last_name: user.last_name=last_name
        if username: user.username=username
        if email: user.email=email
        if gender: user.gender=gender

        user.save()

        return Response(status=HTTP_200_OK)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    parser_classes = (FormParser, MultiPartParser, JSONParser)

    @action(methods=['post'], detail=False)
    def likepost(self, request, **kwargs):
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user

        req = request.data.copy()
        req['user'] = user.pk
        serializer = LikeSerializer(data=req)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


# All Posts
class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited.
    """
    queryset = Post.objects.all().order_by('-date_created')
    serializer_class = PostSerializer
    parser_classes = (FormParser, MultiPartParser, JSONParser)
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('posted_by__username', 'hashtags__hashtag',)


    @action(methods=['get'], detail=False)
    def allposts(self, request, **kwargs):
        serializer = PostSerializer(Post.objects.all(), many=True)
        return Response(serializer.data)

    @action(methods=['post'], detail=False)
    def createpost(self, request, **kwargs):
        '''
        Create current user's post
        '''
        # find current user based on token
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user

        req = request.data.copy()
        req['posted_by'] = user
        print(req)
        try:
            post = Post(caption=req['caption'], posted_by=user, image=req['image'])
            post.hashtags.set(req['hashtags'])
            post.save()
        except(KeyError):
            post = Post(caption=req['caption'], posted_by=user, image=req['image'])
            post.save()
        serializer = PostSerializer(post)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # def createpost(self, request, **kwargs):
    #     '''
    #     Create current user's post
    #     '''
    #     # find current user based on token
    #     userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
    #     user = Token.objects.filter(key=userToken)
    #     if user.exists(): user = user.last().user
    #
    #     req = request.data.copy()
    #     req['posted_by'] = user.pk
    #     print(req)
    #     serializer = PostSerializer(data=req)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False)
    def getfeed(self, request):
        '''
        Get current user's feed
        '''
        # find current user based on token
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user

        posts = Post.objects.exclude(posted_by=user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def getuserposts(self, request):
        '''
        Get all current user's posts
        '''
        # find current user based on token
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user

        posts = Post.objects.filter(posted_by=user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)



# All Posts
class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that deals with messaging
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    @action(methods=['post'], detail=False)
    def sendmessage(self, request):
        '''
        User sends a message to another user
        '''
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user

        req = request.data.copy()
        req['sent_by'] = user
        message = Message(sent_by=user, received_by=User.objects.get(username=req['received_by']), content=req['content'], time_sent=datetime.now(), time_received=datetime.now())
        message.save()

        serializer = MessageSerializer(message)
        return Response(serializer.data)


    @action(detail=False)
    def getusersmessaged(self, request):
        '''
        Get users that user already has conversations with
        '''
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user

        req = request.data.copy()
        req['sent_by'] = user
        messages = Message.objects.filter(sent_by=user).values_list('received_by', flat=True)
        users = User.objects.filter(pk__in=messages)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


    @action(methods=['post'], detail=False)
    def getmessages(self, request):
        '''
        Get messages between two users
        '''
        userToken = request.META.get('HTTP_AUTHORIZATION').split()[1]
        user = Token.objects.filter(key=userToken)
        if user.exists(): user = user.last().user

        req = request.data.copy()
        req['sent_by'] = user
        messages = Message.objects.filter(sent_by=user, received_by=User.objects.get(username=req['received_by'])).order_by('-time_sent')

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
