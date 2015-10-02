 A Social Network for Project Task Management
============

Installation:
1. Enter the root directory of the project. 
2. Install the server dependancies using the command `pip install -r requirements.txt`
3. At the root directory of the project, create the database with the following commands:
3.1. `python manage.py migrate core`
3.2. `python manage.py migrate chat`
3.3. `python manage.py migrate`
4. Run the server using the command `python manage.py runserver`
5. To use the server, navigate to localhost:8000 in a web browser, or 127.0.0.1:8000. 

Users should note that some front end dependancies have been shipped with the
project within the static/ folder. 
