# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_auto_20150119_1225'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='metadata',
            name='value',
        ),
        migrations.CreateModel(
            name='MetadataDate',
            fields=[
                ('metadata_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='chat.Metadata')),
                ('value', models.DateTimeField()),
            ],
            options={
            },
            bases=('chat.metadata',),
        ),
        migrations.CreateModel(
            name='MetadataString',
            fields=[
                ('metadata_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='chat.Metadata')),
                ('value', models.CharField(max_length=2000)),
            ],
            options={
            },
            bases=('chat.metadata',),
        ),
    ]
