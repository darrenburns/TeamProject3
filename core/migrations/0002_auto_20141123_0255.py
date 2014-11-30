# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='homepage',
            field=models.URLField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='project',
            name='name',
            field=models.CharField(default='project2', max_length=2000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='project',
            name='repo',
            field=models.URLField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='project',
            name='desc',
            field=models.CharField(max_length=255),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='linkedinURL',
            field=models.URLField(max_length=255, null=True, blank=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='role',
            field=models.CharField(max_length=50, null=True, blank=True),
            preserve_default=True,
        ),
    ]
