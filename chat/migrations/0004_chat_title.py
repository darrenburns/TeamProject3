# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_auto_20141122_1547'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='title',
            field=models.CharField(default='ticketname2014-11-22 16:38:12.010379+00:00', max_length=255),
            preserve_default=False,
        ),
    ]
