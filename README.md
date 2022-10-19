# war-game

## Introduction
A simple card game called war implemented using django framework along with javascript/jQuery
The interactions between front end (javascript) and back end(python and django) are
asynchronous. The game's logic is implemented in javascript and its score is sent to
backend database (sqlite). 

## Code repo
https://github.com/tianyachen/war-game  

## Run in local evironment

1.Download required python packages  
`pip install -r requirements.txt`  

2. Clone the repo  
`git clone git@github.com:tianyachen/war-game.git`   
or  
`git clone https://github.com/tianyachen/war-game.git`  

3. Create a virtual environment if preferred  

4. Create local database  
`python manage.py makemigrations wargame`  
`python manage.py migrate`  

5. Start django server  
`python manage.py runserver`  
In the defualt settings, the django server is running on 127.0.0.1:8000/  

The secret key is NOT supposed to be public, however, in order for the django to run
in local environment, this is essential. Therefore, I pushed the config.ini file
to the repo.   

## Visit the cloud server
The cloud server (apache) is running on AWS EC2.  
The ip is http://3.130.230.127


## Game Service GUI
In the index page, there are three buttons.  

1. Play: play a demo game. The simulation will run automatically and user don't need
to click for any events to happen.  

2. Score History: fetch all historic scores for player one and two  

3. Test: run batch games without animation. User needs to input number of games
in the prompt window. The results of runs will appear immedately after the run
is completed.   

