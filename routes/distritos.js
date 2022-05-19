const express = require('express')
const app = express()
const client = require('../models/connection')
const {array} = require("i/lib/util");

const getlistadistritos = (req,res)=>{
    client.query('select * from distritos ',(error,results)=>{
        if(error)
        {
            throw error
        }
        res.status(200).json(results)
    })
}


const getdistritos= (request, response) => {
    const id = parseInt(request.params.id)
    client.query('select * from distritos where id_Distritos = ' +id , [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}

module.exports = {
    getlistadistritos,
    getdistritos,
}