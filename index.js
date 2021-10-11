const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
const cors = require('cors')
app.use(cors());
//Configuring express server
app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: '161.35.191.137',
    user: 'videodoctor',
    password: 'Holy3#&-',
    database: 'vacancy_dev',
    multipleStatements: true
    });
    mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });
        
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/getroles' , (req, res) => {
    mysqlConnection.query('SELECT * FROM vacancy_dev.roles', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );


    const script = 'select * from vacancy_dev.tarjeta, vacancy_dev.membresias, vacancy_dev.agentes, vacancy_dev.status, vacancy_dev.socios, vacancy_dev.club where tarjeta.agentes_idagente = agentes.idagente and tarjeta.membresias_idmembresia = membresias.idmembresia and tarjeta.status_idstatus = status.idstatus and membresias.socios_idsocio = socios.idsocio and club.idclub = membresias.club_idclub'


    app.get('/getall' , (req, res) => {
        mysqlConnection.query(script, (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
        })
        } );


// WEN


