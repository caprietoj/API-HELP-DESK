const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KPI = sequelize.define('KPI', {
  name: { type: DataTypes.STRING, allowNull: false },
  methodology: { type: DataTypes.TEXT, allowNull: false },
  indicatorPercentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  frequency: { type: DataTypes.STRING, allowNull: false },
  measurementDate: { type: DataTypes.DATE, allowNull: false },
  achievedPercentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
  status: { type: DataTypes.STRING, allowNull: true },
});

module.exports = KPI;
