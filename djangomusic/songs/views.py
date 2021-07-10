from django.contrib.auth.models import User
from django.shortcuts import render
from .forms import MusicForm
from .utils import *
import os


def player(request):
    user = request.user
    songs = os.listdir(f'media/{user.username}')
    metadata = []
    for song in songs:
        a = get_meta(os.path.join('media', f'{user.username}'),
                     os.path.join('media/albumarts', f'{user.username}'), song)
        metadata.append(a)
    print(metadata)
    form = MusicForm()
    if request.method == 'POST':
        form = MusicForm(request.POST, request.FILES)
        if form.is_valid():
            print(request.FILES)
    context = {'user': user, 'songs': metadata, 'form': form}
    return render(request, 'songs/player.html', context)
