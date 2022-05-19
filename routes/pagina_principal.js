const express = require('express')
const app = express()
const client = require('../models/connection')
const {array} = require("i/lib/util");

const getpaginaprincipal = (req,res)=>{
    client.query('select slogan,localizacao_foto_princi,link_saber_mais,segundo_layout_titolo,facil_acesso,facil_acesso_foto,informacao,informacao_foto,experiencia,experiencia_foto from pagina_principal',(error,results)=>{
        if(error)
        {
            throw error
        }
        res.status(200).json(results)
    })
}


module.exports = {
    getpaginaprincipal,

}