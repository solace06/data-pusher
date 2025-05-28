const s = require('../services/accountService');

exports.create  = async (req,res)=>res.status(201).json(await s.create(req.body));
exports.list    = async (req,res)=>res.json(await s.getAll());
exports.get     = async (req,res)=>res.json(await s.get(req.params.id));
exports.update  = async (req,res)=>res.json(await s.update(req.params.id,req.body));
exports.remove  = async (req,res)=>{
  await s.remove(req.params.id);
  res.status(204).end();
};