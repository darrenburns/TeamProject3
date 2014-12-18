import datetime
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.utils import timezone
from chat.forms import TicketNotesForm
from chat.models import Chat

@login_required()
def chat(request, chat_id):

    chat = Chat.objects.get(id=chat_id)

    if request.method == 'POST':
        if chat.ticket is not None:  # TODO: if there is no ticket in existence then create it (get_or_create())

            ticket_notes_form = TicketNotesForm(request.POST, instance=chat.ticket)
            if ticket_notes_form.is_valid():
                ticket_notes_form.save(commit=True)
                redirect('chat.views.chat', chat_id)
            else:
                redirect('chat.views.chat', chat_id)  # TODO: create an error here
    else:
        ticket_notes_form = TicketNotesForm(instance=chat.ticket)

    now = timezone.now()

    return render(request, 'chat.html', {'chat': chat,
                                         'now': now,
                                         'ticket_notes_form': ticket_notes_form})


# TODO: integrate with permissions when available
def close_chat(request, chat_id):
    chat = Chat.objects.get(id=chat_id)
    chat.closed = datetime.datetime.now()
    chat.save()
    return redirect('chat.views.chat', chat_id)


# TODO: integrate with permissions when available
def reopen_chat(request, chat_id):
    chat = Chat.objects.get(id=chat_id)
    chat.closed = None
    chat.save()
    return redirect('chat.views.chat', chat_id)


# TODO: integrate with permissions when available
def delete_chat(request, chat_id):
    chat = Chat.objects.get(id=chat_id)
    chat.delete()
    return redirect('core.views.dashboard')


