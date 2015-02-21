# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_fix_notes_null_and_blank'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='description',
            field=models.CharField(default=b'', max_length=1000, blank=True),
            preserve_default=True,
        ),
    ]
