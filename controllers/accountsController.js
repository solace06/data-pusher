const s = require('../services/accountService');

exports.create = async (req, res) => {
  try {
    const account = await s.create(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const accounts = await s.getAll();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const account = await s.get(req.params.id);
    if (!account) {
      return res.status(404).json({ error: 'account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedAccount = await s.update(req.params.id, req.body);
    res.status(200).json(updatedAccount);
  } catch (error) {
    if (error.message === 'account not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const result = await s.remove(req.params.id);
    res.status(200).json(result); 
  } catch (error) {
    if (error.message === 'account not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};