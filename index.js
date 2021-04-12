const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const expressValidator = require ('express-validator');

//import Routes
const authRoutes = require ('./routes/auth');
const usersRoutes = require ('./routes/users');

//config app
const app = express();
require('dotenv').config();

//db Mongodb
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology : true,

})
.then(()=> console.log('db connected'))
.catch(()=> console.log('not connected to the database!'))

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(expressValidator())


//Routes Middleware
app.use('/api', authRoutes);
app.use('/api', usersRoutes);

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`app is running on port ${port}`));