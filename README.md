A Social Network for Project Task Management
============

[ ![Codeship Status for darrenburns/TeamProject3](https://codeship.com/projects/a9a382a0-4c1d-0132-f820-2ebd99ec2702/status)](https://codeship.com/projects/46976)

###Setup Intructions

1. Clone the project.
2. Install server dependencies: `pip install -r requirements.txt`
3. Install front-end dependencies: `bower install`
4. Create development database: `python manage.py syncdb`
5. Run the local server: `python manage.py runserver`

###Doing Work
Before doing anything you need a local copy of the repository:
`git clone <<clone URL>>`
*Note*: If you're using a lab machine, you need to clone using SSH or you'll get an error.


Then the most common workflow looks something like:

1. `git pull` to get any changes that other people have pushed to GitHub
2. Do some work.
3. `git status` to check the files that you've changed show up as altered.
4. `git add .` to tell Git that you want to commit these files.
5. `git status` again to see that all of the files you added are now in the staging area, ready to be commited.
6. `git commit -m 'Message explaining the commit, what did you change/do'`.
7. `git status` again there should be no changes to commit. Do `git log` to see your commit has been added.
8. `git push origin HEAD` will your new local commit to the remote repository on GitHub.
