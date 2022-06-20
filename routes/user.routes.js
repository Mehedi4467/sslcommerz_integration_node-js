const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpvqa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       await client.connect();
       const productCollection = client.db("testDatabase").collection('product');
    
     
       router.get('/user', async(req,res)=>{
        const result = await productCollection.find().toArray();
        res.send(result);
        // res.send('Hello this is product app get router')
    });
    }
    finally{
        // await client.close();
    }
 }
 
 run().catch(console.dir);

 module.exports = router;