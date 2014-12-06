# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_auto_20141117_1856'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ticket',
            options={'permissions': (('editAllTickets', 'Can edit all tickets'),)},
        ),
    ]
