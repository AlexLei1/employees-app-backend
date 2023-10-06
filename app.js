const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const cors = require('cors');
const usersRouter = require('./routes/users');
const employeesRouter = require('./routes/employees');
// const PORT = process.env.PORT
const app = express();

require('dotenv').config();

// app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', usersRouter);
app.use('/api/employees', employeesRouter);

module.exports = app;
