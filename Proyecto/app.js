const express = require('express');
const path = require('path');


const app = express();

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath))

const port= 3001;


app.get('/', (req,res)=>{
    res.sendFile( path.resolve(__dirname,'views/Home.html'));
})




app.get('/carrito', (req,res)=>{
    res.sendFile(path.resolve(__dirname ,'views/ProductCart.html'));
});


app.get('/detalles', (req,res)=>{
    res.sendFile(path.resolve(__dirname ,'views/ProductDetail.html'));
});

app.get('/login', (req,res)=>{
    res.sendFile(path.resolve(__dirname ,'views/Login_prov.html'));
});


app.get('/register', (req,res)=>{
    res.sendFile(path.resolve(__dirname ,'views/Register_prov.html'));
});


app.listen(port, ()=>{
    console.log(` Servidor activado en el puerto ${port}`)
})

