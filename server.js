//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/locationdetector'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/locationdetector/'}),
);

// Start the app by listening on the default Heroku port
const port = process.env.PORT || 8080;
const host = '0.0.0.0'
app.listen(port, host, ()=> console.log(`server is running on port ${port}`))

/* const express = require('express');
const app = express();
require('dotenv').config()
const path = require('path');
const axios = require('axios');
const mc=require("mongodb").MongoClient
const dataBaseUrl ="mongodb+srv://madhu:madhu@clusterbackend.szevd.mongodb.net/myfirstdb?retryWrites=true&w=majority"
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
       start()
    }
})




//connect to angular app
app.use(express.static(path.join(__dirname,'./dist/locationdetector/')))




const  start = async () => 
{
  
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
       
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}



// Start the app by listening on the default Heroku port

const port = process.env.PORT || 8080;
const host = '0.0.0.0'
app.listen(port, host, ()=> connsole.log(`server is running on port ${port}`)) */