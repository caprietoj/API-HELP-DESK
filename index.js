require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const sequelize = require('./config/database');
const routes = require('./routes');
const swaggerOptions = require('./config/swagger');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Cors
app.use(cors());

// Documentación con Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api', routes);




// Sincronización y arranque del servidor
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
