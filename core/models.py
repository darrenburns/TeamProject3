from django.db import models
from django.contrib.auth.models import User as djangoUser


class UserProfile(models.Model):
    role = models.CharField(max_length=50)
    linkedinURL = models.URLField(max_length=50)
    #image = models.ImageField(upload_to=None)


class User(djangoUser):
    profile = models.OneToOneField(UserProfile)


class Project(models.Model):
    manager = models.ForeignKey(User)
    desc = models.CharField(max_length=500)
