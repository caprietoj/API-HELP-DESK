const express = require('express');
const Technician = require('../models/Technician');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authenticate');

const router = express.Router();

/**
 * @swagger
 * /api/technicians:
 *   post:
 *     summary: Registra un técnico y, si es necesario, crea el usuario asociado
 *     tags: [Technicians]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               cedula:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Técnico creado correctamente
 *       400:
 *         description: Error al crear el técnico o usuario asociado
 */
router.post('/', authenticateToken, async (req, res) => {
  const { name, lastName, email, cedula, password } = req.body;

  if (!name || !lastName || !email || !cedula) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    // Buscar o crear usuario
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        cedula,
        password: await bcrypt.hash(password || 'defaultpassword', 10), // Hashear contraseña
        firstName: name, // Nombre
        lastName: lastName, // Apellido
      },
    });

    if (created) {
      console.log('Usuario creado:', user);
    } else {
      console.log('Usuario ya existente:', user);
    }

    // Crear técnico asociado
    const technician = await Technician.create({
      name: `${name} ${lastName}`, // Nombre completo del técnico
      email,
      userId: user.id,
    });

    res.status(201).json({
      message: 'Técnico creado correctamente',
      technician,
      user,
    });
  } catch (err) {
    console.error('Error al crear técnico:', err);
    res.status(400).json({ error: 'Error al crear el técnico o usuario asociado', details: err });
  }
});

/**
 * @swagger
 * /api/technicians:
 *   get:
 *     summary: Obtiene todos los técnicos
 *     tags: [Technicians]
 *     responses:
 *       200:
 *         description: Lista de técnicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   userId:
 *                     type: integer
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const technicians = await Technician.findAll();
    res.status(200).json(technicians);
  } catch (err) {
    console.error('Error al obtener técnicos:', err);
    res.status(500).json({ error: 'Error al obtener técnicos' });
  }
});

/**
 * @swagger
 * /api/technicians/{id}:
 *   get:
 *     summary: Obtiene un técnico por ID
 *     tags: [Technicians]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del técnico
 *     responses:
 *       200:
 *         description: Técnico encontrado
 *       404:
 *         description: Técnico no encontrado
 */
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const technician = await Technician.findByPk(id);
    if (!technician) {
      return res.status(404).json({ error: 'Técnico no encontrado' });
    }
    res.status(200).json(technician);
  } catch (err) {
    console.error('Error al obtener técnico:', err);
    res.status(500).json({ error: 'Error al obtener técnico' });
  }
});

/**
 * @swagger
 * /api/technicians/{id}:
 *   put:
 *     summary: Actualiza un técnico existente
 *     tags: [Technicians]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del técnico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Técnico actualizado correctamente
 *       404:
 *         description: Técnico no encontrado
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const technician = await Technician.findByPk(id);
    if (!technician) {
      return res.status(404).json({ error: 'Técnico no encontrado' });
    }

    technician.name = name || technician.name;
    technician.email = email || technician.email;
    await technician.save();

    res.status(200).json(technician);
  } catch (err) {
    console.error('Error al actualizar técnico:', err);
    res.status(500).json({ error: 'Error al actualizar técnico' });
  }
});

/**
 * @swagger
 * /api/technicians/{id}:
 *   delete:
 *     summary: Elimina un técnico existente
 *     tags: [Technicians]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del técnico
 *     responses:
 *       200:
 *         description: Técnico eliminado correctamente
 *       404:
 *         description: Técnico no encontrado
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const technician = await Technician.findByPk(id);
    if (!technician) {
      return res.status(404).json({ error: 'Técnico no encontrado' });
    }

    await technician.destroy();
    res.status(200).json({ message: 'Técnico eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar técnico:', err);
    res.status(500).json({ error: 'Error al eliminar técnico' });
  }
});

module.exports = router;
