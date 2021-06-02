//require mysql
const mysql = require("mysql2/promise");

//connect to database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
   database: "books"
});


//open mysql connection
    connection.getConnection().then(res=>{
        console.log('Connected to the database!'); 
    }).catch(error=>{
        console.log("cannot connect to the database");
    }); 
   
    
module.exports= connection;