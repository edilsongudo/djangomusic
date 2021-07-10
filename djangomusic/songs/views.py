from django.contrib.auth.models import User
from django.shortcuts import render
from .forms import MusicForm
from .utils import *
import os
from django.core.files.images import ImageFile
import io


def player(request):
    user = request.user
    songs = os.listdir(f'media/{user.username}')
    metadata = []
    for song in songs:
        a = get_meta(os.path.join('media', f'{user.username}'),
                     os.path.join('media/albumarts', f'{user.username}'), song)
        metadata.append(a)
    form = MusicForm()
    if request.method == 'POST':
        form = MusicForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['music'].temporary_file_path()
            filename = request.FILES['music'].name
            artist = get_only_meta(file)['artist']
            album = get_only_meta(file)['album']
            title = get_only_meta(file)['title']
            artwork = get_only_meta(file)['artwork']
            artwork_filename = filename.split('.')[0] + '.png'
            artwork = ImageFile(io.BytesIO(artwork), name=artwork_filename)
            form.save(commit=False)
            form.instance.user = request.user
            form.instance.song_title = title
            form.instance.song_artist = artist
            form.instance.song_album = album
            form.instance.song_filename = filename
            form.instance.song_artwork = artwork
            form.save()
    context = {'user': user, 'songs': metadata, 'form': form}
    return render(request, 'songs/player.html', context)
