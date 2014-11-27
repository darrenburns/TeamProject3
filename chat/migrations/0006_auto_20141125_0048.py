# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_merge'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='chat',
            options={'permissions': (('canTagTickets', 'Can tag chats as tickets'), ('canSplitChats', 'Can Split Chats into Multiple Conversations'))},
        ),
        migrations.AlterModelOptions(
            name='message',
            options={'permissions': ('canPost', 'Can Write Messages')},
        ),
        migrations.AlterModelOptions(
            name='priority',
            options={'permissions': ('canCreatePriorities', 'Can Create a Priority')},
        ),
    ]