const router = require('express').Router();
const c = require('../controllers/dataHandlerController');

router.post('/incoming_data', c.receive);

module.exports = router;