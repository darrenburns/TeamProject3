from django.contrib import admin
from chat.models import Chat, Message, Priority, Ticket, MetadataName, Metadata

admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Priority)
admin.site.register(Ticket)
admin.site.register(Metadata)
admin.site.register(MetadataName)
