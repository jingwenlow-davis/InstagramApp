# ECS165a Instagram Clone

## Development
### virtual env
create virtual environment
```
virtual env -p python3 venv
OR
python3 -m virtualenv venv
```

start virtual environment
```
source venv/bin/activate
```

should see `(venv)` show up in command prompt

install requirements our project uses
```
pip install -r requirements.txt
```


to exit virtual environment
```
deactivate
```


### start Django
Make sure to be in backend folder
```
python manage.py runserver
```
open [127.0.0.1:8000](127.0.0.1:8000)

set up database (do this whenever changes made to model)
```
python manage.py makemigrations
python manage.py migrate
```
#### Admin
username: admin\
password: pw


### account details for snack ###
username: shraddha55\
Password: ECS165PrettyNear

### API Endpoints ###
For logging in
```
method = POST
url = https://pretty-near-ecs-165a.appspot.com/api/login/
sample body:
{
	"username": "u",
	"password": "p"
}
```

For signing up
```
method = POST
url = https://pretty-near-ecs-165a.appspot.com/api/signup/
sample body:
{
	"username": "username",
	"password": "password",
	"first_name": "Rishi",
	"last_name": "Dutta",
	"gender": "Male",
	"email": "rdindianboy@gmail.com"
}
```

For updating settings
```
method = POST
url = https://pretty-near-ecs-165a.appspot.com/api/updatesettings/
sample body:
{
	"username": "rishuv",
	"password": "password",
	"first_name": "Rishi",
	"last_name": "Dutta",
	"gender": "Female",
	"email": "rdindianboy@gmail.com",
	"birthday": "10/13/1996"
}
```

For creating post
```
method = POST
url = https://pretty-near-ecs-165a.appspot.com/api/posts/createpost/
sample body:
{
	"caption": "photo of me",
	"image": alex.png //hopefully serializer will be able to serialize any file attached
}
```

For getting feed
```
method = GET
url = https://pretty-near-ecs-165a.appspot.com/api/posts/getfeed/
sample output:
[ //list of all posts excluding current user's posts
    {
        "id": 2,
        "image": "staticfiles/Screenshot_from_2018-11-27_10-23-03_VoRn5Wa.png",
        "caption": "rishi's post",
        "posted_by": 2,
        "hashtags": [
            3,
            4
        ]
    },
    {
        "id": 3,
        "image": "staticfiles/Screenshot_from_2018-11-27_10-23-03_2xzog3K.png",
        "caption": "jerry's post",
        "posted_by": 3,
        "hashtags": [
            1,
            2
        ]
    }
]
```

For getting current user posts
```
method = GET
url = https://pretty-near-ecs-165a.appspot.com/api/posts/getuserposts/
sample output:
[ //list of all posts of current user
    {
        "id": 1,
        "image": "staticfiles/Screenshot_from_2018-12-05_17-18-34_tyzPw3Z.png",
        "caption": "u's post",
        "posted_by": 1,
        "hashtags": [
            1,
            3,
            5
        ]
    }
]
```
For searching posts by username
```
method = GET
sample url = https://pretty-near-ecs-165a.appspot.com/api/posts/?posted_by__username=rishi 
//set ?posted_by__username to which user you search for
sample output:
[ //list of user of username rishi posts
    {
        "id": 2,
        "image": "http://localhost:8000/api/posts/staticfiles/Screenshot_from_2018-11-27_10-23-03_VoRn5Wa.png",
        "caption": "rishi's post",
        "posted_by": 2,
        "hashtags": [
            3,
            4
        ]
    }
]
```

For searching posts by hashtag
```
method = GET
sample url = https://pretty-near-ecs-165a.appspot.com/api/posts/?hashtags__hashtag=%23lit 
//set ?hashtags__hashtag to which hashtag you want to search for
//%23 is used to encode '#'
sample output:
[ //list of posts with #lit
    {
        "id": 3,
        "image": "http://localhost:8000/api/posts/staticfiles/Screenshot_from_2018-11-27_10-23-03_2xzog3K.png",
        "caption": "jerry's post",
        "posted_by": 3,
        "hashtags": [
            1,
            2
        ]
    },
    {
        "id": 1,
        "image": "http://localhost:8000/api/posts/staticfiles/Screenshot_from_2018-12-05_17-18-34_tyzPw3Z.png",
        "caption": "u's post",
        "posted_by": 1,
        "hashtags": [
            1,
            3,
            5
        ]
    }
]
```