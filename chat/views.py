from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from chat.models import Chat

@login_required()
def chat(request, chat_id):
    chat = Chat.objects.get(id=chat_id)
    return render(request, 'chat.html', {'chat': chat})


# TODO: integrate with permissions when available
def close_chat(request, chat_id):
    chat = Chat.objects.get(id=chat_id)
    chat.closed = True
    return render(request, 'dashboard.html', {})


# TODO: integrate with permissions when available
def delete_chat(request, chat_id):
    chat = Chat.objects.get(id=chat_id)
    chat.delete()
    return render(request, 'dashboard.html', {})
