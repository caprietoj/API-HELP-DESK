const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RequestType = require('./RequestType');

const Request = sequelize.define('Request', {
  name: { type: DataTypes.STRING, allowNull: false },
  cedula: { type: DataTypes.STRING, allowNull: false },
  position: { type: DataTypes.STRING, allowNull: false },
});

Request.belongsTo(RequestType, { foreignKey: 'requestTypeId' });
RequestType.hasMany(Request, { foreignKey: 'requestTypeId' });

module.exports = Request;
