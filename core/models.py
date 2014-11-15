from django.db import models
from django.contrib.auth.models import User as djangoUser

'''

    TODO: Decide whether we want to have the date fields here as models.DateField
            ...or models.DateTimeField instances.

    TODO: We need to fix the problem we have below, where Users have Companies as foreign keys and Companies have Users as Foreign Keys.
            ...the way Django does this is such that we reference the class in a function call. 
            ...how are we supposed to do this if one is defined before the other?
            ..see lines 58, 68. 

    Discussion points:
        Should user roles be CharFields?

    NOTE: Users are made using Django's built in user models, and Permissions are managed using Permissions and Groups.
'''


class UserProfile(models.Model):
    role = models.CharField(max_length = 50) # A user's role. Should this be a CharField?
    linkedinURL = models.URLField(max_length = 50) # A user's Linkedin Profile.
    # image = models.ImageField(upload_to=None) # A User's Profile Picture


class User(djangoUser):
    profile = models.OneToOneField(UserProfile) # The user profile.
    permission = models.ManyToManyField(Permission) # Django will create a new table for us using this.
    #chat = models.ManyToManyField(Chat) # The chats the user belongs to. (Django will create a new table for this.)


# Create your models here.
class Project(models.Model):
    manager = models.ForeignKey(User) # A name. This should take permissions into account, but @darrenburns may need to advise on the direction to take here...
    desc = models.CharField(max_length = 500) # A description. We allow for length here.
