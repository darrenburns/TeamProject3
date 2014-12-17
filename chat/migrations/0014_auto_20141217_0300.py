# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0013_auto_20141217_0259'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='closed',
        ),
        migrations.RemoveField(
            model_name='ticket',
            name='created',
        ),
    ]
