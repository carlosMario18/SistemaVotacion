FROM python:3.12-slim

WORKDIR /app

# Instalar dependencias para PostgreSQL
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY ./voting_app/requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Instalar gunicorn
RUN pip install gunicorn

# Copiar proyecto completo
COPY ./voting_app/ .

# Railway inyecta automáticamente la variable $PORT
CMD ["sh", "-c", "gunicorn voting_app.wsgi:application --bind 0.0.0.0:$PORT"]
