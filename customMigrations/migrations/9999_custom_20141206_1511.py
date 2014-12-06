# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models, migrations
from django.contrib.auth.models import Group, Permission


def populate_groups(apps, schema_editor):

    # The setup we're working with right now is to have three groups: ordinary devs, qa managers, and project managers.
    # In the User Stories, at the time of writing, devs and users are treated as the same group.

    # The project manager group.
    projectManagerGroup = Group(name="project manager")
    projectManagerGroup.save()
    projectManagerGroup.permissions.add(Permission.objects.get(codename="canManageProjects"))
    projectManagerGroup.permissions.add(Permission.objects.get(codename="canCreatePriorities"))  # Also in QA group?
    projectManagerGroup.permissions.add(Permission.objects.get(codename="canEditAllTickets"))
    projectManagerGroup.permissions.add(Permission.objects.get(codename="canPost"))
    projectManagerGroup.permissions.add(Permission.objects.get(codename="canTagTickets"))
    projectManagerGroup.permissions.add(Permission.objects.get(codename="canSplitChats"))


    # The qa group.
    qaManagerGroup = Group(name="qa manager")
    qaManagerGroup.save()
    qaManagerGroup.permissions.add(Permission.objects.get(codename="canEditAllTickets"))
    qaManagerGroup.permissions.add(Permission.objects.get(codename="canPost"))
    qaManagerGroup.permissions.add(Permission.objects.get(codename="canTagTickets"))
    qaManagerGroup.permissions.add(Permission.objects.get(codename="canSplitChats"))

    # The lowly developer group.
    developerGroup = Group(name="developer")
    developerGroup.save()
    developerGroup.permissions.add(Permission.objects.get(codename="canPost"))
    developerGroup.permissions.add(Permission.objects.get(codename="canTagTickets"))
    developerGroup.permissions.add(Permission.objects.get(codename="canSplitChats"))


class Migration(migrations.Migration):
    dependencies = [
            ('auth', '__first__')
    ]
    operations = [ migrations.RunPython(populate_groups) ]

