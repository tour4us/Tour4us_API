const express = require('express')
const app = express()
const client = require('../models/connection')
const {compileTrust} = require("express/lib/utils");

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
    client.query('select id_utilizador,nome_utilizador,email_utilizador,localizacao_fotos,tipo_utilizador.tipo_utililizador from utilizador ' +
        'inner join tipo_utilizador on utilizador.tipo_utilizador = tipo_utilizador.id_tipo_utilizador ' +
        'where email_utilizador = \'' + users.email.toString() + '\' and pass_utilizador = \''+users.pass.toString()+'\'' , (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results)
    })
}

const createutilizador = (request, response) => {
     const users = request.body
    console.log(users)
    var querry = "INSERT INTO utilizador (nome_utilizador,email_utilizador, pass_utilizador,tipo_utilizador) VALUES ('" + users.nome.toString() + "','" + users.email.toString() + "','" + users.pass.toString()+ "',1)";
     console.log(querry)
     client.query(querry, (error, results) => {
        if (error) {
             throw error
         }
         response.status(201).send("User added with ID: ")
     })
}

const userdelete = (request, response) => {
    try {
    const users = request.body

    var querry1 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.utilizador where email_utilizador='" + users.email2.toString() + "' and pass_utilizador='" + users.pass2.toString() + "'))as existe";
    var querry2 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.utilizador where tipo_utilizador = 3 and email_utilizador='" + users.email2.toString() + "' and pass_utilizador='" + users.pass2.toString() + "'))as existe";
    var del ="DELETE FROM tour4us.utilizador where email_utilizador='" + users.email.toString() + "'";
    client.query(querry1, (error, results) => {
        if (error) {throw error}
        if(!(results[0].existe==1))
        {
            client.query(querry2, (error, results2) => {
                if (error) {
                    throw error
                }
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
            if((users.email==users.email2)) {

                    client.query(del, (error, results3) => {
                        if (error) {throw error }
                        response.status(200).json(results3)
                    })

            }
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

const updateuser = (request, response) => {
    try {
        const users = request.body
        console.log(users)
        var querry2 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.utilizador where email_utilizador='" + users.email2.toString() + "' and pass_utilizador='" + users.pass2.toString() + "'))as existe";
        var querry1 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.utilizador where tipo_utilizador = 3 and email_utilizador='" + users.email2.toString() + "' and pass_utilizador='" + users.pass2.toString() + "'))as existe";
        var up ="UPDATE  tour4us.utilizador SET nome_utilizador='" + users.novonome.toString() + "',pass_utilizador='" + users.novopass.toString()+ "' where email_utilizador='" + users.email.toString() + "'";
        console.log(up)
        console.log(users)
        client.query(querry1, (error, results) => {
            if (error) {throw error}
            if(!(results[0].existe==1))
            {

                if((users.email==users.email2)) {
                        client.query(querry2, (error, results2) => {
                            if (error) {
                                throw error
                            }
                            if (results2[0].existe == 1) {
                                client.query(up, (error, results3) => {
                                    if (error) {
                                        throw error
                                    }
                                    response.status(200).json(results3)
                                })
                            }
                        })
                }
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



const teste = (request, response) => {
    try {
        const users = request.body
        console.log(users)

        var querry1 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.utilizador where email_utilizador='" + users.email.toString() + "' and pass_utilizador='" + users.pass.toString() + "'))as existe";
        var querry2 = "SELECT !ISNULL((SELECT ISNULL(id_utilizador) FROM tour4us.utilizador where tipo_utilizador = 3 and email_utilizador='" + users.email2.toString() + "' and pass_utilizador='" + users.pass2.toString() + "'))as existe";
        var del ="DELETE FROM tour4us.utilizador where email_utilizador='" + users.email.toString() + "' and pass_utilizador='" + users.pass.toString() + "'";
        client.query(querry1, (error, results) => {
            if (error) {throw error}
            if(!(results[0].existe==1))
            {
                client.query(querry2, (error, results2) => {
                    if (error) {
                        throw error
                    }
                    console.log(results2)
                    console.log("t")
                    console.log(results2[0].existe)
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
                console.log(del)
                if((users.email==users.email2)) {
                    if ((users.pass == users.pass2)) {
                        client.query(del, (error, results3) => {
                            if (error) {throw error
                                throw new Error(error);}
                            response.status(200).json(results3)
                        })
                    }
                }
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
    createutilizador,
    userdelete,
    updateuser,
    teste,

}