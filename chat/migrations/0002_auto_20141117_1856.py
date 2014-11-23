# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='project',
            new_name='chat',
        ),
        migrations.AddField(
            model_name='chat',
            name='ticket',
            field=models.OneToOneField(null=True, to='chat.Ticket'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='message',
            name='text',
            field=models.CharField(default='text inside a message', max_length=2000),
            preserve_default=False,
        ),
    ]
