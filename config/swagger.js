const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Help Desk API',
        version: '1.0.0',
        description: 'API para la gestión de tickets de soporte',
      },
    },
    apis: ['./routes/*.js'],
  };
  
  module.exports = swaggerOptions;
