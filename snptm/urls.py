from django.conf.urls import patterns, url, include
from django.contrib import admin
from tastypie.api import Api
from chat.api.resources import ChatResource
from core.api.resources import ProjectResource

# Enable the admin interface
admin.autodiscover()

# Register the API
v1_api = Api(api_name='v1')
v1_api.register(ProjectResource())
v1_api.register(ChatResource())

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'core.views.home', name='home'),
    url(r'^accounts/login/', 'core.views.user_login', name='user_login'),
    url(r'^accounts/logout/', 'core.views.user_logout', name='user_logout'),
    url(r'^accounts/register/$', 'core.views.user_register', name='user_register'),
    url(r'^dashboard/$', 'core.views.dashboard', name='dashboard'),
    url(r'^ticket/(?P<ticket_id>[0-9]+)/$', 'chat.views.ticket', name='ticket'),

    # Add the URLs for the API
    (r'^api/', include(v1_api.urls)),

)