// utils/generateToken.js
//exporting function to create token
const { randomBytes } = require('crypto');

module.exports = () => randomBytes(32).toString('hex');
