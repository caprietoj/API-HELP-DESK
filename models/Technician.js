const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Technician = sequelize.define('Technician', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  userId: { type: DataTypes.INTEGER, allowNull: false }, // Clave foránea
});

// Relación con User
Technician.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Technician, { foreignKey: 'userId' });

module.exports = Technician;
