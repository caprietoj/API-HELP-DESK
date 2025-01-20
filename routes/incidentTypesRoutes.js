const express = require('express');
const IncidentType = require('../models/IncidentType');
const authenticateToken = require('../middleware/authenticate');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: IncidentTypes
 *   description: Gestión de tipos de incidentes
 */

/**
 * @swagger
 * /api/incident-types:
 *   post:
 *     summary: Crea un nuevo tipo de incidente
 *     tags: [IncidentTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de incidente creado correctamente
 *       400:
 *         description: Error al crear el tipo de incidente
 */
router.post('/', authenticateToken, async (req, res) => {
  const { type } = req.body;
  try {
    const incidentType = await IncidentType.create({ type });
    res.status(201).json(incidentType);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el tipo de incidente' });
  }
});

/**
 * @swagger
 * /api/incident-types:
 *   get:
 *     summary: Obtiene todos los tipos de incidentes
 *     tags: [IncidentTypes]
 *     responses:
 *       200:
 *         description: Lista de tipos de incidentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   type:
 *                     type: string
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const incidentTypes = await IncidentType.findAll();
    res.json(incidentTypes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los tipos de incidentes' });
  }
});

/**
 * @swagger
 * /api/incident-types/{id}:
 *   put:
 *     summary: Edita un tipo de incidente existente
 *     tags: [IncidentTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de incidente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de incidente actualizado correctamente
 *       404:
 *         description: Tipo de incidente no encontrado
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;
  try {
    const incidentType = await IncidentType.findByPk(id);
    if (!incidentType) {
      return res.status(404).json({ error: 'Tipo de incidente no encontrado' });
    }
    incidentType.type = type || incidentType.type;
    await incidentType.save();
    res.json(incidentType);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el tipo de incidente' });
  }
});

/**
 * @swagger
 * /api/incident-types/{id}:
 *   delete:
 *     summary: Elimina un tipo de incidente existente
 *     tags: [IncidentTypes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del tipo de incidente
 *     responses:
 *       200:
 *         description: Tipo de incidente eliminado correctamente
 *       404:
 *         description: Tipo de incidente no encontrado
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const incidentType = await IncidentType.findByPk(id);
    if (!incidentType) {
      return res.status(404).json({ error: 'Tipo de incidente no encontrado' });
    }
    await incidentType.destroy();
    res.json({ message: 'Tipo de incidente eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el tipo de incidente' });
  }
});

module.exports = router;
