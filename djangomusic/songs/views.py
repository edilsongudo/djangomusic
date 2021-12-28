from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import MusicForm
from .models import Song
from .utils import *
import os
from django.core.files.images import ImageFile
import io
from users.models import Profile

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SongSerializer


def player(request, username):
    user = User.objects.filter(username=username).first()
    unique_id = user.profile.unique_id
    songs = Song.objects.filter(user=user)
    print(songs)
    # songs = os.listdir(f'media/{user.username}')
    # metadata = []
    # for song in songs:
    #     a = get_meta(os.path.join('media', f'{user.username}'),
    #                  os.path.join('media/albumarts', f'{user.username}'), song)
    #     metadata.append(a)
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
            if isinstance(artwork, bytes):
                artwork = ImageFile(io.BytesIO(artwork), name=artwork_filename)
            form.save(commit=False)
            form.instance.user = request.user
            form.instance.title = title
            form.instance.artist = artist
            form.instance.album = album
            form.instance.filename = filename
            form.instance.artwork = artwork
            form.save()
            return redirect('player', username=username)
    context = {'user': user, 'songs': songs,
               'form': form, 'unique_id': unique_id}
    return render(request, 'songs/player.html', context)


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List': '/song-list/<str:unique_id>/',
        # 'Detail View': '/song-detail/<str:pk>/',
        # 'Create': '/song-create/',
        # 'Update': '/song-update/<str:pk>/',
        # 'Delete': '/song-delete/<str:pk>/',
    }

    return Response(api_urls)


@api_view(['GET'])
def songList(request, unique_id):
    user = Profile.objects.get(unique_id=unique_id).user
    songs = Song.objects.filter(user=user)
    serializer = SongSerializer(songs, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def songDetail(request, pk):
#     songs = Task.objects.get(id=pk)
#     serializer = SongSerializer(songs, many=False)
#     return Response(serializer.data)


# @api_view(['POST'])
# def songCreate(request):
#     serializer = SongSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


# @api_view(['POST'])
# def songUpdate(request, pk):
#     song = Task.objects.get(id=pk)
#     serializer = SongSerializer(instance=task, data=request.data)

#     if serializer.is_valid():
#         serializer.save()

#     return Response(serializer.data)


# @api_view(['DELETE'])
# def songDelete(request, pk):
#     song = Song.objects.get(id=pk)
#     song.delete()

#     return Response('Item succsesfully delete!')
