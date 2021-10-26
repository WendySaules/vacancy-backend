const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
app.use(cors());
//Configuring express server
// app.use( bodyParser.json() );
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
//   }));

//   app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies
// app.use(express.bodyParser());

app.use(bodyParser.json());



//MySQL details
var mysqlConnection = mysql.createConnection({
    host: '161.35.191.137',
    user: 'videodoctor',
    password: 'Holy3#&-',
    database: 'vacancy_dev',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));




//Creating GET Router to fetch all the learner details from the MySQL Database
// app.get('/roles', (req, res) => {
//     mysqlConnection.query('SELECT * FROM vacancy_dev.roles', (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     })
// });

// app.get('/alldata', (req, res) => {

//     const scriptall = 'select * from vacancy_dev.tarjeta, vacancy_dev.membresias, vacancy_dev.agentes, vacancy_dev.status, vacancy_dev.socios, vacancy_dev.club where tarjeta.agentes_idagente = agentes.idagente and tarjeta.membresias_idmembresia = membresias.idmembresia and tarjeta.status_idstatus = status.idstatus and membresias.socios_idsocio = socios.idsocio and club.idclub = membresias.club_idclub';

//     mysqlConnection.query(scriptall, (err, rows, fields) => {
//         if (!err)
//             res.send(rows);
//         else
//             console.log(err);
//     });
// });

// app.get('/agentelogin/:email', (req, res) => {

//     //  let email = 'direccion@vacancy.com';
//     let email = req.params.email;
//     console.log(email);

//     const scriptagente = "CALL get_agente('email', '" + email + "', '')";

//     mysqlConnection.query(scriptagente, (err, rows, fields) => {
//         if (!err) {
//             res.send(rows);
//             console.log(rows, 'result');
//         }

//         else
//             console.log(err);
//     });
// });


app.post('/agente', (req, res) => {

    try {
        let email = req.body.email;
        let pwd = req.body.pwd;

        // let email = 'direccion@vacancy.com';
        // let pwd = 'vacancy123';
        // const scriptagente = "SELECT * FROM vacancy_dev.agentes where usr='" + email + "' and pwd='" + pwd + "' ORDER BY idagente ASC LIMIT 1;"

        const scriptagente = "CALL get_agente('email', '" + email + "', '')";

        mysqlConnection.query(scriptagente, (err, rows, fields) => {
            if (!err) {

                let response = {
                    status:null,
                    //access_token: rows.email //JWT
                    message:null,
                    result:null

                };

                 if (rows[0][0].response =="404"){

                     response = {
                        status:404,
                        message:"email no encontrado",
                        result:null
                    };
                    console.log(response);

                } else if(rows[0][0].response=="200"){
                    //si existe email, validar contraseña
                    if(rows[0][0].pwd == pwd){
                        response = {
                            status:200,
                            message:"",
                            result:rows
                        };
                        console.log(response);
                    }else{
                         response = {
                            status:405,
                            message:"contraseña invalida",
                            result:null
                        };
                        console.log(response);
                    }

                }

               
               console.log(rows[0][0], "response");
               console.log(response);
                res.send(response);

            } else  
            console.log(err);
        });

    }catch (error) {
        console.error(error);  
    }
});


app.get('/membresias/:startDate/:dueDate', (req, res) => {
    try {
        let startDate = req.params.startDate;
        let dueDate = req.params.dueDate;
        console.log(startDate,dueDate);

        const scriptmembresias = "CALL get_membresias('all', '" + startDate + "', '" + dueDate + "','',0)";

        mysqlConnection.query(scriptmembresias, (err, rows, fields) => {
       
            
            if (!err) {
    
                    let response = {
                        status:null,
                        //access_token: rows.email //JWT
                        message:null,
                        result:null
    
                    };
    
                    if (rows[0][0].response != "200"){
    
                         response = {
                            status:404,
                            message:"No se encontraron resultados",
                            result:null
                        };
                        console.log(response);
    
                    } else if(rows[0][0].response=="200"){
                             response = {
                                status:200,
                                message:"",
                                result:rows
                            };
                            console.log(response);
                    }

                   console.log(rows[0][0], "rows");
                   console.log(response , "response");
                   res.send(response);
    
            } else  
              console.log(err);

        });
    
    } catch (error) {console.error(error); }
});

app.get('/membresiasbystatus/:startDate/:dueDate/:status', (req, res) => {
    try {
        let startDate = req.params.startDate;
        let dueDate = req.params.dueDate;
        let status = req.params.status;
        console.log(startDate,dueDate,status);

        const scriptmembresiasBystatus = "CALL get_membresias('status', '" + startDate + "', '" + dueDate + "','', " + status + ")";

        console.log(scriptmembresiasBystatus);

        mysqlConnection.query(scriptmembresiasBystatus, (err, rows, fields) => {
       
            
            if (!err) {
    
                    let response1 = {
                        status:null,
                        //access_token: rows.email //JWT
                        message:null,
                        result:null
    
                    };
    
                    if (rows[0][0].response != "200"){
    
                         response1 = {
                            status:404,
                            message:"No se encontraron resultados",
                            result:null
                        };
                        console.log(response1);
    
                    } else if(rows[0][0].response=="200"){
                             response1 = {
                                status:200,
                                message:"",
                                result:rows
                            };
                            console.log(response1);
                    }

                   console.log(rows[0][0], "rows");
                   console.log(response1 , "response1");
                   res.send(response1);
    
            } else  
              console.log(err);

        });
    
    } catch (error) {console.error(error); }
});

app.get('/membresiasanticipadas/:startDate/:dueDate', (req, res) => {
    try {
        let startDate = req.params.startDate;
        let dueDate = req.params.dueDate;
        let status = 0;
        console.log(startDate,dueDate,status);

        const scriptmembresiasanticipadas = "CALL get_membresias('anticipadas', '" + startDate + "', '" + dueDate + "','', " + status + ")";

        console.log(scriptmembresiasAnticipadas);
                                    
        mysqlConnection.query(scriptmembresiasanticipadas, (err, rows, fields) => {
       
            
            if (!err) {
    
                    let response1 = {
                        status:null,
                        //access_token: rows.email //JWT
                        message:null,
                        result:null
    
                    };
    
                    if (rows[0][0].response != "200"){
    
                         response1 = {
                            status:404,
                            message:"No se encontraron resultados",
                            result:null
                        };
                        console.log(response1);
    
                    } else if(rows[0][0].response=="200"){
                             response1 = {
                                status:200,
                                message:"",
                                result:rows
                            };
                            console.log(response1);
                    }

                   console.log(rows[0][0], "rows");
                   console.log(response1 , "response1");
                   res.send(response1);
    
            } else  
              console.log(err);

        });
    
    } catch (error) {console.error(error); }
});