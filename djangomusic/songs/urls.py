"""djangomusic URL Configuration

The `urlpatterns` list routes URLs to  For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('player/<str:username>', player, name="player"),
    path('api/', apiOverview, name="api-overview"),
    path('song-list/<str:unique_id>/', songList, name="song-list"),
    # path('song-detail/<str:pk>/', songDetail, name="song-detail"),
    # path('song-create/', songCreate, name="song-create"),
    # path('song-update/<str:pk>/', songUpdate, name="song-update"),
    # path('song-delete/<str:pk>/', songDelete, name="song-delete"),
]
