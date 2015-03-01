from django.contrib import admin
from chat.models import Chat, Message, Priority, Ticket, MetadataName, Metadata, MetadataString, MetadataDate, Tag


admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Priority)
admin.site.register(Ticket)
admin.site.register(Tag)
admin.site.register(Metadata)
admin.site.register(MetadataDate)
admin.site.register(MetadataString)
admin.site.register(MetadataName)