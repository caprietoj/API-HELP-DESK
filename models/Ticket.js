const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Technician = require('./Technician');
const IncidentType = require('./IncidentType');

const Ticket = sequelize.define('Ticket', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'open' },
});

User.hasMany(Ticket);
Ticket.belongsTo(User);
Technician.hasMany(Ticket);
Ticket.belongsTo(Technician);
IncidentType.hasMany(Ticket);
Ticket.belongsTo(IncidentType);

module.exports = Ticket;
