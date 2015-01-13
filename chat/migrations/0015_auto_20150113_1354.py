# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0014_auto_20150113_1352'),
    ]

    operations = [
        migrations.RenameField(
            model_name='metadata',
            old_name='name',
            new_name='metadata_name',
        ),
    ]
