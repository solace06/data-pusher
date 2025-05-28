const repo = require('../repositories/accountRepository');

module.exports = {
  create:     body => repo.create(body),
  getAll:     ()   => repo.getAll(),
  get:        id   => repo.getById(id),
  update:     (id,b)=> repo.update(id,b),
  remove:     id   => repo.delete(id),
};