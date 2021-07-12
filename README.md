# VerzelTest

## How to run

- [ ] Install the [docker](https://docs.docker.com/engine/install/) and the [docker-compose](https://docs.docker.com/compose/install/) if you have not yet installed
- [ ] Run the command below at the repository root

```
sudo docker-compose up -d
```

**Ps:** If the docker doesn't work on your machine try this way:

An instance of the terminal:

```
cd frontend/frontendProject;yarn;yarn dev
```

Another instance of the terminal:

```
cd backend/backendProject;pipenv install --skip-lock;pipenv run python manage.py runserver 127.0.0.1:8000
```

## The API doc:
http://127.0.0.1:8000/api/doc/v1/