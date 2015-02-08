# REST API for the core models are defined here
from tastypie import fields

from tastypie.constants import ALL, ALL_WITH_RELATIONS
from tastypie.resources import ModelResource
from core.models import Project, UserProfile
from django.contrib.auth.models import User


class ProjectResource(ModelResource):

    class Meta:
        resource_name = 'project'
        queryset = Project.objects.all()
        allowed_methods = ['get']
        filtering = {
            'id': ALL,
        }


class UserResource(ModelResource):

    class Meta:
        resource_name = 'user'
        queryset = User.objects.all()
        allowed_methods = ['get']
        detail_uri_name = 'username'

    def dehydrate(self, bundle):
        del bundle.data['password']
        return bundle


class UserProfileResource(ModelResource):

    user = fields.ToOneField(UserResource, 'user', full=True)

    class Meta:
        resource_name = 'user_profile'
        queryset = UserProfile.objects.all()
        allowed_methods = ['get']
        filtering = {
            'user': ALL_WITH_RELATIONS,
        }