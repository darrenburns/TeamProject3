# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0015_auto_20141217_2306'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='due_date',
            field=models.DateTimeField(default=datetime.datetime(2014, 12, 17, 23, 26, 22, 713221, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
