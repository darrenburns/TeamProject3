# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0010_auto_20141125_0108'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='closed',
            field=models.DateTimeField(null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ticket',
            name='priority',
            field=models.ForeignKey(blank=True, to='chat.Priority', null=True),
            preserve_default=True,
        ),
    ]
