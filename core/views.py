from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from core.forms import ProjectCreationForm
from django.contrib.auth.models import User
from chat.models import Ticket, Chat
from core.models import UserProfile, Project

@login_required
def home(request):
    """
    Renders the home page.
    """
    return render(request, 'dashboard.html')


def user_login(request):
    """
    Logs the user in and redirects them to the home page if they have submitted the login form
    successfully. Otherwise just renders the login page.
    """

    # We capture the page that the user was trying to access, so that
    # we can redirect them to it if they login successfully.
    if request.method == 'GET':
        next = request.GET.get('next')


    # If the user has just submitted the login form
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        next = request.GET.get('next')

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect(next) if next else HttpResponseRedirect(reverse('core.views.home'))
            else:
                return render(request, 'login.html', {'account_deleted': True})
        else:
            return render(request, 'login.html', {'login_invalid': True})
    else:  # If the user is just looking to view the login page (hasn't submitted form)
        return render(request, 'login.html', {'next': next})

@login_required
def user_logout(request):
    """
    Logs the user out and renders the home page with a message informing them that
    they've just logged out.
    """
    logout(request)
    return render(request, 'home.html', {'just_logged_out': True})


def user_register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'login.html', {'register_success': True})
        else:
            return render(request, 'register.html', {'form': form})

    args = {}
    args.update(csrf(request))

    args['form'] = UserCreationForm()

    return render_to_response('register.html', args)


@login_required
def dashboard(request):
    return render(request, 'dashboard.html')


@login_required
def user_profile(request, username):
    user = User.objects.get(username=username)
    profile = UserProfile.objects.get(user=user)
    projects = Project.objects.all()
    chats = Chat.objects.all()  # Todo: instead of getting them all, get only the tickets that this user is part of
    return render(request, 'user_profile.html', {'user': user,
                                                 'userProfile': profile,
                                                 'chats': chats,
                                                 'projects': projects})


def new_project(request):
    if request.method == 'POST':
        form = ProjectCreationForm(request.POST)
        if form.is_valid():
            form.save()

            return render_to_response('dashboard.html', context_instance=RequestContext(request))
        else:
            return render(request, 'new_project.html', {'form':form, 'error': True})

    args = {}
    args.update(csrf(request))

    args['form'] = ProjectCreationForm()

    return render(request, 'new_project.html', args)

