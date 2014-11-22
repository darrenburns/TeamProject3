import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'snptm.settings')

import django
django.setup()

from core.models import UserProfile, Project
from chat.models import Chat, Message, Priority, Ticket
from django.contrib.auth.models import User


def populate():

    # Create some fake users.
    for i in xrange(15):
        user = User(username="User " + str(i), password='q')

