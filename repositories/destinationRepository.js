const { DataTypes } = require('sequelize');
const db  = require('../db');
const Account    = require('./accountModel');

const Destination = db.define('Destination',{
  id:     { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey:true },
  url:    { type: DataTypes.STRING, allowNull:false, validate:{ isUrl:true } },
  method: { type: DataTypes.ENUM('GET','POST','PUT'), allowNull:false },
  headers:{ type: DataTypes.JSON, allowNull:false }
},{
  tableName:'destinations'
});

Account.hasMany(Destination, { as:'destinations', foreignKey:'accountId', onDelete:'CASCADE' });
Destination.belongsTo(Account, { foreignKey:'accountId' });

module.exports = Destination;