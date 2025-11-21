FROM python:3.12-slim

WORKDIR /app

# Instalar dependencias del sistema necesarias para psycopg2 y gunicorn
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY ./voting_app/requirements.txt .

# Instala dependencias Python
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY ./voting_app/ .

# Exponer puerto que Railway detectará
EXPOSE 8000

# Comando en producción
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "voting_app.wsgi:application"]
