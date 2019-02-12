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

class LoginUser(View):

    def post(self, request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        # user found
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)

        # user not found
        else:
            return HttpResponseBadRequest
