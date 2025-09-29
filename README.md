# Prueba Técnica - API REST de Pedidos de Envío

## 1. Descripción del proyecto
API REST desarrollada en **NestJS** para crear y consultar pedidos de envío.  
Se utiliza **PostgreSQL** para la persistencia de datos mediante **TypeORM**.

---

## 2. Requisitos
- Node.js >= 18
- npm 
- PostgreSQL
- Docker (opcional, si se desea levantar la base de datos con contenedor)
- Git

---

## 3. Instalación

# Clonar el repositorio
  git clone <repo_url>
  cd <nombre_proyecto>

# Instalar dependencias
npm install

## 4. Variables de Entorno


Antes de ejecutar el proyecto, copia el archivo de ejemplo y ajusta los valores según tu entorno:
}
  cp .env.example .env

POSTGRES_DB=my_database
POSTGRES_USER=my_user
POSTGRES_PASSWORD=my_password
DB_HOST=localhost
DB_PORT=5432
PORT=3000



## 5. Levantar la Api

# Desarrollo
npm run start:dev

# Producción

npm run start

# verificar levantamiento del servidor 
localhost:3000

## 6. Levantar la base de datos PostgreSQL

Puedes levantar PostgreSQL usando **Docker Compose** (recomendado) o un comando `docker run`.

docker run --name postgres_db -e POSTGRES_USER=usuario -e POSTGRES_PASSWORD=contraseña -e POSTGRES_DB=nombre_db -p 5432:5432 -d postgres:13

# crear docker-compose.yml en la raiz del proyecto


# crear y arrancar el contenedor
  docker compose up -d


## 7. Endpoints

# POST /pedidos
Content-Type: application/json

{
  "cliente": "Jhon Doe",
  "origen": "Medellín",
  "destino": "Bogotá",
  "mercancia": "Ropa",
  "pesoKg": 10,
  "estado": "CREADO"
}
 # listar pedidos con paginacion y filtro

 GET /pedidos?page=1&limit=10&estado=CREADO
 
 # parametros de query:

 pagina (opcional, entero ≥ 1, default: 1)

limite (opcional, entero 1–50, default: 10)

estado (opcional: CREADO, EN_TRANSITO, ENTREGADO)

# respuesta estandar 
{
  "data": [
    {
      "id": "uuid-del-pedido",
      "cliente": "Jhon Doe",
      "origen": "Medellín",
      "destino": "Bogotá",
      "mercancia": "Ropa",
      "pesoKg": 10,
      "estado": "CREADO",
      "createdAt": "2025-09-29T21:53:11.095Z"
    }
  ],
  "meta": {
    "total": 123,
    "page": 1,
    "limit": 10,
    "totalPages": 13
  }
}

# obtener pedido por ID

GET /pedidos/<id>

## 8. Validaciones

Campos requeridos: cliente, origen, destino, mercancia, pesoKg, estado.

pesoKg debe ser mayor que 0.

estado debe ser uno de: CREADO, EN_TRANSITO, ENTREGADO.

pagina y limite deben estar dentro de los rangos válidos; si no, se retorna error 400.

limite recomendado máximo 50 por página.

## 9. Scripts disponibles

npm run start:dev    # Ejecuta en modo desarrollo 
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
npm run test         # Ejecuta tests

## 10. Pruebas con Postman/curl

# crear pedido con curl

curl -X POST http://localhost:3000/pedidos \
-H "Content-Type: application/json" \
-d '{
  "cliente": "Jhon Doe",
  "origen": "Medellín",
  "destino": "Bogotá",
  "mercancia": "Ropa",
  "pesoKg": 10,
  "estado": "CREADO"
}'

# obtener pedidos
todos los pedidos:

curl "http://localhost:3000/pedidos"

pedidos con paginación, limite y estado

curl "http://localhost:3000/pedidos?page=1&limit=5&estado=CREADO"

# obtener pedido por ID

curl "http://localhost:3000/pedidos/<id>"


## 11. documentacion swagger


La API cuenta con documentación automática usando **Swagger**. Puedes acceder a ella desde:

http://localhost:3000/api

En Swagger se podrá probar los endpoints:

- `POST /pedidos` → Crear un pedido
- `GET /pedidos` → Listar pedidos con paginación y filtro por estado
- `GET /pedidos/:id` → Obtener un pedido por su ID

## 12. coleccion postman

## Coleccion POSTMAN

Se incluye una colección de Postman con los endpoints de la API:

- [Pedidos API Collection](postman/Pedidos%20API.postman_collection.json)

Para usarla:

1. Abre Postman.
2. Ve a **File → Import**.
3. Selecciona el archivo `Pedidos%20API.postman_collection.json`.
4. Los endpoints ya estarán listos para probar.
