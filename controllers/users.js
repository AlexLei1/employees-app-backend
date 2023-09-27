const login = (req, res) => {
	res.send('login');
}

const register = (req, res) => {
	res.send('register');
}

const current = (req, res) => {
	res.send('current');
}

module.exports = {
	login, register, current
}