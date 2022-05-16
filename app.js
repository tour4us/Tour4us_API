var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const products = require('./routes/produts');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
const products_root = require('../tour4us/routes/produtos_root')
const utilizador = require('../tour4us/routes/utilizador')

app.get('/produto',products_root.getproduto)
app.get('/produto/:id(\\d+)',products_root.getprodutoById)
app.get('/listaprodutos/:id(\\d+)',products_root.getlistaprodutos)
app.get('/utilizador',utilizador.getutilizador)
//app.get('/a',products.getproducts)

module.exports = app;

