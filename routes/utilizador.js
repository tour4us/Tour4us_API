const express = require('express')
const app = express()
const client = require('../models/connection')

const getutilizador = (req,res)=>{
    client.query('select id_utilizador,nome_utilizador,email_utilizador,localizacao_fotos,tipo_utilizador from utilizador\n' +
        '    inner join tipo_utilizador on utilizador.tipo_utilizador = tipo_utilizador.id_tipo_utilizador\n' ,(error,results)=>{
        if(error)
        {
            throw error
        }
        console.log(results)
        console.log(results.rows)
        res.status(200).json(results)
    })
}

module.exports = {
    getutilizador
}