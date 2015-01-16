import datetime
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from chat.models import Chat

@login_required()
def chat(request, chat_id):
    chat = Chat.objects.get(id=chat_id)
    return render(request, 'chat.html', {'chat': chat})


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


