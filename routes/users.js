const express = require('express');
const router = express.Router();
const { login, register, current } = require('../controllers/users');
const { auth } = require('../middleware/auth')

/* /api/user/login */
router.post('/login', login);

/* /api/user/register */
router.post('/register', register);

/* /api/user/current */
router.get('/current', auth, current);

module.exports = router;

// npx prisma init --datasource-provider sqlite - (добавление prisma с базой даднных sqlite в проект)
// npx prisma migrate dev --name init - (создание базы данных)
// npx prisma studio - (студия для просмотра базы данных)