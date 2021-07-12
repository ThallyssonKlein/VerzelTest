FROM python:3.7
WORKDIR /usr/src/app
COPY ./backendProject .
EXPOSE 8000
RUN pip install pipenv
RUN pipenv install --skip-lock
CMD pipenv run python manage.py runserver 0.0.0.0:8000