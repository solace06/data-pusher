const handlerSvc = require('../services/dataHandlerService');

exports.receive = async (req, res) => {
  try {
    const token = req.header('CL-X-TOKEN');
    if (!token) return res.status(401).json({ message: 'unauthenticated' });

    if (!req.is('application/json') || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'invalid data' });
    }

    const result = await handlerSvc.handle(token, req.body);

    if (result.error) {
      const msg = result.detail ? `${result.error} - ${result.detail}` : result.error;
      return res.status(500).json({ message: msg });
    }
    if (result.message) return res.status(200).json({ message: result.message });

    return res.status(200).json(result);
  } catch (err) {
    console.error('controller error:', err);
    return res.status(500).json({ message: 'something went wrong' });
  }
};