from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.core.context_processors import csrf
from django.http import HttpResponseRedirect
from django.shortcuts import render, render_to_response


def home(request):
    """
    Renders the home page.
    """
    return render(request, 'home.html')


def user_login(request):
    """
    Logs the user in and redirects them to the home page if they have submitted the login form
    successfully. Otherwise just renders the login page.
    """

    # If the user has just submitted the login form
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                return render(request, 'login.html', {'account_deleted': True})
        else:
            return render(request, 'login.html', {'login_invalid': True})
    else:  # If the user is just looking to view the login page (hasn't submitted form)
        return render(request, 'login.html')


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

def user_projects(request):
    return render(request, 'projects.html')