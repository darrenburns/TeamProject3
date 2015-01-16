# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255)),
                ('created', models.DateTimeField(blank=True)),
                ('closed', models.DateTimeField(null=True, blank=True)),
                ('project', models.ForeignKey(to='core.Project', blank=True)),
            ],
            options={
                'permissions': (('canTagTickets', 'Can tag chats as tickets'), ('canSplitChats', 'Can Split Chats into Multiple Conversations')),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sent', models.DateTimeField()),
                ('text', models.CharField(max_length=2000)),
                ('chat', models.ForeignKey(to='chat.Chat')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'permissions': (('canPost', 'Can Write Messages'),),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Metadata',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.CharField(max_length=2000, null=True, blank=True)),
                ('chat', models.ForeignKey(blank=True, to='chat.Chat', null=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='MetadataName',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=20)),
                ('colour', models.CharField(max_length=20)),
            ],
            options={
                'permissions': (('canCreatePriorities', 'Can Create a Priority'),),
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('notes', models.CharField(max_length=500)),
                ('created', models.DateTimeField()),
                ('closed', models.DateTimeField(null=True, blank=True)),
                ('priority', models.ForeignKey(blank=True, to='chat.Priority', null=True)),
            ],
            options={
                'permissions': (('canEditAllTickets', 'Can edit all tickets'),),
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='metadata',
            name='meta_name',
            field=models.ForeignKey(to='chat.MetadataName'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='chat',
            name='ticket',
            field=models.OneToOneField(null=True, blank=True, to='chat.Ticket'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='chat',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True),
            preserve_default=True,
        ),
    ]
