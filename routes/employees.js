const express = require('express');
const router = express.Router();
const { all, add, remove, edit, employee, } = require('../controllers/employees');
const { auth } = require('../middleware/auth')


/* /api/employees */
router.get('/', auth, all);

/* /api/employees/:id */
router.get('/:id', auth, employee);

/* /api/employees/add */
router.post('/add', auth, add);

/* /api/remove/:id */
router.post('/remove/:id', auth, remove);

/* /api/remove/edit/:id */
router.put('/edit/:id', auth, edit);

module.exports = router;
