const repo = require('../repositories/destinationRepository');

module.exports = {
  create: async (body) => {
    return await repo.create(body);
  },

  get: async (id) => {
    return await repo.getById(id);
  },

  byAccount: async (accountId) => {
    return await repo.getByAccount(accountId);
  },

  update: async (id, body) => {
    const existing = await repo.getById(id);
    if (!existing) throw new Error('destination not found');

    await repo.update(id, body);

    const updated = await repo.getById(id);
    if (!updated) throw new Error('destination not found after update');

    const isSame = Object.keys(body).every(key => existing[key] == updated[key]);
    if (isSame) throw new Error('destination is already updated');

    return updated;
  },

  remove: async (id) => {
    const deletedCount = await repo.delete(id);
    if (deletedCount === 0) throw new Error('destination not found');
    return { message: 'destination deleted successfully' };
  }
};