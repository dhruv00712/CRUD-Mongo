const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const itemRoutes=require('./routes/items');
require('dotenv').config();

const app=express();
const PORT =process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/items',itemRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongo Connected");
    app.listen(PORT,()=> console.log(`Server Running on Port ${PORT}`));
})
.catch(err=>console.error(err));
