from django.db import models
from django.contrib.auth.models import User


class Chat(models.Model):
    project = models.ForeignKey('core.Project')
    created = models.DateTimeField()
    closed = models.DateTimeField(null=True, blank=True)
    users = models.ManyToManyField(User)
    ticket = models.OneToOneField('chat.Ticket', null=True, blank=True)

    def __unicode__(self):
        return u'Chat %d in project "%s" (project_id = %d)' % (self.id, self.project.desc, self.project.id)


class Message(models.Model):
    user = models.ForeignKey(User)
    sent = models.DateTimeField()
    chat = models.ForeignKey('chat.Chat')
    text = models.CharField(max_length=2000)

    def __unicode__(self):
        return u'%s in chat %d' % (self.text, self.chat.id)


class Priority(models.Model):
    name = models.CharField(max_length=20)  # e.g. High, Normal, Low
    colour = models.CharField(max_length=20)

    def __unicode__(self):
        return u'Priority: %s, Colour: %s' % (self.name, self.colour)


class Ticket(models.Model):
    notes = models.CharField(max_length=500)
    created = models.DateTimeField()
    closed = models.DateTimeField(null=True)
    priority = models.ForeignKey(Priority)

    def __unicode__(self):
        return u'Ticket %d' % self.id
