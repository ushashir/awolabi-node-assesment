const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const app = express();

// database connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nawill:usha0816@cluster0.77u0d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false  
        });
        console.log('MongoDB Connected ...')
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();


//Middleware
// app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.json ({ msg: 'Hello node project'}));



//Routes
// app.use('/api/users', users );
// app.use('/api/auth', auth );
// app.use('/api/students', students );
// app.use('/api/workers', workers );


//Start Server
app.listen(3000, ()=> console.log("Server started on 3000"))