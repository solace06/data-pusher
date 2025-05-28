const repo = require('../repositories/accountRepository');

module.exports = {
  create: async (body) => {
    try {
      return await repo.create(body);
    } catch (err) {
      throw err; // Let controller handle SequelizeValidationError or other errors
    }
  },

  getAll: async () => {
    return await repo.getAll();
  },

  get: async (id) => {
    const account = await repo.getById(id);
    if (!account) throw new Error('account not found');
    return account;
  },

  update: async (id, body) => {
    const existing = await repo.getById(id);
    if (!existing) throw new Error('account not found');

    await repo.update(id, body);

    const updated = await repo.getById(id);
    if (!updated) throw new Error('account not found after update');

    const isSame = Object.keys(body).every(key => existing[key] == updated[key]);
    if (isSame) throw new Error('account is already updated');

    return updated;
  },

  remove: async (id) => {
    const deletedCount = await repo.delete(id);
    if (deletedCount === 0) throw new Error('account not found');
    return { message: 'account deleted successfully' };
  },
};