const router = require('express').Router();
const c = require('../controllers/accountController');

router.route('/')
  .post(c.create)
  .get(c.list);

router.route('/:id')
  .get(c.get)
  .put(c.update)
  .delete(c.remove);

module.exports = router;