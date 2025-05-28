//account model
const { DataTypes } = require('sequelize');
const db = require('../db');
const generateToken = require('../utils/generateToken');

const Account = db.define('Account', {
  id:   { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email:{ type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail:true }},
  name: { type: DataTypes.STRING, allowNull: false },
  website:    { type: DataTypes.STRING, validate:{ isUrl:true }, allowNull:true },
  secretToken:{ type: DataTypes.STRING, allowNull:false, unique:true }
},{
  tableName: 'accounts',
  hooks:{
    beforeValidate: (acc) => {
      if (!acc.secretToken) {
        acc.secretToken = generateToken();
      }
    }
  }
});

module.exports = Account;