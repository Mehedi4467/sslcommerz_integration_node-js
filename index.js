const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000
const productRouter = require("./routes/product.routes");
const userRouter = require('./routes/user.routes');
const sslCommerz=require('./SSLCommerz/sslcommerz');
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());

// app.use(express.json());
app.use(bodyParser.urlencoded({
   extended:false
}));
app.use(bodyParser.json());
//route handel
app.use(productRouter);

app.use(userRouter);
app.use(sslCommerz);



app.get('/' , (req , res)=>{

   res.send('Server is running')

});
app.use((req,res)=>{
   res.send("404 Page not Found")
});


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))

