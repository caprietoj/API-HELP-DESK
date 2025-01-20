# API de Gestión de Tickets (Help Desk)

Este proyecto es una **API de Gestión de Tickets** diseñada para facilitar el reporte, seguimiento y resolución de incidentes en un sistema de help desk. Además, incluye la gestión de técnicos, usuarios, y tipos de incidentes, con autenticación mediante tokens JWT.

---

## 🚀 Características Principales

1. **Gestión de Tickets:**
   - Crear, listar, editar y eliminar tickets.
   - Notificaciones por correo al crear, asignar o cerrar tickets.

2. **Gestión de Técnicos:**
   - Crear, listar, editar y eliminar técnicos.

3. **Gestión de Usuarios:**
   - Registro, edición, eliminación y autenticación de usuarios.
   - Roles y permisos para asegurar el acceso adecuado.

4. **Tipos de Incidentes:**
   - Listar y gestionar los diferentes tipos de incidentes.

5. **Autenticación y Seguridad:**
   - Autenticación mediante JWT.
   - Rutas protegidas para recursos específicos.

6. **Documentación:**
   - Documentación automática generada con Swagger.

---

## 📂 Estructura del Proyecto

```plaintext
├── config/
│   ├── database.js        # Configuración de Sequelize
│   └── .env               # Variables de entorno
├── models/
│   ├── Ticket.js          # Modelo de tickets
│   ├── Technician.js      # Modelo de técnicos
│   ├── User.js            # Modelo de usuarios
│   └── IncidentType.js    # Modelo de tipos de incidentes
├── routes/
│   ├── ticketRoutes.js    # Rutas para tickets
│   ├── technicianRoutes.js# Rutas para técnicos
│   ├── userRoutes.js      # Rutas para usuarios
│   ├── incidentRoutes.js  # Rutas para incidentes
│   └── index.js           # Archivo principal de rutas
├── services/
│   └── emailService.js    # Servicio para enviar correos
├── middleware/
│   └── authenticate.js    # Middleware de autenticación
├── swagger/
│   └── swagger.json       # Configuración de Swagger
├── app.js                 # Configuración principal del servidor
├── package.json           # Dependencias del proyecto
└── README.md              # Documentación del proyecto
⚙️ Requisitos Previos
Node.js (v14 o superior)
MySQL (Base de datos)
Correo SMTP para notificaciones (ej., Gmail)
Postman (Opcional para pruebas manuales)
🔧 Configuración
Clona este repositorio:

bash
Copiar
Editar
git clone https://github.com/usuario/proyecto-helpdesk.git
cd proyecto-helpdesk
Instala las dependencias:

bash
Copiar
Editar
npm install
Configura las variables de entorno: Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

env
Copiar
Editar
PORT=5000
DATABASE_URL=mysql://user:password@localhost:3306/helpdesk
JWT_SECRET=tu_secreto
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_contraseña
Configura la base de datos:

Crea una base de datos llamada helpdesk.
Ejecuta las migraciones con Sequelize:
bash
Copiar
Editar
npx sequelize-cli db:migrate
Inicia el servidor:

bash
Copiar
Editar
npm start
Abre la documentación Swagger:

Visita: http://localhost:5000/api-docs.
🛠️ Uso de la API
Autenticación
Inicio de Sesión: POST /api/users/login
Requiere: email y password.
Devuelve: Token JWT.
Gestión de Tickets
Crear Ticket: POST /api/tickets
Listar Tickets: GET /api/tickets
Editar Ticket: PUT /api/tickets/:id
Eliminar Ticket: DELETE /api/tickets/:id
Gestión de Técnicos
Crear Técnico: POST /api/technicians
Listar Técnicos: GET /api/technicians
Editar Técnico: PUT /api/technicians/:id
Eliminar Técnico: DELETE /api/technicians/:id
Gestión de Usuarios
Registrar Usuario: POST /api/users/register
Listar Usuarios: GET /api/users
Editar Usuario: PUT /api/users/:id
Eliminar Usuario: DELETE /api/users/:id
🛡️ Seguridad
Autenticación: Todas las rutas están protegidas mediante JWT.
Validaciones: Asegúrate de enviar datos válidos en todas las solicitudes.
🐞 Problemas Comunes
Error notNull Violation:

Solución: Asegúrate de enviar todos los datos obligatorios en la solicitud.
Error al enviar correos:

Solución: Verifica las credenciales en el archivo .env.
Error ECONNREFUSED al conectarse a la base de datos:

Solución: Verifica que MySQL esté corriendo y que las credenciales sean correctas.
🛠️ Tecnologías Utilizadas
Node.js: Backend.
Sequelize: ORM para MySQL.
Express.js: Framework para APIs.
Nodemailer: Envío de correos.
Swagger: Documentación de API.
JWT: Autenticación.
✨ Contribuciones
Si deseas contribuir, crea un fork de este repositorio y envía un pull request con tus cambios. ¡Todas las mejoras son bienvenidas!

📄 Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

yaml
Copiar
Editar

---

### **Personalización**
- Actualiza las URLs, nombres y descripciones según tu proyecto.
- Añade secciones adicionales si implementas nuevas funcionalidades. 🚀