//The sql is used to manage data held in the database
//require()  allows us to include modulws
const sql = require("./db.js");

//The exports tells the the node which function, object or string to export from a given file
//async ensures that the function returns a promise
// promise is an object which has the catch* methods on it it returns a value or an error
// await causes async function execution to pause until a promise is fulfilled or rejected and to resume 
//the execution of the async function after fulfilment
exports.findAllbooks = async (req, res) => {
      try {
            const rows =  await sql.query(`SELECT * FROM books`);
           res.json({
            message: "All Books lists retrieved successfully",
            rows, 
           
          });
          //if promise is rejected
    } catch(err) {
        res.json({
          message: `${err.sqlMessage}`, 
         
        });
    }
};

//to find the list of books of a particular user
//the param is used to import arguments into functions
//the row specifies the visible height of a text area in lines
exports.findUserbooks = async (req, res) => {
    let user= req.params.user;
      try {
        const [rows] =  await sql.query(`SELECT * FROM books WHERE userId=?`,[user]);
          if(rows.length > 0){
            res.json({
              message: `All  ${user} Books  lists retrieved successfully`,
            rows,
          }); 
        }else{
          res.json({
            message: `no books found for  user ${user}`,
        }); 
        }
    } catch(err) {
    res.json({
      message: `${err.sqlMessage}`,
    });
    }
};

//to find a particular user with its id
exports.findUserbooksId =  async (req, res,next) => {
  let user= req.params.user;
  let bookId= req.params.id;
 
 //length==1 is selecting from the data if its equal to 1
    try {
      const [rows,feilds] =  await sql.query(`SELECT * FROM books WHERE userId=? AND  id=?`,[user,bookId]);
      if (rows.length==1) {
        res.json({
          message: `The ${bookId} of ${user} book retrieved successfully`,
          rows,
        });
      }else{
          res.json({
            message: `no books found for  ${bookId} of ${user}`,
        }); 
        }
} catch(err) {
  // If promise is rejected
  res.json({ 
    message: `${err.sqlMessage}`
   
  });
}
};  

//To update a userid
exports.updateUserBookId = async (req, res) => {
  let getId= req.params.id;
  let userId = req.params.user;
  let bookUpdate = req.body;
     try{
      if (!Array.isArray(bookUpdate) || !bookUpdate.length==0) {
        if (bookUpdate['title'] && bookUpdate['author']) {
   const rows = await sql.query(`UPDATE books SET title =?, author =? WHERE id=? AND userId=?`, [bookUpdate.title, bookUpdate.author, getId, userId]); 
    if (rows) {
      res.json({
        message: `The ${getId} of ${userId} book Updated successfully`,
      });
    }else{
        res.json({
          message: `cannot update book  ${getId} of ${userId}`,
      }); 
      }
    }
  }
} catch(err) {
// If promise is rejected
res.json({
  message: `${err.sqlMessage}`
 
});
}; 
  };
//to delete a user or id
  exports.deleteUserBookId = async (req,res) =>{
    let getId = req.params.id;
    let userId = req.params.user;
      try {
     const rows= await sql.query(`Delete FROM books WHERE id=? AND userId=?`, [getId, userId]);
      if (rows) {
        res.json({
          message: `The ${getId} of ${userId} book Deleted successfully`,
          //rows,
        });
      }else{
          res.json({
            message: `cannot delete book  ${getId} of ${userId}`,
          //rows,
        }); 
      };
  } catch(err) {
  // If promise is rejected
  res.json({
    message: `${err.sqlMessage}`
  });
  }; 
    };


  //create a new book
  exports.createNewBook = async (req,res) => {
  let books = req.body;
    if (books.author  || books.title || books.userId){
     try {
       const rows = await sql.query(`INSERT INTO books (author, title, userId) VALUE (?,?,?)`, [books.author, books.title, books.userId])
       if (rows) {
         res.json(`book created sucessfully!`)
       }else{
         console.log('help')
       }
      } catch (err) {
        res.json({
          message: `${err}`
        });
     }
    }else{
      res.json('The field entered is empty');
    };
  };
