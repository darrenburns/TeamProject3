from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^$', 'core.views.home', name='home'),
    url(r'^accounts/login/', 'core.views.user_login', name='user_login'),
    url(r'^accounts/logout/', 'core.views.user_logout', name='user_logout'),
    url(r'^accounts/register/$', 'core.views.user_register', name='user_register'),
    url(r'^dashboard/$', 'core.views.dashboard', name='dashboard'),
    url(r'^chat/$', 'chat.views.chat', name='chat'),
)