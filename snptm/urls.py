from django.conf.urls import patterns, url, include
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'core.views.home', name='home'),
    url(r'^accounts/login/', 'core.views.user_login', name='user_login'),
    url(r'^accounts/logout/', 'core.views.user_logout', name='user_logout'),
    url(r'^accounts/register/$', 'core.views.user_register', name='user_register'),
    url(r'^dashboard/$', 'core.views.dashboard', name='dashboard'),
    url(r'^profiles/(?P<username>[a-zA-Z0-9]+)/$', 'core.views.user_profile', name="user_profile")

    #API
    # url(r'^api/sidebar_?tickets/<<project_id_here>>$', name='get_tickets_list'),
)