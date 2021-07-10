from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


class Song(models.Model):
    song_filename = models.CharField(max_length=200)
    song_title = models.CharField(max_length=200)
    song_author = models.CharField(max_length=200)
    song_artist = models.CharField(max_length=200)
    song_genre = models.CharField(max_length=200)
    date_uploaded = models.DateTimeField(default=timezone.now)
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f"{self.song_filename}"
