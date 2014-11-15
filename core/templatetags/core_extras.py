# Adapted from: https://gist.github.com/TimFletcher/034e799c19eb763fa859

from django import template
from django.forms.forms import BoundField

register = template.Library()
 
@register.filter(name='add_attrs')
def add_attributes(field, css):
    """
    A filter that allows you to apply an attribute to an Django rendered
    element. For example, a form field.
    """
    attrs = {}
    definition = css.split(',')
 
    for d in definition:
        if ':' not in d:
            attrs['class'] = d
        else:
            t, v = d.split(':')
            attrs[t] = v

    if isinstance(field, BoundField):
        return field.as_widget(attrs=attrs)
    return field

