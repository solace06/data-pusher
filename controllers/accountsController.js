const s = require('../services/accountService');

exports.create = async (req, res) => {
  try {
    const data = await s.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'validation error',
        details: err.errors.map(e => e.message)
      });
    }
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await s.getAll();
    if (data.length === 0) return res.status(200).json({ message: 'no data found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await s.get(req.params.id);
    if (!data) return res.status(200).json({ message: 'no data found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await s.update(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await s.remove(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};