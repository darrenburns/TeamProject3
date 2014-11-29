from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required()
def ticket(request):
    return render(request, 'ticket.html')