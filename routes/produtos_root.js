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
    client.query('select id_produto,(select DISTINCT localizacao_fotos from localizacao_fotos_rel inner join localizacao_fotos on id_localizacao_fotos = id_fotos where id_produtot = id_produto) as foto,' +
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

const getprodutoBytipoprod = (request, response) => {
    client.query('select id_produto,nome_produto,descricao,morada,tipo_produto.nome_tipo_produto from produto' +
        ' inner join tipo_produto on produto.tipo_produto = tipo_produto.tipo_produto' +
        ' where tipo_produto.tipo_produto = 1', (error, results) => {
        if (error) {
            throw error
        }
        client.query('select id_produto,nome_produto,descricao,morada,tipo_produto.nome_tipo_produto from produto' +
            ' inner join tipo_produto on produto.tipo_produto = tipo_produto.tipo_produto' +
            ' where tipo_produto.tipo_produto = 2', (error, results2) => {
            if (error) {
                throw error
            }
            client.query('select id_produto,nome_produto,descricao,morada,tipo_produto.nome_tipo_produto from produto' +
                ' inner join tipo_produto on produto.tipo_produto = tipo_produto.tipo_produto' +
                ' where tipo_produto.tipo_produto = 3', (error, results3) => {
                if (error) {
                    throw error
                }
                client.query('select id_produto,nome_produto,descricao,morada,tipo_produto.nome_tipo_produto from produto' +
                    ' inner join tipo_produto on produto.tipo_produto = tipo_produto.tipo_produto' +
                    ' where tipo_produto.tipo_produto = 4', (error, results4) => {
                    if (error) {
                        throw error
                    }
                    //console.log(results4)
                    var results4 = [results,results2,results3,results4]
                    response.status(200).json(results4)
                })
            })
        })
        //console.log(results)
        //response.status(200).json(results)
    })
}

const getrecomendados = (request, response) => {
    client.query('select id_produto,nome_produto,descricao,(select DISTINCT localizacao_fotos from localizacao_fotos_rel inner join ' +
        'localizacao_fotos on id_localizacao_fotos = id_fotos where id_produtot = id_produto) as foto from rel_rating' +
        ' inner join produto on id_produt = id_produto inner join tipo_produto on produto.tipo_produto = tipo_produto.tipo_produto' +
        ' where tipo_produto.tipo_produto = 1 group by id_produt order by avg(rating) desc LIMIT 4;', (error, results) => {
        if (error) {
            throw error
        }
        client.query('select id_produto,nome_produto,descricao,(select DISTINCT localizacao_fotos from localizacao_fotos_rel inner join ' +
            'localizacao_fotos on id_localizacao_fotos = id_fotos where id_produtot = id_produto) as foto from rel_rating' +
            ' inner join produto on id_produt = id_produto inner join tipo_produto on produto.tipo_produto = tipo_produto.tipo_produto' +
            ' where tipo_produto.tipo_produto = 2 group by id_produt order by avg(rating) desc LIMIT 4;', (error, results2) => {
            if (error) {
                throw error
            }
            client.query('select id_produto,nome_produto,descricao,(select DISTINCT localizacao_fotos from localizacao_fotos_rel inner join ' +
                'localizacao_fotos on id_localizacao_fotos = id_fotos where id_produtot = id_produto) as foto from rel_rating' +
                ' inner join produto on id_produt = id_produto inner join tipo_produto on produto.tipo_produto = tipo_produto.tipo_produto' +
                ' where tipo_produto.tipo_produto = 3 group by id_produt order by avg(rating) desc LIMIT 4;', (error, results3) => {
                if (error) {
                    throw error
                }
                var results3 = [results,results2,results3]
                response.status(200).json(results3)
            })
        })
    })
}


const updateprod = (request, response) => {
    try {
        const users = request.body

        console.log(users)

        var querry1 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.produto inner join utilizador on id_propietario = id_utilizador where email_utilizador='" + users.email.toString() + "' and pass_utilizador='" + users.pass.toString() + "' and nome_produto='" + users.nome.toString() + "'))as existe";
        var querry2 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.utilizador where tipo_utilizador = 3 and email_utilizador='" + users.email.toString() + "' and pass_utilizador='" + users.pass.toString() + "'))as existe";
        var up ="UPDATE  tour4us.produto SET nome_produto='" + users.nome_produto.toString() + "',local_produto='" + users.local_produto.toString() + "',descricao='" + users.descricao.toString() + "',email='" + users.emailprod.toString() + "',telemovel='" + users.telemovel.toString() + "',morada='" + users.morada.toString() + "',site='" + users.site.toString() + "' where nome_produto='" + users.nome.toString() + "'";


        console.log(up)
        client.query(querry1, (error, results) => {
            if (error) {throw error}
            console.log(querry1)
            if(!(results[0].existe==1))
            {

                client.query(querry2, (error, results2) => {
                    if (error) {
                        throw error
                    }
                    console.log(querry2)
                    if (results2[0].existe == 1)
                    {
                        console.log(up)
                        client.query(up, (error, results3) => {
                            if (error) {throw error}
                            response.status(200).json(results3)
                        })
                    }
                })
            }
            else
            {
                client.query(up, (error, results3) => {
                    if (error) {throw error
                        throw new Error(error);}
                    response.status(200).json(results3)
                })

            }
        })
    }
    catch (e) {
        console.log(e);
        response.status(200).json("erro")
    }
    finally {
        console.log("sucess");
    }
}

const createprod = (request, response) => {
    const users = request.body
    console.log(users)
    var querry = "INSERT INTO produto (nome_produto,tipo_produto,local_produto,id_propietario,descricao,email,telemovel,morada,codpost,site,coords) VALUES ('" + users.nome_produto.toString() + "',(SELECT tipo_produto FROM tour4us.tipo_produto where nome_tipo_produto = '"+users.tipo.toString()+"'),'" + users.local_produto.toString() + "',(SELECT id_utilizador FROM utilizador where email_utilizador='"+users.email.toString()+"' and pass_utilizador='"+users.pass.toString()+"'),'" + users.descricao.toString() + "','" + users.emailprod.toString() + "','" + users.telemovel.toString() + "','" + users.morada.toString() + "','" + users.codpost.toString() + "','" + users.site.toString() + "',Point(" + users.x.toString() + ", " + users.y.toString() + "))";
    console.log(querry)
    client.query(querry, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send("User added with ID: ")
    })
}

const proddelete = (request, response) => {
    try {
        const users = request.body

        var querry1 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.produto inner join utilizador on id_propietario = id_utilizador where email_utilizador='" + users.email.toString() + "' and pass_utilizador='" + users.pass.toString() + "' and nome_produto='" + users.nome.toString() + "'))as existe";
        var querry2 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.utilizador where tipo_utilizador = 3 and email_utilizador='" + users.email.toString() + "' and pass_utilizador='" + users.pass.toString() + "'))as existe";
        var del ="DELETE FROM tour4us.produto where nome_produto='" + users.nome.toString() + "'";

        client.query(querry1, (error, results) => {
            if (error) {throw error}
            console.log(querry1)
            if(!(results[0].existe==1))
            {

                client.query(querry2, (error, results2) => {
                    if (error) {throw error}
                    console.log(querry2)
                    if (results2[0].existe == 1)
                    {
                        client.query(del, (error, results3) => {
                            if (error) {throw error}
                            response.status(200).json(results3)
                        })
                    }
                })
            }
            else
            {
                client.query(del, (error, results3) => {
                    if (error) {throw error}
                    response.status(200).json(results3)
                })

            }
        })
    }
    catch (e) {
        console.log(e);
        response.status(200).json("erro")
    }
    finally {
        console.log("sucess");
    }
}

const getfiltro= (request, response) => {
    const users = request.body
    var filtro ="select id_produto,(select DISTINCT localizacao_fotos from localizacao_fotos_rel inner join localizacao_fotos on id_localizacao_fotos = id_fotos " +
    "where id_produtot = id_produto) as foto,nome_produto,local_produto from rel_rating inner join produto on id_produt = id_produto inner join tipo_produto on " +
    "produto.tipo_produto = tipo_produto.tipo_produto ";
    filtro +="where tipo_produto.tipo_produto = "+users.tipo.toString()+" and nome_produto LIKE '%"+users.pesq.toString()+"%' and rating >="+users.rate.toString()+" ";
    filtro +="group by id_produt order by avg(rating) desc"
    client.query(filtro, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}




module.exports = {
    getproduto,
    getprodutoById,
    getlistaprodutos,
    getprodutoBytipoprod,
    getrecomendados,
    updateprod,
    createprod,
    proddelete,
    getfiltro,
}