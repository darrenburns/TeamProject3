# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0009_auto_20141125_0059'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ticket',
            options={'permissions': (('canEditAllTickets', 'Can edit all tickets'),)},
        ),
    ]
