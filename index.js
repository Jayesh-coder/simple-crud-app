const express = require('express')
const app = express()
const model = require('./models/product.model.js');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from node API Server updated');
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


app.post('/api/Products', async (req, res) =>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({message: error.message});
    }

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
});

// update the product
app.put('/api/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// delete a product

app.delete('/api/product/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})