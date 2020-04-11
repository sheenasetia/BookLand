  const express = require("express"); //import
  const bodyParser = require("body-parser");
  require('./dbConnection');
  var app=express(); //call constructor
  const users = require('./routes/users'); 
  var books = require('./routes/books');
  const session=require("express-session");
  const UsersModel = require("./models/users")
  const PORT = process.env.PORT || 8081 ;
  //------without database------
  /*var books=[
      {
          "id": "1",
          "name": "name1",
          "author": "ab"
        }
  ]*/
  //------without database------


  //--express-- 
  //gives us functionality to make server
  //makes node listens to a particular port 
  //8080 -- non-secure, for development purpose

  var cookieValidator = (req, res, next) => {
      console.log("cookie validation"+req.session.userName)
    if (req.session.userName) {
        UsersModel.findUser(req, (err, res) => {
            if (err) res.status(401).send({message:"User not authenticated"});
            if (res && res.length == 0) {
                res.status(401).send({message:"User not authenticated"});
            }
            if (res && res.length > 0) {
                next();
            }
        })
    } else {
        res.status(401).send({message:"User not authenticated"});
    }
  }
  app.use(bodyParser.json());
  //below line creates a session and attach it to every incoming request
  app.use(session({   //appends this cookie to every incoming request
    key:"library" ,
    secret:"librarysecret"
  }))
  app.use("/", express.static('public'))
  app.use("/home", express.static('public'))

  //Sample middleware
  app.use("*",(req,res,next) => {
      console.log("Middleware is called");
      res.setHeader('Access-Control-Allow-Origin','*')
      res.setHeader('Access-Control-Allow-Headers','Content-Type,Access-Control-Allow-Headers,Authorisation,X-Requested-With')
      res.setHeader('Access-Control-Allow-Methods','*')
      res.setHeader('Access-Control-Allow-Credentials',true)

      next();
  })

  app.use('/users',users);
  app.use('/books',cookieValidator,books);
  if(process.env.NODE_ENV == 'production'){
      app.use(express.static('../library-portal/build'));
      app.use("*",(req,res)=>{
      res.sendFile(path.join(__dirname,'../library-portal','build','index.html'))
      });
  }
  //------without database------
  /*
  app.get("/",function(req,res){
      console.log(req)
      //res.send("Library Portal") //html data by default
      res.json("Library Portal") // particulary for json type data
  })  //content-type: text/html (by default modified by express)

  app.get("/bookList",function(req,res){
    console.log(books)
      // * is for the origin : * for all the origin
      res.send(books);
  }) //content-type: application.json (done by express)

  app.post("/addBook",(req,res)=> {
      let book=req.body;
      console.log("Add book method is called with book name :",req.body);
      books.push(book)
      res.send(books)

  })

  app.delete(`/deleteBook/:id`,(req,res)=> {
      let id=req.params.id;
      books=books.filter(b=>b.id !== id);
      res.send(books);
  })

  app.put(`/editBook/:id`,(req,res)=>{
      let book=req.body;
      let id=req.params.id;
      books=books.filter(b=>b.id !== id);
      books.push(book);
      res.send(books)
  })

  */
  //------without database------



  app.listen(PORT,()=> {
      console.log(`Server is listening to port ${PORT}`);
  }); 

  //app.<METHODNAME>('path',handler() => {})

