from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, null=True)
    role = models.CharField(max_length=50)
    linkedinURL = models.URLField(max_length=50)
    #image = models.ImageField(upload_to=None)

@receiver(post_save, sender=User, dispatch_uid='initialise_profile')  # Listen for a new User signal
def initialise_profile(sender, **kwargs):
    if kwargs.get('created', False):
        UserProfile.objects.get_or_create(user=kwargs.get('instance'))


class Project(models.Model):
    manager = models.ForeignKey(User)
    desc = models.CharField(max_length=500)
