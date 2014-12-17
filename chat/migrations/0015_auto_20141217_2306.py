# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0014_auto_20141217_0300'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='notes',
            field=models.TextField(max_length=3000, null=True, blank=True),
            preserve_default=True,
        ),
    ]
