const Account = require('../models/accountModel');

class AccountRepository {
  create(data){           return Account.create(data); }
  getAll(){               return Account.findAll(); }
  getById(id){            return Account.findByPk(id); }
  getByToken(token){      return Account.findOne({ where:{ secretToken:token }, include:'destinations' }); }
  update(id,data){        return Account.update(data,{ where:{ id }, returning:true }); }
  delete(id){             return Account.destroy({ where:{ id }}); }
}

module.exports = new AccountRepository();