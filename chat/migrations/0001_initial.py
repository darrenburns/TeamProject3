# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField()),
                ('closed', models.DateTimeField()),
                ('project', models.ForeignKey(to='core.Project')),
                ('user', models.ManyToManyField(to='core.User')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sent', models.DateTimeField()),
                ('project', models.ForeignKey(to='chat.Chat')),
                ('user', models.ForeignKey(to='core.User')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
