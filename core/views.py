from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.forms import UserCreationForm
from django.core.context_processors import csrf
from django.core.urlresolvers import reverse
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.http import HttpResponseRedirect
from django.shortcuts import render, render_to_response
from django.contrib.auth.models import User, Group, Permission
from chat.models import Ticket
from core.models import UserProfile
from django.utils.translation import ugettext, ugettext_lazy as _
from django.contrib.auth import forms

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
                return HttpResponseRedirect(next) if next else HttpResponseRedirect(reverse('core.views.dashboard'))
            else:
                return render(request, 'login.html', {'account_deleted': True})
        else:
            return render(request, 'login.html', {'login_invalid': True})
    else:  # If the user is just looking to view the login page (hasn't submitted form)
        return render(request, 'login.html', {'next': next})


def user_logout(request):
    """
    Logs the user out and renders the home page with a message informing them that
    they've just logged out.
    """
    logout(request)
    return render(request, 'home.html', {'just_logged_out': True})


# Helper function to avoid list comprehensions.
def usersInGroup(groupName):
	group = Group.objects.filter(name=groupName)[0]
	usersToReturn = []
	for user in User.objects.all():
		if group in user.groups.all():
			usersToReturn.append(user)
	return usersToReturn


# We need to set groups and permissions in a custom form, so create one here. 
class CustomUserCreationForm(UserCreationForm):
    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
            if len(usersInGroup("project manager")) == 0:
                user.groups.add(Group.objects.filter(name="project manager")[0])
            else:
                user.groups.add(Group.objects.filter(name="developer")[0])
        return user


def user_register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
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
    profile = UserProfile.objects.get(user = user)
    return render(request, 'user_profile.html', {'user': user,
                                                 'userProfile': profile})


# temporary until group layer is properly sorted out.
user_groups = [Group.objects.get(name="qa manager"), Group.objects.get(name="project manager"),Group.objects.get(name="developer")]

@login_required
@permission_required("is_superuser")
def user_permission_change(request, username):
    message = ''
    user = User.objects.get(username=username)
    current_group = ''

    if request.method == "POST":
        group_choice = request.POST['choice']
        group = Group.objects.get(name=group_choice)
        for user_group in user_groups:
            user.groups.remove(user_group) 
        user.groups.add(group)
        current_group = group.name
        message = 'Submitted!'
    else:
        # Note that this will match for at most one group, as we will only ever have one group set.
        for potentialGroup in user_groups:
            if potentialGroup in user.groups.all(): current_group = potentialGroup.name

    return render(request, 'user_permissions.html', {'user': user,
                                                     'userProfile': UserProfile.objects.get(user=user),
                                                     'current_group': current_group,
                                                     'message': message})




def sidebar_ticket_list(request, project_id):
    """
    From the project_id and the logged in user we can generate the list of tickets
    that the user can see. Returns a rendered template of a list of tickets which
    is dynamically injected into the sidebar using Ajax.
    """
    tickets = Ticket.objects.query()
    return render(request, 'ajax/dashboard/sidebar_ticket_list.html', {'tickets': tickets})
