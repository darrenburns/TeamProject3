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
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=100, unique=True, null=True)),
                ('colour', models.CharField(max_length=7)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='ticket',
            name='tag',
            field=models.ManyToManyField(to='chat.Tag', null=True, blank=True),
            preserve_default=True,
        ),
    ]
