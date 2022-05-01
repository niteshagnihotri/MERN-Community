const mongoose = require('mongoose');
// const DB = process.env.DB;
mongoose.connect('mongodb+srv://admin:root@portfolio.j71m2.mongodb.net/portfolio?retryWrites=true&w=majority')
.then(()=>console.log("Connection Successfull"))
.catch((err)=>console.log(err));