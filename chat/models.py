from django.db import models
import os
os.path.join(os.getcwd(), '../') # A hack to get these modules to god damn import. Please, somebody, save me from this and find out how it can be cleaned up. Python imports are horrific.
from core.models import *
os.path.join(os.getcwd(), 'chat/') # Undo the work we did previously.


class Chat(models.Model):
    project = models.ForeignKey(Project) # The project this chat belongs to.
    created = models.DateTimeField() # Date the chat was created in.
    closed = models.DateTimeField() # If it exists, the date the chat was closed in.
    user = models.ManyToManyField(User)


class Message(models.Model):
    project = models.ForeignKey(Chat) # The chat this message is contained in.
    user = models.ForeignKey(User) # The user who created the message.
    sent = models.DateTimeField() # The date and time the message was sent at.
