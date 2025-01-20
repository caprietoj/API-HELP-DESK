const express = require('express');
const authenticateToken = require('../middleware/authenticate');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { sendEmail } = require('../services/emailService');
const crypto = require('crypto');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Gestión de tickets
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Crea un nuevo ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               incidentType:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ticket creado correctamente
 *       400:
 *         description: Error al crear el ticket
 */
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, incidentType } = req.body;
  const userId = req.user.id;
  const ticketIdentifier = crypto.randomBytes(6).toString('hex'); // Generar identificador único

  try {
    const ticket = await Ticket.create({
      title,
      description,
      IncidentTypeId: incidentType,
      UserId: userId,
      identifier: ticketIdentifier,
    });

    const user = await User.findByPk(userId);

    // Enviar correo al usuario
    const subject = `Nuevo Ticket Creado: ${ticket.title}`;
    const text = `Hola ${user.firstName},\n\nHemos recibido tu ticket con los siguientes detalles:\n\nTítulo: ${ticket.title}\nDescripción: ${ticket.description}\nNúmero del Ticket: ${ticketIdentifier}\n\nGracias por contactarnos.`;
    await sendEmail(user.email, subject, text);

    res.status(201).json(ticket);
  } catch (err) {
    console.error('Error al crear el ticket:', err); // Imprime el error completo en la consola
    res.status(400).json({ error: 'Error al crear el ticket' });
  }
});

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Obtiene todos los tickets del usuario autenticado
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/', authenticateToken, async (req, res) => {
  const tickets = await Ticket.findAll({ where: { UserId: req.user.id } });
  res.json(tickets);
});

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Edita un ticket existente
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket actualizado correctamente
 *       404:
 *         description: Ticket no encontrado
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket || ticket.UserId !== req.user.id) {
      return res.status(404).json({ error: 'Ticket no encontrado o no autorizado' });
    }

    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ticket' });
  }
});

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Elimina un ticket existente
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del ticket
 *     responses:
 *       200:
 *         description: Ticket eliminado correctamente
 *       404:
 *         description: Ticket no encontrado
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket || ticket.UserId !== req.user.id) {
      return res.status(404).json({ error: 'Ticket no encontrado o no autorizado' });
    }

    await ticket.destroy();
    res.json({ message: 'Ticket eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ticket' });
  }
});

module.exports = router;