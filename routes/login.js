const express = require('express')
const app = express()
const client = require('../models/connection')
const {array} = require("i/lib/util");



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
    getlogin,
}




