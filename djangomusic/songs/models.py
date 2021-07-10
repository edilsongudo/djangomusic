from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


def user_directory_path(instance, filename):
    return f'user_{instance.user.pk}/{filename}'


def user_directory_image_path(instance, filename):
    return f'albumarts/{instance.user.pk}/{filename}'


class Song(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    song_filename = models.CharField(max_length=200)
    song_title = models.CharField(max_length=200, null=True)
    song_album = models.CharField(max_length=200, null=True)
    song_artist = models.CharField(max_length=200, null=True)
    song_genre = models.CharField(max_length=200, null=True)
    song_artwork = models.ImageField(
        upload_to=user_directory_image_path, null=True)
    music = models.FileField(upload_to=user_directory_path)
    date_uploaded = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user}"
