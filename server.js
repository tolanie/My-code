// require package
const express = require("express");
const app = express();

// the router is the one routing each page
const router = require('./route/index');

//to parse Json using Express
app.use(express.urlencoded({extended: true})) // parsing incoming requests with urlencoded based body-parser
 app.use(express.json())

 //use route data here 
app.use("/",router);

 //Establish the server connection
 //PORT ENVIRONMENT VARIABLE
const port =process.env.PORT || 3000;
//the listen port which is localhost:3000
app.listen(port, () => console.log(`Server listening at port ${port}`));