# Dream Team FC

## Descripción del Proyecto

El backend de esta aplicación es responsable de proporcionar la lógica y funcionalidad necesaria para el correcto funcionamiento de la aplicación.

## Características Principales

- Gestión de Usuarios: Registro, autenticación y gestión de perfiles de usuario.
- Gestión de Tarjetas de Futbolistas: Creación, lectura, actualización y eliminación de tarjetas con información detallada de futbolistas. Búsqueda y filtrado de tarjetas.
- Página de Detalles: Visualización de información adicional de los futbolistas en una página específica.
- Base de Datos: Uso de MongoDB con Mongoose para almacenamiento.

## Tecnologías Utilizadas

- MongoDB con Mongoose (Base de datos)
- Express (Backend)
- Node.js (Backend)

## Configuración

Antes de ejecutar el backend de la aplicación, asegúrese de tener instaladas las siguientes dependencias:

1. Node.js: Descargar e instalar Node.js.
2. MongoDB: Descargar e instalar MongoDB.

## Endpoints del Backend

### Rutas de Footballers

- `GET /`: Obtiene todos los futbolistas.
- `GET /search`: Busca futbolistas.
- `GET /:id`: Obtiene un futbolista por su ID.
- `POST /`: Crea un nuevo futbolista.
- `PATCH /:id`: Actualiza la información de un futbolista existente.
- `DELETE /:id`: Elimina un futbolista.

### Rutas de Usuarios

- `GET /`: Obtiene todos los usuarios.
- `POST /register`: Registra un nuevo usuario.
- `POST /login`: Inicia sesión de usuario.
- `PATCH /login`: Actualiza la información de inicio de sesión.
- `DELETE /delete/:id`: Elimina un usuario por su ID.

### Configuración del Backend:

1. Clone el repositorio, instale dependencias y configure el servidor:

````bash
   git clone https://github.com/isdi-coders-2023/Franz-Salinas-Final-Project-back-202309-mad.git
   cd franz-salinas-final-project-back-202309-mad
   npm install

Cree un archivo .env en el directorio raíz del proyecto.
Configure las variables de entorno necesarias. Consulte el archivo .env.example para obtener una lista de las variables requeridas.
Inicie el servidor:

```bash

npm start
Contribución
Si desea contribuir a este proyecto, siga estos pasos:

Haga un fork del repositorio.
Cree una rama para su función o corrección de errores: git checkout -b feature/your-feature-name.
Realice los cambios necesarios y realice los commits: git commit -am 'Add some feature'.
Haga push a la rama: git push origin feature/your-feature-name.
Envíe una solicitud de extracción al repositorio original.
````
