const express=require("express");
const bodyParser=require("body-parser");
const cors =require("cors");

const mongoose = require('mongoose');

const resumeRoutes=require("./routes/resume");

require("dotenv").config();

const app=express();

app.use(cors());

app.use(bodyParser.json())

app.use(resumeRoutes);

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MongoUser)
.then(result=>{
    app.listen(8080,()=>{
        console.log("connected");
    })
})
.catch(err=>console.log(err));