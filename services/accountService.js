const repo = require('../repositories/accountRepository');

module.exports = {
  create: async (body) => {
    return await repo.create(body);
  },

  getAll: async () => {
    return await repo.getAll();
  },

  get: async (id) => {
    return await repo.getById(id);
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
    if (deletedCount === 0) {
      throw new Error('account not found');
    }
    return { message: 'Account deleted successfully' };
  }
};