import express from 'express'
import ProductManager from './ProductManager.class';  


const app = express();
const PORT = 8080

const ready = ()=> console.log('server ready on port '+ PORT)

// Middleware para parsear JSON.
app.use(express.json());

// Instanciar ProductManager
const manager = new ProductManager('./src/products.json'); 

//End Points
app.get('/products', (req, res) => {
    const { limit } = req.query; // Captura el parámetro de consulta 'limit'
    let products = manager.getProducts();
    if (limit) {
        products = products.slice(0, Number(limit));
    }
    res.json({ products });
});

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params; // Captura el parámetro de ruta 'pid'
    const product = manager.getProductById(Number(pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});



server.listen(PORT,ready)



