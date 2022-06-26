const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const mc=require("mongodb").MongoClient
require("dotenv").config()
const dataBaseUrl = process.env.DATABASEURL
let dataBaseObj;

mc.connect(dataBaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>
{
    if(err)
    {
        console.log("err in mongodb connection",err)
    }
    else
    {
        dataBaseObj=client.db("myfirstdb")
        console.log("connected to database")
       
    }
})


//connect to angular app
app.use(express.static(path.join(__dirname,'./dist/locationdetector/')))


app.use('/presentcontest',async(req,res)=>{
  
    try {
        const resp= await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=+latitude+&longitude=+longitude+&localityLanguage=en')
        const newUser = 
        {
        "latitude":resp.data.latitude,
        "longitude":resp.data.longitude,
        "locality":resp.data.locality,
        "district":resp.data.localityInfo.administrative[2].name,
        "mandal":resp.data.localityInfo.administrative[3].name,
        }
       console.log("yeah",newUser)

       await dataBaseObj.collection("mycollection").insertOne(newUser)
       res.send(newUser)
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
})




  
// Start the app by listening on the default Heroku port
const port= process.env.port||8080;
app.listen(port,()=>console.log(`server working on ${port}...`))