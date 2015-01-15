# REST API for the chat models are defined here
from tastypie import fields
from tastypie.constants import ALL_WITH_RELATIONS

from tastypie.resources import ModelResource
from chat.models import Chat, Metadata, MetadataName
from core.api.resources import ProjectResource


class ChatResource(ModelResource):

    project = fields.ForeignKey(ProjectResource, 'project')

    class Meta:
        resource_name = 'chat'
        queryset = Chat.objects.all()
        allowed_methods = ['get']
        filtering = {
            'project': ALL_WITH_RELATIONS,
        }


class MetadataNameResource(ModelResource):

    class Meta:
        resource_name = 'metadata_name'
        queryset = MetadataName.objects.all()
        allowed_methods = ['get', 'delete', 'put', 'post']


class MetadataResource(ModelResource):

    metadata_name = fields.ForeignKey(MetadataNameResource, 'name')

    class Meta:
        resource_name = 'metadata'
        queryset = Metadata.objects.all()
        allowed_methods = ['get', 'delete', 'put', 'post']
        filtering = {
            'name': ALL_WITH_RELATIONS,
        }