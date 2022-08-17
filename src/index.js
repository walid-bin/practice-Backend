require('dotenv').config();
require('./db/connection');
const PORT = process.env.PORT || 8000;
const app = require('./routes/index');
app.listen(PORT,()=>{
    console.log('Server is up on port =>', PORT)
})