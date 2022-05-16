//
//
//
//
// /*var Connection = require('tedious').Connection;
// var config = {
//     server: 'your_server.database.windows.net',  //update me
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
//     executeStatement();
// });
//
// connection.connect();
//
// var Request = require('tedious').Request;
// var TYPES = require('tedious').TYPES;
//
// function executeStatement() {
//     request = new Request("select * from Produtot;", function(err) {
//         if (err) {
//             console.log(err);}
//     });
//     var result = "";
//     request.on('row', function(columns) {
//         columns.forEach(function(column) {
//             if (column.value === null) {
//                 console.log('NULL');
//             } else {
//                 result+= column.value + " ";
//             }
//         });
//         console.log(result);
//         result ="";
//     });
//
//     request.on('done', function(rowCount, more) {
//         console.log(rowCount + ' rows returned');
//     });
//
//     // Close the connection after the final event emitted by the request, after the callback passes
//     request.on("requestCompleted", function (rowCount, more) {
//         connection.close();
//     });
//     connection.execSql(request);
// }*/
//
//
//
// const sql = require ("mssql");
// const config ={
//     server : "localhost",
//     port : 1433,
//     user : "Tour4us",
//     password : "Tour4us",
//     database : "Tour4us",
//     options: {
//         enableArithAbort:true,
//     },
//     connectionTimeout:150000,
//     pool : {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000,
//     },
// };
//
// sql .on ('error', err=> {
//     console.log (err.message)
// })
//
// // Async Await
//
// async function getDBUsersAsyncFunction(){
//     try {
//         let pool = await sql.connect(config)
//         let result1 = await pool.request().query('select * from Produtot')
//         console.log(result1)
//         sql.close()
//     }
//     catch (error){
//             console.log(err.message)
//             sql.close
//         }
//     }
//
//     getDBUsersAsyncFunction();
//
// // Promise