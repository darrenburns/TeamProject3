# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0011_auto_20141129_1656'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='created',
            field=models.DateTimeField(blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='chat',
            name='project',
            field=models.ForeignKey(to='core.Project', blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='chat',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True),
            preserve_default=True,
        ),
    ]
