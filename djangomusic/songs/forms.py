from django import forms


class MusicForm(forms.Form):
    music = forms.FileField()
