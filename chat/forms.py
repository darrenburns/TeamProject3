from django.forms import ModelForm
from chat.models import Ticket


class TicketNotesForm(ModelForm):

    class Meta:
        model = Ticket
        fields = ['notes']