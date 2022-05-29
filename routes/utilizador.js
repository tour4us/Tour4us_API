const express = require('express')
const app = express()
const client = require('../models/connection')

const getutilizador = (req,res)=>{
    client.query('select id_utilizador,nome_utilizador,email_utilizador,localizacao_fotos,tipo_utilizador.tipo_utililizador from utilizador ' +
        'inner join tipo_utilizador on utilizador.tipo_utilizador = tipo_utilizador.id_tipo_utilizador' ,(error,results)=>{
        if(error)
        {
            throw error
        }
        res.status(200).json(results)
    })
}

const getutilizadorbyid= (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id)
    client.query('select id_utilizador,nome_utilizador,email_utilizador,localizacao_fotos,tipo_utilizador.tipo_utililizador from utilizador ' +
        'inner join tipo_utilizador on utilizador.tipo_utilizador = tipo_utilizador.id_tipo_utilizador where id_utilizador =' +id , [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        response.status(200).json(results)
    })
}


const getutilizadorbylog= (request, response) => {
    const users = request.body
    console.log("user:  "+JSON.stringify(users))
    client.query('select nome_utilizador,email_utilizador,localizacao_fotos,tipo_utilizador from utilizador ' +
        'where email_utilizador = \'' + users.email.toString() + '\' and pass_utilizador = \''+users.pass.toString()+'\'' , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}










const getlogin= (request, response) => {
    const users = request.body
    client.query('select * from utilizador where email_utilizador = \'' + users.us_name.toString() + '\' and pass_utilizador = \''+users.us_email.toString()+'\'' , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.toJSON())
        //response.status(200).json(results)
    })
}

module.exports = {
    getutilizador,
    getutilizadorbyid,
    getutilizadorbylog,
    getlogin,

}