from django.db import models

'''

    TODO: Decide whether we want to have the date fields here as models.DateField
            ...or models.DateTimeField instances.

    TODO: We need to discuss permissions more. Are they subclasses using Django's
            ...multi-table inheritance, or do we use the built-in permissions
            ...assigned to users?

    Discussion points:
        Should user roles be CharFields?
        How do we represent images and logos?
        Do we add primary keys, or use the built-in django IDs?

'''

# Create your models here.
class Project(models.Model):
    manager = models.CharField(max_length = 50) # A name. This should take permissions into account, but @darrenburns may need to advise on the direction to take here...
    desc = models.CharField(max_length = 500) # A description. We allow for length here.

class Chat(models.Model):
    project = models.ForeignKey(Project) # The project this chat belongs to.
    created = models.DateTimeField() # Date the chat was created in.
    closed = models.DateTimeField() # If it exists, the date the chat was closed in.


class Permission(models.Model): # We need to discuss this more. See TODO list up top.
    permissionName = models.CharField(max_length = 50) # The name of the permission.


class UserProfile(models.Model):
    role = models.CharField(max_length = 50) # A user's role. Should this be a CharField?
    linkedinURL = models.CharField(max_length = 50) # A user's Linkedin Profile.
    # IMAGE GOES HERE...


class Company(models.Model):
    project = models.ManyToManyField(Project) # A collection of projects worked on by companies.
    manager = models.ForeignKey(User) # The manager of a company. (Rename?)
    url = models.CharField(max_length = 50) # The URL of the company's website.
    name = models.CharField(max_length = 50) # The company's name...
    desc = models.CharField(max_length = 500) # A description of the company. We allow room for length here.
    # LOGO GOES HERE...


class User(models.Model):
    profile = models.OneToOneField(UserProfile) # The user profile.
    permission = models.ManyToManyField(Permission) # Django will create a new table for us using this.
    company = models.ForeignKey(Company) # The company the user works for
    chat = models.ManyToManyField(Chat) # The chats the user belongs to. (Django will create a new table for this.)


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
