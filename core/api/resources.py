# REST API for the core models are defined here

from tastypie.resources import ModelResource
from core.models import Project


class ProjectResource(ModelResource):

    class Meta:
        queryset = Project.objects.all()
        allowed_methods = ['get']