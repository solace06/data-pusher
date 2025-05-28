const router = require('express').Router();
const c = require('../controllers/destinationController');

router.route('/')
  .post(c.create);

router.route('/:id')
  .get(c.get)
  .put(c.update)
  .delete(c.remove);

router.get('/account/:accountId', c.byAcc);

module.exports = router;
