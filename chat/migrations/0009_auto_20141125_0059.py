# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0008_auto_20141125_0057'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='priority',
            options={'permissions': (('canCreatePriorities', 'Can Create a Priority'),)},
        ),
    ]
