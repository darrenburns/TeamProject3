# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_auto_20141117_1856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='closed',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='chat',
            name='ticket',
            field=models.OneToOneField(null=True, blank=True, to='chat.Ticket'),
            preserve_default=True,
        ),
    ]
