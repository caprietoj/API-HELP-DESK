const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const IncidentType = sequelize.define('IncidentType', {
  type: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = IncidentType;
