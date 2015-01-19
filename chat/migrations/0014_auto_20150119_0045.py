# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0013_auto_20150114_1237'),
    ]

    operations = [
        migrations.RenameField(
            model_name='metadata',
            old_name='meta_name',
            new_name='metadata_name',
        ),
    ]
