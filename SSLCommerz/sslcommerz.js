const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');





const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'zeroc62b03287b4bd6';
const store_passwd = 'zeroc62b03287b4bd6@ssl';
const is_live = false //true for live, false for sandbox

console.log(store_id)


//sslcommerz init
router.get('/init', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url:  `http://localhost:5000/ssl-payment-succuss`,
        fail_url: `http://localhost:5000/ssl-payment-failure`,
        cancel_url:`http://localhost:5000/ssl-payment-cencel`,
        ipn_url: `http://localhost:5000/ssl-payment-ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    console.log(data)
    sslcz.init(data).then(data => {
        // Redirect the user to payment gateway
      //   let GatewayPageURL = data.GatewayPageURL
      //   res.redirect(GatewayPageURL)
      //   console.log('Redirecting to: ', GatewayPageURL)
        if(data?.GatewayPageURL){
                    return res.status(200).redirect(data?.GatewayPageURL)
                }
                else{
                    return res.status(400).json({
                        message:"SSl Session was not successfull"
                    })
                }

    });
})


router.post('/ssl-payment-succuss',async(req,res,next)=>{
   return res.status(200).json({
       data:req.body
   })
});
router.post('/ssl-payment-failure',async(req,res,next)=>{
   return res.status(400).json({
       data:req.body
   })
});

router.post('/ssl-payment-cencel',async(req,res,next)=>{
   return res.status(200).json({
       data:req.body
   })
});
router.post('/ssl-payment-ipn',async(req,res,next)=>{
   return res.status(200).json({
       data:req.body
   })
});





// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jpvqa.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// async function run(){
//     try{
//        await client.connect();
//        const productCollection = client.db("testDatabase").collection('product');
    
     
//        router.get('/payment', async(req,res)=>{
//         const result = await productCollection.find().toArray();
//         res.send(result);
//         // res.send('Hello this is product app get router')
//     });
//     }
//     finally{
//         // await client.close();
//     }
//  }
 
//  run().catch(console.dir);




module.exports=router;