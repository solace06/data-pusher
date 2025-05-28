const Account = require('../models/accountModel');

class AccountRepository {
  create(data) {
    return Account.create(data);
  }

  getAll() {
    return Account.findAll();
  }

  getById(id) {
    return Account.findByPk(id);
  }

  getByToken(token) {
    return Account.findOne({ where: { secretToken: token }, include: 'destinations' });
  }

  async update(id, data) {
    return Account.update(data, { where: { id } });
  }

  async delete(id) {
    const deletedRows = await Account.destroy({ where: { id } });
    if (deletedRows === 0) {
      throw new Error(`account with id ${id} not found for deletion`);
    }
    return deletedRows;
  }
}

module.exports = new AccountRepository();