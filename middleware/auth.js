// middleware - функции выполняющиеся перед основными запросами 
const jwt = require("jsonwebtoken");
const { prisma } = require("../prisma/prisma-client");

// функция проверяет авторизирован ли пользователь на сайте
const auth = async (req, res, next) => {
  	try {
		// получаем токен
		let token = req.headers.authorization?.split(" ")[1];
		// декодируем токен
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// ищем пользователя в базе данных по id
		const user = await prisma.user.findUnique({
			where: {
				id: decoded.id,
			},
		});
		
		// мутируем ответ от пользователя, добавляем пользователя из базы данных
		req.user = user;

		next();
  	} catch (error) {
    	res.status(401).json({ message: 'Не авторизован' });
  	}
};

module.exports = {
  	auth,
};