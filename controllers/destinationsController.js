const s = require('../services/destinationService');

exports.create = async (req, res) => {
  try {
    const data = await s.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'validation error',
        details: err.errors.map(e => e.message),
      });
    }
    console.error('Create destination error:', err);
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await s.get(req.params.id);
    if (!data) return res.status(404).json({ message: 'destination not found' });
    res.json(data);
  } catch (err) {
    console.error('Get destination error:', err);
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.byAcc = async (req, res) => {
  try {
    const data = await s.byAccount(req.params.accountId);
    if (!data || data.length === 0) return res.status(200).json({ message: 'no data found' });
    res.json(data);
  } catch (err) {
    console.error('Get destinations by account error:', err);
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await s.update(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    if (err.message === 'destination not found') {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === 'destination is already updated') {
      return res.status(400).json({ message: err.message });
    }
    console.error('Update destination error:', err);
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await s.remove(req.params.id);
    res.json(result);
  } catch (err) {
    if (err.message === 'destination not found') {
      return res.status(404).json({ message: err.message });
    }
    console.error('Delete destination error:', err);
    res.status(500).json({ message: 'internal server error' });
  }
};