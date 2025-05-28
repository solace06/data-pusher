const Destination = require('../models/destinationModel');

class DestinationRepository {
  create(data) {
    return Destination.create(data);
  }

  getById(id) {
    return Destination.findByPk(id);
  }

  getByAccount(accountId) {
    return Destination.findAll({ where: { accountId } });
  }

  update(id, data) {
    return Destination.update(data, { where: { id } });
  }

  delete(id) {
    return Destination.destroy({ where: { id } });
  }
}

module.exports = new DestinationRepository();
