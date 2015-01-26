# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_auto_20150126_1347'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='progress',
        ),
        migrations.DeleteModel(
            name='Progress',
        ),
    ]
