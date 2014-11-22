import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'snptm.settings')

import django
django.setup()

from django.contrib.auth.models import Group, Permission

qaManagerGroup = Group(name="qa manager")
qaManagerGroup.save()
editAllTickets = Permission.objects.get(codename="editAllTickets")
qaManagerGroup.permissions.add(editAllTickets)