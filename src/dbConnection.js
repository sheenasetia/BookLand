const mongoose = require('mongoose');
//fill in your mongodb atlas database url 
const URI = `mongodb+srv://${db_username}:${password}@cluster0-d4nu1.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(URI , {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

var db=mongoose.connection;     //instance of connection
db.on('error',function() {      //error handler method
    console.log("Error connecting to db")
})

db.once('open', function() {    //success method
    console.log("Connected to db") 
})