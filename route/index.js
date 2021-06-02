// the route

const  router = require('express').Router()
const dbcontroller = require('../config/controller');

router.get('/' , (req , res)=>{
    res.json({ message: "Welcome." });
})

//create new  books
router.post('/books', dbcontroller.createNewBook);

//list all books avaliable
router.get('/books',dbcontroller.findAllbooks);

//list all books for each user
router.get('/books/:user',dbcontroller.findUserbooks);

// to get  list any user and id in the books
router.get('/books/:user/:id',dbcontroller.findUserbooksId);

//to update a any user or id
router.put('/books/:user/:id', dbcontroller.updateUserBookId);

//to delete any user or id
router.delete('/books/:user/:id', dbcontroller.deleteUserBookId);

// 404 error is checking all the routes if available
router.all('*', (req, res, next) => {
  res.status(404).send("Reqest Not Found")
});
module.exports  = router