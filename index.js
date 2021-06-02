const path = require ('path')
const mysql = require('mysql');
 const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const port = 3000
//to parse Json using Express
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "books"
  });

  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

   http://localhost:8080
//to get the book list in JSON form
// app.get('/book', (req, res) =>{
// res.json(books)
// })
// //to add books to the list
app.post('/book', (req, res) => {
    const book = req.body

    console.log(book)
    books.push(book)
   res.send('Book is added to the list')
})

// // to search for a book in the list
app.get('/book/:id', (req, res) =>{
    const id = req.params.id

    for(let book of books){
        if (book.id === id){
            res.json(book)
            return
        }
    }
    res.status(404).send('Book not found')
})
// //delete a book from the list
// app.delete('/book/:id', (req, res) => {
//     const id = req.params.id

//     books = books.filter(book => {
//         if(book.id !== id){
//             return true
//         }
//         return false
//     })
//     res.send('book has been deleted')
// })
//set the server to listen to port
app.listen(port, () => console.log(`Server listening at port ${port}`));
