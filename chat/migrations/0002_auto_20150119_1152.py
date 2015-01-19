# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='metadata',
            name='chat',
        ),
        migrations.RemoveField(
            model_name='metadata',
            name='meta_name',
        ),
        migrations.DeleteModel(
            name='Metadata',
        ),
        migrations.DeleteModel(
            name='MetadataName',
        ),
    ]
