from django import forms

__author__ = '2161574s'

class ProjectCreationForm(forms.Form):
    title = forms.CharField(label='Project Title', max_length=20)
    manager = forms.CharField(label='Manager', max_length=20)
    description = forms.CharField(label='Description', max_length=500)

