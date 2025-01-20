const express = require('express');
const Request = require('../models/Request');
const RequestType = require('../models/RequestType');
const { sendEmail } = require('../services/emailService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Gestión de solicitudes
 */

/**
 * @swagger
 * /api/request-types:
 *   post:
 *     summary: Crear un tipo de solicitud
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de solicitud creado correctamente
 */
router.post('/request-types', async (req, res) => {
  try {
    const { name, description } = req.body;
    const requestType = await RequestType.create({ name, description });
    res.status(201).json(requestType);
  } catch (err) {
    console.error('Error al crear tipo de solicitud:', err);
    res.status(500).json({ error: 'Error al crear tipo de solicitud' });
  }
});

/**
 * @swagger
 * /api/request-types:
 *   get:
 *     summary: Listar tipos de solicitudes
 *     tags: [Requests]
 *     responses:
 *       200:
 *         description: Lista de tipos de solicitudes
 */
router.get('/request-types', async (req, res) => {
  try {
    const requestTypes = await RequestType.findAll();
    res.json(requestTypes);
  } catch (err) {
    console.error('Error al listar tipos de solicitudes:', err);
    res.status(500).json({ error: 'Error al listar tipos de solicitudes' });
  }
});

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Crear una solicitud
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cedula:
 *                 type: string
 *               position:
 *                 type: string
 *               requestTypeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Solicitud creada correctamente
 */
router.post('/requests', async (req, res) => {
  try {
    const { name, cedula, position, requestTypeId } = req.body;

    const request = await Request.create({
      name,
      cedula,
      position,
      requestTypeId,
    });

    // Enviar correo al usuario
    const userSubject = `Solicitud Creada: ${requestTypeId}`;
    const userText = `Hola ${name},\n\nTu solicitud ha sido registrada con los siguientes detalles:\n\nTipo: ${requestTypeId}\nCédula: ${cedula}\nCargo: ${position}\n\nGracias.`;
    await sendEmail(req.body.email, userSubject, userText);

    // Enviar correo a jefesistemas
    const adminSubject = 'Nueva Solicitud Generada';
    const adminText = `Se ha generado una nueva solicitud:\n\nNombre: ${name}\nCédula: ${cedula}\nCargo: ${position}\nTipo: ${requestTypeId}`;
    await sendEmail('jefesistemas@tvs.edu.co', adminSubject, adminText);

    res.status(201).json(request);
  } catch (err) {
    console.error('Error al crear la solicitud:', err);
    res.status(500).json({ error: 'Error al crear la solicitud' });
  }
});

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Listar solicitudes por tipo
 *     tags: [Requests]
 *     parameters:
 *       - in: query
 *         name: typeId
 *         schema:
 *           type: integer
 *         description: ID del tipo de solicitud
 *     responses:
 *       200:
 *         description: Lista de solicitudes
 */
router.get('/requests', async (req, res) => {
  try {
    const { typeId } = req.query;
    const requests = await Request.findAll({
      where: { requestTypeId: typeId },
    });
    res.json(requests);
  } catch (err) {
    console.error('Error al listar solicitudes:', err);
    res.status(500).json({ error: 'Error al listar solicitudes' });
  }
});

module.exports = router;
