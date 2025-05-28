const handlerSvc = require('../services/dataHandlerService');

exports.receive = async (req, res) => {
  try {
    const token = req.header('CL-X-TOKEN');
    if (!token) return res.status(401).json({ message: 'unauthenticated' });

    if (!req.is('application/json') || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'invalid data' });
    }

    const result = await handlerSvc.handle(token, req.body);

    if (result.error) return res.status(401).json({ message: result.error });
    if (result.message) return res.status(200).json({ message: result.message });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' });
  }
};