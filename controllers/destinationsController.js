const s = require('../services/destinationService');

exports.create = async (req, res) => {
  const data = await s.create(req.body);
  res.status(201).json(data);
};

exports.get = async (req, res) => {
  const data = await s.get(req.params.id);
  if (!data) return res.status(200).json({ message: 'no data found' });
  res.json(data);
};

exports.byAcc = async (req, res) => {
  const data = await s.byAccount(req.params.accountId);
  if (!data || data.length === 0) return res.status(200).json({ message: 'no data found' });
  res.json(data);
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