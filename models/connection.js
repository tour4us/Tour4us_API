// var express = require('express');
// const {getproducts} = require("../routes/produts");
// var app = express();
//
// // app.get('/teste', function (req, res) {
// //
// //     var sql = require("tedious");
// //
// //     // config for your database
// //     var config = {
// //         user: 'Tour4us',
// //         password: 'Tour4us',
// //         server: 'localhost',
// //         database: 'Tour4us'
// //     };
//
// var Connection = require('tedious').Connection;
// var config = {
//     server: 'localhost',  //update me
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'Tour4us', //update me
//             password: 'Tour4us'  //update me
//         }
//     },
//     options: {
//         // If you are on Microsoft Azure, you need encryption:
//         encrypt: true,
//         database: 'Tour4us'  //update me
//     }
// };
// var connection = new Connection(config);
// connection.on('connect', function(err) {
//     // If no error, then good to proceed.
//     console.log("Connected");
// });
//
// connection.connect();


var mysql = require('mysql');
var conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "iade",
    database : 'tour4us',
    port: '3306'
});



/*
var mysql = require('mysql');
var conn = mysql.createPool({
    host: "85.246.8.73",
    user: "garcia",
    password: "garcia",
    database : 'tour4us',
    port: '3308'
});
*/
module.exports = conn;