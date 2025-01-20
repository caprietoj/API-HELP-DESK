const express = require('express');
const { Op } = require('sequelize');
const KPI = require('../models/KPI');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: KPIs
 *   description: Gestión de KPIs
 */

/**
 * @swagger
 * /api/kpis:
 *   post:
 *     summary: Crear un nuevo KPI
 *     tags: [KPIs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               methodology:
 *                 type: string
 *               indicatorPercentage:
 *                 type: number
 *               frequency:
 *                 type: string
 *               measurementDate:
 *                 type: string
 *                 format: date
 *               achievedPercentage:
 *                 type: number
 *     responses:
 *       201:
 *         description: KPI creado correctamente
 */
router.post('/', async (req, res) => {
  const { name, methodology, indicatorPercentage, frequency, measurementDate, achievedPercentage } = req.body;

  try {
    const status = achievedPercentage >= indicatorPercentage ? 'Cumplido' : 'No Cumplido';

    const kpi = await KPI.create({
      name,
      methodology,
      indicatorPercentage,
      frequency,
      measurementDate,
      achievedPercentage,
      status,
    });

    res.status(201).json(kpi);
  } catch (err) {
    console.error('Error al crear KPI:', err);
    res.status(500).json({ error: 'Error al crear KPI' });
  }
});

/**
 * @swagger
 * /api/kpis:
 *   get:
 *     summary: Listar todos los KPIs
 *     tags: [KPIs]
 *     responses:
 *       200:
 *         description: Lista de KPIs
 */
router.get('/', async (req, res) => {
  try {
    const kpis = await KPI.findAll();
    res.json(kpis);
  } catch (err) {
    console.error('Error al listar KPIs:', err);
    res.status(500).json({ error: 'Error al listar KPIs' });
  }
});

/**
 * @swagger
 * /api/kpis/{id}:
 *   get:
 *     summary: Obtener un KPI por ID
 *     tags: [KPIs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del KPI
 *     responses:
 *       200:
 *         description: KPI encontrado
 *       404:
 *         description: KPI no encontrado
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const kpi = await KPI.findByPk(id);

    if (!kpi) {
      return res.status(404).json({ error: 'KPI no encontrado' });
    }

    res.json(kpi);
  } catch (err) {
    console.error('Error al obtener KPI:', err);
    res.status(500).json({ error: 'Error al obtener KPI' });
  }
});

/**
 * @swagger
 * /api/kpis/{id}:
 *   delete:
 *     summary: Eliminar un KPI por ID
 *     tags: [KPIs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del KPI
 *     responses:
 *       200:
 *         description: KPI eliminado correctamente
 *       404:
 *         description: KPI no encontrado
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const kpi = await KPI.findByPk(id);

    if (!kpi) {
      return res.status(404).json({ error: 'KPI no encontrado' });
    }

    await kpi.destroy();
    res.json({ message: 'KPI eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar KPI:', err);
    res.status(500).json({ error: 'Error al eliminar KPI' });
  }
});

module.exports = router;
