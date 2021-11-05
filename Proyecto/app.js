const express = require('express');
const path = require('path');


const app = express();

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath))



app.get('/', (req,res)=>{
    res.sendFile( path.resolve(__dirname,'views/base.html'));
})


app.listen(3000, ()=>{
    console.log(' Servidor activado en el puerto 3000')
})


app.get('/ProductCart', (req,res)=>{
    res.sendFile(path.resolve(__dirname ,'views/ProductCart.html'));
});

app.get('/Register', (req,res)=>{
    res.sendFile(path.resolve(__dirname ,'views/Register.html'));
});