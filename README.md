# 🗳️ Real-Time Voting API - Django Rest Framework

API RESTful simple para un sistema de **votaciones en tiempo real**, desarrollada con **Django Rest Framework**, **PostgreSQL** y **Docker**.

## 🚀 Características

- Crear encuestas con múltiples opciones.
- Consultar resultados (votos por opción).
- Votar por una opción específica.
- Base de datos persistente en PostgreSQL.
- Pruebas automatizadas de integración y E2E.
- Configuración lista para entornos locales o Docker.

---

## 🧩 Tecnologías

- **Python 3.10**
- **Django 4.2**
- **Django REST Framework**
- **PostgreSQL 15**
- **Docker & Docker Compose**
- **pytest + Playwright**

---

## ⚙️ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Python 3.10+](https://www.python.org/downloads/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (recomendado)


# 1. Clonar el repositorio
# 2. crear y activar entorno virtual
- python -m venv venv
- venv\Scripts\activate
- cd voting_api

# 3. Instalar dependencias
- pip install --upgrade pip
- pip install -r requirements.txt

# 4. crear archivo .env en la raiz del proyecto.

SECRET_KEY=django-insecure-tukeysegura
DEBUG=True
DB_NAME=votingdb
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432

# 5. Migraciones.
- python manage.py makemigrations
- python manage.py migrate

# 6. Ejecutar en local.
- python manage.py runserver

## ENDPOINTS DISPONIBLES
| Método | URL               | Descripción                  | Datos esperados                                                                  |
| ------ | ----------------- | ---------------------------- | -------------------------------------------------------------------------------- |
| POST   | /polls/           | Crear encuesta               | `{ "title": "Pregunta", "options": [{"text": "Opción1"}, {"text": "Opción2"}] }` |
| GET    | /polls/{id}/      | Obtener detalles de encuesta | -                                                                                |
| POST   | /polls/{id}/vote/ | Votar en una opción          | `{ "option_id": 1 }`                                                             |


# Pruebas unitarias.
- python manage.py test


## Levantar proyecto con Docker.

- docker-compose up --build

# Migraciones.
- docker-compose exec web python manage.py makemigrations
- docker-compose exec web python manage.py migrate






# Preguntas arquitectura y buenas prácticas

- Diseño de Sistemas: Describe, a alto nivel, cómo diseñarías la arquitectura de un servicio acortador de URLs (como Bitly). ¿Qué componentes principales tendría (API, base de datos, etc.)? ¿Qué base de datos elegirías (SQL o NoSQL) y por qué? ¿Cómo lo harías escalable para millones de peticiones?

API Gateway / Edge para recibir redirección y hacer el lookup más rápido.
Service API (REST/GraphQL): endpoints para crear URLs más cortas, gestionar alias, expiración, autenticación, y obtener análisis de los datos.
Auth & Rate Limiting, API keys para clientes .
Admin UI / Dashboard para la gestión de links y métricas que arroja el sistema.
Backups y migraciones para exportar mappings, snapshot incremental.

Elección de una base de datos NoSQL, por el patrón simple de acceso, baja latencia en lectura/ escritura, fácil escalado horizontal de los datos del proyecto, particionado (sharding) automático en muchos proveedores.

Se haría escalable para millones de peticiones usando autoscaling con métricas en CPU/latencia/queue length para escalar los servicios, mantener un path de redirección mínimo y evitar consultas adicionales para la optimización de latencia, así como hacerlo asíncrono para el análisis por eso el uso de una db NoSQL para escaalr horizontalmente, al no blockear requests de redirección o push eventos a stream y procesar off-line.


- ilosofía del testing: ¿Cuál es tu enfoque sobre el testing automatizado? Describe la pirámide de testing (unitaria, integración, E2E) y explica por qué es importante. ¿En qué escenarios consideras que Playwright es la herramienta ideal?

Mi enfoque acerca del testing automatizado es que es rápido, tanto en ejecución como en retroalimentación de pruebas, son fundamentales para la protección de datos, se pueden usar cómo la primera línea de defensa.

Pirámide de testing: Unitaria: pruebas simples y rápidas sobre una clase o método del sistema para comprobar su correcto funcionamiento y propósito
Integración: Es el nivel medio de las pruebas, en esta etapa se evalúa cómo interactúan los componentes de software entre sí, ya sean integraciones internas o externas (bases de datos o contenedores), debido a que evalúa más componentes que la prueba unitaria es más demorada en diagnosticar y solucionar problemas.
E2E: Prueban por completo la funcionalidad y correcto desarrollo de un software, utiliza datos y un entorno de prueba para simular el funcionamiento del software en el mundo real, convirtiéndola en la prueba que más recursos requiere para poder utilizar.

La pirámide de tetsing es importante porque ayuda a detectar errores de lógica al instante, así cómo asegura el correcto funcionamiento de todos los componentes y sus relaciones entre sí.

Playwright es ideal para la prueba E2E, esto gracias a la automatización de flujos que involucran autenticación, interacciones complejas, descarga y carga de archivos, testing de comportamiento real del navegador. También sirve para testing de integración del frontend con backend simulando usuarios reales.


- DevOps y CI/CD: Describe un pipeline de CI/CD que hayas implementado o con el que hayas trabajado. ¿Qué etapas incluía? ¿Cómo garantizaba la calidad antes de llegar a producción?
Diseñé un pipeline CI/CD con GitHub Actions y Docker para un backend en Django Rest Framework. En la primera etapa generaba la imagen Docker y se ejecutaban pruebas unitarias. Luego en la etapa test, validábamos endpoints críticos con Postman y scripts automatizados. Si todo pasaba, el pipeline desplegaba al entorno de pruebas. Tras revisión manual en staging, hacíamos merge a main, lo que disparaba el despliegue a producción. Este flujo permitió despliegues diarios sin interrupciones y con control total del ciclo de entrega.


- Liderazgo Técnico: Durante una revisión de código (code review), descubres que un desarrollador junior ha implementado una solución que funciona, pero que tiene serios problemas de rendimiento. ¿Cómo abordarías la retroalimentación?
Reproducir el problema y recopilar los problemas obtenidos y así mostrar datos objetivos ayuda.
Revisar junto con el desarrollador el por qué el enfoque actual es problemático ya sea por latencia o sincronización, y en qué escenarios podría fallar (picos de tráfico). Proponer alternativas concretas como precomputación o Pair programming, ofrecer hacer pair programming para mejora o proponer un PR con la mejora. Acompañamiento continúo y envío de recursos cómo artículos, ejemplos y tests que ilustren la mejora. Si el cambio que se requiere es grande propongo un plan incremental, por último, se revisa la nueva implementación, se celebra la mejora y el trabajo colaborativo y se procede a documentar la decisión en un issue para que no se repita.
