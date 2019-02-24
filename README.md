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
