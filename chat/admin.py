from django.contrib import admin
from chat.models import Chat, Message, Priority, Ticket

admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Priority)
admin.site.register(Ticket)