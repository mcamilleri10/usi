# usi

Build Instructions (mac)

-make a new directory and cd into it in the terminal

-run `git clone https://github.com/mcamilleri10/usi.git` to clone the project repo

-cd into the repo and then into `backend` directory and run `python3 -m pipenv install`

-run `python3 -m pipenv shell` to setup an isolated environment

-open the cloned repo in VSCode

select the correct pip environment: shift-cmd-P to open the Command Palette, search for and select “Python: Select Interpreter”, select the pip shell you created

-confirm you are still in the `backend` directory and run `python3 manage.py migrate` to setup the database

-run `python3 manage.py createsuperuser` and then input desired admin username, email, and password

-run `python3 manage.py loaddata seed_data.json` to seed the database

-run `python3 manage.py runserver` and go to http://localhost:8000/admin in your browser. log in with the credentials you created

-in a new terminal window, cd into the `frontend` directory

-run `npm install`

-run `npm start` and go to http://localhost:3000 to view the data in a sortable table

-when finished, kill both servers with `ctrl-c`

