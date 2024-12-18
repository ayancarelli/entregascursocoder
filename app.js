import express from "express"

const app = express();

const PUERTO = 8080;
import carritoRouter from "./routes/carrito.router.js";
import productoRouter from "./routes/productos.router.js";


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`public`));

//Routers import
const productosRouter = require("../routes/productosRouter.js");
const carritoRouter = require("../routes/carritoRouter.js");


//Ruoters
app.use("/api/cart", carritoRouter);
app.use("/api/products", productoRouter);


//Puerto
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`)
})