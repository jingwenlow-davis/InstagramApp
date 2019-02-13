from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.contrib.auth import authenticate, login, logout

from .models import *
from .serializers import *

# All Users
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class SignUpUser(View):
    def post(self, request):
        print("Signup")
        email = request.POST['email']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        gender = request.POST['gender']
        password = request.POST['password']

        # check it email is taken
        if User.objects.filter(email=email).exists():
            response = HttpResponse()
            response.content("Email is taken")
            response.status_code(400)
            return response

        # check if username is taken
        else if User.objects.filter(email=email).exists():
            
            user = User.objects.create_user(
                email = email,
                first_name = first_name,
                last_name = last_name,
                username = username,
                gender = gender,
                password = password
            )


        # if all good, create new user

        # else return the error

        return HttpResponse(status=204)


class UpdateSettings(View):
    def post(self, request):
        print("Signup")
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        username = request.POST['username']
        email = request.POST['email']
        gender = request.POST['']
        password = request.POST['password']

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
