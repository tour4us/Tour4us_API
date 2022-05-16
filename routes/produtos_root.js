const express = require('express')
const app = express()
const client = require('../models/connection')
const {array} = require("i/lib/util");

const getproduto = (req,res)=>{
    client.query('select nome_produto,tipo_produto,descricao,email,site,telemovel,morada,codpost,local_produto,coords from produto ',(error,results)=>{
        if(error)
        {
            throw error
        }
        console.log(results)
        console.log(results.rows)
        res.status(200).json(results)
    })
}


const getlistaprodutos= (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id)
    client.query('select id_produto,(select DISTINCT localizacao_fotos from localizacao_fotos_rel inner join localizacao_fotos on id_localizacao_fotos = id_fotos where id_produto = id_produto) as foto,' +
        'nome_produto,local_produto from produto where tipo_produto = ' +id , [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        response.status(200).json(results)
    })
}


const getprodutoById = (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id)
    client.query('select nome_produto,tipo_produto.nome_tipo_produto,descricao,email,site,telemovel,morada,codpost,local_produto,coords from produto ' +
        'inner join tipo_produto on produto.tipo_produto = tipo_produto.tipo_produto ' +
        'where id_produto = ' +id , [id], (error, results) => {
        if (error) {
            throw error
        }

        client.query('select localizacao_fotos from localizacao_fotos_rel inner join localizacao_fotos on id_localizacao_fotos = id_fotos where id_produtot = ' +id , [id], (error, results2) => {
            if (error) {
                throw error
            }
            console.log(results2)
            var results3 = [results,results2]
            response.status(200).json(results3)
        })

        //console.log(results)
        //response.status(200).json(results)
    })
}

module.exports = {
    getproduto,
    getprodutoById,
    getlistaprodutos,
}