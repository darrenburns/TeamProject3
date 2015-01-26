# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_auto_20150119_1159'),
    ]

    operations = [
        migrations.CreateModel(
            name='Progress',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('maximum', models.IntegerField()),
                ('current', models.IntegerField()),
                ('status', models.CharField(max_length=500)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='ticket',
            name='progress',
            field=models.ForeignKey(to='chat.Progress', null=True),
            preserve_default=True,
        ),
    ]
