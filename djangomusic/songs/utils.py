import requests
# from musixmatch import Musixmatch
import os
import music_tag


def get_meta(folder, album_dest, file):

    song = os.path.join(f'{folder}/{file}')
    meta = music_tag.load_file(song)

    try:
        image_data = meta['artwork'].first.data
        filename = file.split('.')[0] + '.jpg'
        with open(f'{album_dest}/{filename}', 'wb') as f:
            f.write(image_data)
            artwork = filename
    except Exception as e:
        artwork = ""

    return {'album': meta['album'].value, 'artist': meta['artist'].value, 'title': meta['tracktitle'].value, 'filename': file, 'artwork': artwork}


# def get_lyrics(artist, title):
#     r = requests.get(f'https://api.lyrics.ovh/v1/{artist}/{title}')
#     return r.json()


# def return_secret():
#     with open('secret.scrt', 'r') as f:
#         musixmatch_api_key = f.read().strip()
#         return musixmatch_api_key

# def get_lyrics_musixmatch(api_key=return_secret(), q_artist='neovaii', q_track='meaning'):
#     musixmatch = Musixmatch(api_key)
#     result = musixmatch.track_search(q_artist=q_artist, q_track=q_track,
#                                      page_size=10, page=1, s_track_rating='desc')

#     track_id = result['message']['body']['track_list'][0]['track']['track_id']

#     lyrics = musixmatch.track_lyrics_get(
#         track_id)['message']['body']['lyrics']['lyrics_body']

#     lyrics = lyrics.replace('\n', '<br>')

#     return lyrics
