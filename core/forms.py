from django.forms import ModelForm
from chat.models import Chat, Ticket
from core.models import Project


class ProjectCreationForm(ModelForm):

    class Meta:
        model = Project


class ChatCreationForm(ModelForm):

    class Meta:
        model = Chat


class TicketDataForm(ModelForm):

    class Meta:
        model = Ticket

