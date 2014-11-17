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


class Priority(models.Model):
    name = models.CharField(max_length = 20) # The name of a priority.
    colour = models.CharField(max_length = 20, primary_key = True) # The name of the priority, which is unique.


class Ticket(models.Model):
    notes = models.CharField(max_length = 500) # Notes on a chat.
    created = models.DateTimeField() # When a ticket relating to a chat was created.
    closed = models.DateTimeField() # If closed, when a ticket was closed.
    priority = models.ForeignKey(Priority) # The priority of a ticket.
