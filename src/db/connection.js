const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.CONNECTION_URI,{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true }
,err => {
    if (err) return console.log("error : ", err);
    console.log('Connected to MongoDB!!!')
})


