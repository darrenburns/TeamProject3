A Social Network for Project Task Management
============
Before doing anything you need a local copy of the repository:
`git clone <<clone URL>>`

Then the most common workflow looks something like:

1. `git pull origin master` to get any changes that other people have pushed to GitHub
2. Do some work.
3. `git status` to check the files that you've changed show up as altered.
4. `git add .`  or `git add file1 file2 file3 ...` to tell Git that you want to commit these files.
5. `git status` again to see that all of the files you added are now in the staging area, ready to be commited.
6. `git commit -m 'Message explaining the commit, what did you change/do'`.
7. `git status` again there should be no changes to commit. Do `git log` to see your commit has been added.
8. `git push origin HEAD` will your new local commit to the remote repository on GitHub.
