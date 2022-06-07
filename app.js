var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const utilizador = require('../tour4us/routes/utilizador')
app.get('/utilizador',utilizador.getutilizador)
app.post('/utilizadorpost',utilizador.getutilizadorbylog)
app.get('/utilizador/:id(\\d+)',utilizador.getutilizadorbyid)
app.get('/login',utilizador.getlogin)
app.post('/registar',utilizador.createutilizador)
app.post('/delete',utilizador.userdelete)
app.post('/updateuser',utilizador.updateuser)



const products_root = require('../tour4us/routes/produtos_root')
app.get('/produto',products_root.getproduto)
app.get('/produto/:id(\\d+)',products_root.getprodutoById)
app.get('/listaprodutos/:id(\\d+)',products_root.getlistaprodutos)
app.get('/tipoprod',products_root.getprodutoBytipoprod)
app.get('/recomendados',products_root.getrecomendados)
app.post('/updateprod',products_root.updateprod)
app.post('/createprod',products_root.createprod)
app.post('/proddelete',products_root.proddelete)
app.post('/filtro',products_root.getfiltro)




const distrito = require('./routes/distritos');
app.get('/distrito/:id(\\d+)',distrito.getdistritos)
app.get('/distrito',distrito.getlistadistritos)

/*
const login = require('./routes/login');
app.get('/login',login.getlogin)
 */

const pagina_principal = require('./routes/pagina_principal');
app.get('/pagina',pagina_principal.getpaginaprincipal)

module.exports = app;

