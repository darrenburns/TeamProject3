# REST API for the chat models are defined here
from tastypie import fields
from tastypie.constants import ALL_WITH_RELATIONS

from tastypie.resources import ModelResource
from chat.models import Chat
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
