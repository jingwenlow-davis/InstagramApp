from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.contrib.auth import authenticate, login, logout
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import *
from .serializers import *

import json

# All Users
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class SignUpUser(View):
    def post(self, request):
        print("SDFSD")
        email = request.POST['email']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        gender = request.POST['gender']
        password = request.POST['password']

        response = HttpResponse()

        # check it email is taken
        if User.objects.filter(email=email).exists():
            response.content("An account with this email already exists")
            response.status_code(400)
            return response

        # check if username is taken
        elif User.objects.filter(email=email).exists():
            response.content("This username is already taken")
            response.status_code(400)
            return response

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

            response.status_code(200)
            return response


@method_decorator(csrf_exempt, name='dispatch')
class UpdateSettings(View):

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


        return HttpResponse(status=204)

#
# class LoginUser(View):
#     def post(self, request):
#         print("WOWOW")
#         email = request.POST['email']
#         password = request.POST['password']
#         user = authenticate(request, email=email, password=password)
#
#         # user found
#         if user is not None:
#             print("FOUND YAAY")
#             login(request, user)
#             return HttpResponse(status=204)
#
#         # user not found
#         else:
#             print("DRATS")
#             return HttpResponseBadRequest
