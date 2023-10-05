const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/user/login
 * @desс Логин
 * @access Public
*/

const login = async (req, res) => {

	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Пожалуйста, заполните обязятельные поля' })
	}

	const user = await prisma.user.findFirst({
		where: {
			email,
		}
	});

	const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));
	const secret = process.env.JWT_SECRET;

	if (user && isPasswordCorrect && secret) {
		res.status(200).json({
			id: user.id,
			email: user.email,
			name: user.name,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
		})
	} else {
		return res.status(400).json({ message: 'Неверно введен логин или пароль' })
	}

}

/**
 * 
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req, res) => {
	
	const { email, password, name } = req.body;

	if(!email || !password || !name) {
		return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля' })
	}

	const registeredUser = await prisma.user.findFirst({
		where: {
			email
		}
	});

	if (registeredUser) {
		return res.status(400).json({ message: 'Пользователь, с таким email уже существует' })
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassord = await bcrypt.hash(password, salt);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			password: hashedPassord
		}
	});

	const secret = process.env.JWT_SECRET;

	if (user && secret) {
		res.status(201).json({
			id: user.id,
			email: user.email,
			name,
			token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
		})
	} else {
		return res.status(400).json({ message: 'Не удалось создать пользователя' })
	}
	
}

/**
 * 
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */

const current = (req, res) => {
	res.send('login')
}


module.exports = {
  login,
  register,
  current
}