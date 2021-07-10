from django import forms
from .models import Song


class MusicForm(forms.ModelForm):

    class Meta:
        model = Song
        fields = ['music']
