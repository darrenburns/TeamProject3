from django.forms import ModelForm
from core.models import Project


class ProjectCreationForm(ModelForm):

    class Meta:
        model = Project

