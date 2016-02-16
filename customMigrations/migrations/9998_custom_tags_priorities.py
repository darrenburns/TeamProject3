# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import migrations
from chat.models import Tag, Priority

def populate_tags_priorities(apps, schema_editor):

    if len(Tag.objects.all()) == 0:
        tag_bug = Tag(title="Bug", colour="#F09D29")
        tag_enhancement = Tag(title="Enhancement", colour="#E5E540")
        tag_feature = Tag(title="Feature", colour="#055a8c")
        tag_blocking = Tag(title="Blocking", colour="#eb5a46")
        tag_documentation = Tag(title="Documentation", colour="#70b500")
        print 'a----------------'
        tag_bug.save()
        tag_blocking.save()
        tag_feature.save()
        tag_documentation.save()
        tag_enhancement.save()

    if len(Priority.objects.all()) == 0:
        print "Saving initial priorities to database."
        priority_high = Priority(name="High", colour="#eb5a46")
        priority_normal = Priority(name="Normal", colour="#055a8c")
        priority_low = Priority(name="Low", colour="#12AB0A")
        priority_high.save()
        priority_normal.save()
        priority_low.save()


class Migration(migrations.Migration):
    dependencies = [
    ]
    operations = [migrations.RunPython(populate_tags_priorities)]

