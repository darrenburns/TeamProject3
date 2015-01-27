# REST API for the core models are defined here

from tastypie.constants import ALL
from tastypie.resources import ModelResource
from core.models import Project


class ProjectResource(ModelResource):

    class Meta:
        resource_name = 'project'
        queryset = Project.objects.all()
        allowed_methods = ['get']
        filtering = {
            'id': ALL,
        }