const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
app.use(cors());
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


//Lamados:
//sesion
app.post('/agentebyemail', (req, res) => {

    try {
        let email = req.body.email;
        let pwd = req.body.pwd;

        const scriptagente = "CALL get_agente_sesion('email', '" + email + "', '')";

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

// app.get('/membresiasbystatus/:startDate/:dueDate/:status', (req, res) => {
//     try {
//         let startDate = req.params.startDate;
//         let dueDate = req.params.dueDate;
//         let status = req.params.status;
//         console.log(startDate,dueDate,status);

//         const scriptmembresiasBystatus = "CALL get_membresias('status', '" + startDate + "', '" + dueDate + "','', " + status + ")";

//         console.log(scriptmembresiasBystatus);

//         mysqlConnection.query(scriptmembresiasBystatus, (err, rows, fields) => {
       
            
//             if (!err) {
    
//                     let response1 = {
//                         status:null,
//                         //access_token: rows.email //JWT
//                         message:null,
//                         result:null
    
//                     };
    
//                     if (rows[0][0].response != "200"){
    
//                          response1 = {
//                             status:404,
//                             message:"No se encontraron resultados",
//                             result:null
//                         };
//                         console.log(response1);
    
//                     } else if(rows[0][0].response=="200"){
//                              response1 = {
//                                 status:200,
//                                 message:"",
//                                 result:rows
//                             };
//                             console.log(response1);
//                     }

//                    console.log(rows[0][0], "rows");
//                    console.log(response1 , "response1");
//                    res.send(response1);
    
//             } else  
//               console.log(err);

//         });
    
//     } catch (error) {console.error(error); }
// });

app.get('/clubs', (req, res) => {
    try {
        const script = "CALL get_catalogs_filtros('clubs')";

        mysqlConnection.query(script, (err, rows, fields) => {
       
            
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
                    } else if(rows[0][0].response=="200"){
                             response = {
                                status:200,
                                message:"",
                                result:rows
                            }; 
                    }

                   console.log(rows, "rows");
                   console.log(response, "response");
                   res.send(response);

    
            } else 
               console.log(err); 
        });
    
    } catch (error) {console.error(error); }
});

app.get('/estados', (req, res) => {
    try {
        const script = "CALL get_catalogs_filtros('estados')";

        mysqlConnection.query(script, (err, rows, fields) => {
       
            
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
                    } else if(rows[0][0].response=="200"){
                             response = {
                                status:200,
                                message:"",
                                result:rows
                            }; 
                    }

                   console.log(rows, "rows");
                   console.log(response, "response");
                   res.send(response);

    
            } else 
               console.log(err); 
        });
    
    } catch (error) {console.error(error); }
});

app.get('/agentes', (req, res) => {
    try {
        const script = "CALL get_catalogs_filtros('agentes')";

        mysqlConnection.query(script, (err, rows, fields) => {
       
            
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
                    } else if(rows[0][0].response=="200"){
                             response = {
                                status:200,
                                message:"",
                                result:rows
                            }; 
                    }

                   console.log(rows, "rows");
                   console.log(response, "response");
                   res.send(response);

    
            } else 
               console.log(err); 
        });
    
    } catch (error) {console.error(error); }
});

//update Status
app.put('/status', (req, res) => {

    try {
        let idmembresia = req.body.idmembresia;
        let status = req.body.idstatus;

        const scriptupdate = "CALL update_status('tarjeta', '" + idmembresia + "', '" + status + "')";

        mysqlConnection.query(scriptupdate, (err, rows, fields) => {
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
                        message:"estatus no actualizado",
                        result:null
                    };
                    console.log(response);

                } else if(rows[0][0].response=="200"){
                    
                        response = {
                            status:200,
                            message:"estatus actualizado correctamente",
                            result:rows
                        };
                        console.log(response);
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

//update Agente
app.put('/newagente', (req, res) => {

    try {
        let idmembresia = req.body.idmembresia;
        let idagente = req.body.idagente;
        let idagenteanterior = req.body.idagenteanterior;

        const scriptupdate = "CALL update_agente('tarjeta', '" + idmembresia + "', '" + idagente + "' , '" + idagenteanterior + "')";

        mysqlConnection.query(scriptupdate, (err, rows, fields) => {
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
                        message:"agente no actualizado",
                        result:null
                    };
                    console.log(response);

                } else if(rows[0][0].response=="200"){
                    
                        response = {
                            status:200,
                            message:"agente actualizado correctamente",
                            result:rows
                        };
                        console.log(response);
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