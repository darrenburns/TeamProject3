from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import Group, User


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

