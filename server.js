const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Database
mongoose.connect('mongodb+srv://nawill:usha0816@cluster0.77u0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false 
 }) 
 .then(() => console.log("Connected to database"))
.catch(err => console.log(err))

//Middleware
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//Controllers

//Routes

//Start Server
app.listen(3000, ()=> console.log("Server started on 3000"))