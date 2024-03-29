"""instagram URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, 'users')
router.register(r'posts', PostViewSet, 'posts')
router.register(r'messages', MessageViewSet, 'messages')
router.register(r'likes', LikeViewSet, 'likes')
router.register(r'messages', MessageViewSet, 'messages')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('login/', LoginUser.as_view(), name='login'),
    path('signup/', SignUpUser.as_view(), name='signup'),
    path('updatesettings/', UpdateSettings.as_view(), name='updatesettings'),
]
