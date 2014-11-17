from django.db import models


class Chat(models.Model):
    project = models.ForeignKey('core.Project')
    created = models.DateTimeField()
    closed = models.DateTimeField(null=True)
    user = models.ManyToManyField('core.User')


class Message(models.Model):
    project = models.ForeignKey('chat.Chat')
    user = models.ForeignKey('core.User')
    sent = models.DateTimeField()


class Priority(models.Model):
    name = models.CharField(max_length=20)  # e.g. High, Normal, Low
    colour = models.CharField(max_length=20)


class Ticket(models.Model):
    notes = models.CharField(max_length=500)
    created = models.DateTimeField()
    closed = models.DateTimeField(null=True)
    priority = models.ForeignKey(Priority)
