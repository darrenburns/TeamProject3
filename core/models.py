from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User, Group
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, null=True)
    role = models.CharField(max_length=50, null=True, blank=True)
    linkedinURL = models.URLField(max_length=255, null=True, blank=True)
    #image = models.ImageField(upload_to=None)

    def __unicode__(self):
        return u'%s %s' % (self.user.username, self.role)

@receiver(post_save, sender=User, dispatch_uid='initialise_profile')  # Listen for a new User signal
def initialise_profile(sender, **kwargs):
    if kwargs.get('created', False):
        UserProfile.objects.get_or_create(user=kwargs.get('instance'))


class Project(models.Model):
    manager = models.ForeignKey(User)
    name = models.CharField(max_length=32)
    desc = models.CharField(max_length=255)
    homepage = models.URLField(max_length=255, null=True, blank=True)
    repo = models.URLField(max_length=255, null=True, blank=True)

    class Meta:
        permissions = (('canManageProjects', 'Is allowed to manage a project'),)

    def __unicode__(self):
        return u'%s' % self.id

