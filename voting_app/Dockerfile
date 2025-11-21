FROM python:3.12-slim

WORKDIR /app
COPY ./voting_app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY ./voting_app/ .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
