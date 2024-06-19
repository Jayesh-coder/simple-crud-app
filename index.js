const express = require('express')
const app = express()
const mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send('Hello from node API Server updated');
});


app.post('/api/Products',(req, res) =>{
    console.log(req.body);
    res.send(res.body);
});

mongoose.connect("mongodb+srv://admin:PuvVUOJJ0xUBYK1f@backenddb.qquq32e.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connection failed!");
})