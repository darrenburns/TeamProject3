# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0003_auto_20150119_1511'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='assignee',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ticket',
            name='cost',
            field=models.IntegerField(null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='ticket',
            name='due_date',
            field=models.DateTimeField(null=True),
            preserve_default=True,
        ),
    ]
