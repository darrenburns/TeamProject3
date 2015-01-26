from django.db import models
from django.contrib.auth.models import User


class Chat(models.Model):
    title = models.CharField(max_length=255)
    project = models.ForeignKey('core.Project', blank=True)
    created = models.DateTimeField(blank=True)
    closed = models.DateTimeField(null=True, blank=True)
    users = models.ManyToManyField(User, blank=True)
    ticket = models.OneToOneField('chat.Ticket', null=True, blank=True)

    class Meta:
        permissions = (('canTagTickets', 'Can tag chats as tickets'),
                       ('canSplitChats', 'Can Split Chats into Multiple Conversations'),)

    def __unicode__(self):
        return u'Chat %d in project "%s" (project_id = %d)' % (self.id, self.project.desc, self.project.id)


class Message(models.Model):
    user = models.ForeignKey(User)
    sent = models.DateTimeField()
    chat = models.ForeignKey('chat.Chat')
    text = models.CharField(max_length=2000)

    class Meta:
        permissions = (('canPost', 'Can Write Messages'),)

    def __unicode__(self):
        return u'%s in chat %d' % (self.text, self.chat.id)


class Priority(models.Model):
    name = models.CharField(max_length=20)  # e.g. High, Normal, Low
    colour = models.CharField(max_length=20)

    class Meta:
        permissions = (('canCreatePriorities','Can Create a Priority'),)

    def __unicode__(self):
        return u'Priority: %s, Colour: %s' % (self.name, self.colour)


class Ticket(models.Model):
    notes = models.CharField(max_length=500)
    created = models.DateTimeField()
    closed = models.DateTimeField(null=True, blank=True)
    priority = models.ForeignKey(Priority, null=True, blank=True)    

    class Meta:
            permissions = (('canEditAllTickets', 'Can edit all tickets'),)  # Intended for use with ticket priorities.

    def __unicode__(self):
        return u'Ticket %d' % self.id


class MetadataName(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)

    def __unicode__(self):
        return u'Metadata Name %s' % self.name


class Metadata(models.Model):
    chat = models.ForeignKey('chat.Chat', blank=True, null=True)
    value = models.CharField(max_length=2000, blank=True, null=True)
    meta_name = models.ForeignKey(MetadataName)

    def __unicode__(self):
        return u'Metadata id %d' % self.id
