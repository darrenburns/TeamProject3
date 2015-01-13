# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0013_metadata'),
    ]

    operations = [
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
        migrations.AlterField(
            model_name='metadata',
            name='name',
            field=models.ManyToManyField(to='chat.MetadataName'),
            preserve_default=True,
        ),
    ]
