from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


def user_directory_path(instance, filename):
    return f'{instance.user.profile.unique_id}/{filename}'


def user_directory_image_path(instance, filename):
    return f'albumarts/{instance.user.profile.unique_id}/{filename}'


class Song(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    filename = models.CharField(max_length=200)
    title = models.CharField(max_length=200, null=True)
    album = models.CharField(max_length=200, null=True)
    artist = models.CharField(max_length=200, null=True)
    genre = models.CharField(max_length=200, null=True)
    artwork = models.ImageField(
        upload_to=user_directory_image_path, null=True)
    music = models.FileField(upload_to=user_directory_path)
    date_uploaded = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user}"
