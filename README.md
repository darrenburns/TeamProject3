A Social Network for Project Task Management
============

[ ![Codeship Status for darrenburns/TeamProject3](https://codeship.com/projects/a9a382a0-4c1d-0132-f820-2ebd99ec2702/status)](https://codeship.com/projects/46976)

###Setup Intructions

You need to install NodeJS and then use Node Package Manager to install Bower globally:
`npm install -g bower`

1. Clone the project.
2. Install server dependencies: `pip install -r requirements.txt`
3. Install front-end dependencies: `bower install`
4. Create development database: `python manage.py syncdb`
5. Run the local server: `python manage.py runserver`

###Doing Work

Before doing anything you need a local copy of the repository:
`git clone <<clone URL>>`
*Note*: If you're using a lab machine, you need to clone using SSH or you'll get an error.

###General instructions:

1. Create your branch on GitHub.
2. `git checkout --track origin/<<name_of_your_branch>>` to switch to your newly created branch. (You **MUST** work on branches other than master or beta to ensure that you don't push your changes to these branches.)
3. Do work.
4. `git status` to check the files that you've changed show up as altered (Note: The files have only been altered on the branch you're currently on, so if you're on your own branch you're free to experiment.).
5. `git add .` to tell Git that you want to commit these files.
6. `git status` again to see that all of the files you added are now in the staging area, ready to be commited.
7. `git commit -m 'Message explaining the commit, what did you change/do'`.
8. `git status` again there should be no changes to commit. Do `git log` to see your commit has been added.
9. `git push origin HEAD` will your new local commit to the remote repository on GitHub. (HEAD refers to the branch you're currently on. Before getting to this point you should be certain that you're on the correct branch. You can check which branch you're on using `git status`. You should *never* push to master or beta branches directly.)
11. When you're finished work on your branch you can create a pull request on GitHub to request that the changes get added to the beta branch. So when you make a pull request, make sure it's against beta. It's better practice to merge our changes into a beta branch before the master branch, so that we can test functionality before finally releasing to master.
