import CrudProductos from `../crud/crudProductos.js`;

let myCrudProductos = new CrudProductos(`./datab/productos.json`);


const getAllProducts = async (req, res) => {
    try {
        let allProducts = await myCrudProductos.getAll();
        return res.json(allProducts);
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
}

const getProductById = async (req, res) => {
    try {
        let productbyId = await myCrudProductos.getById(req.params.id);
        if (productbyId.length == 0) {
            return res.status(404).json({
                error: `Error producto no encontrado`
            });
        } else {
            return res.json(productbyId);
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
}

const addProduct = async (req, res) => {
    
        try {
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.thumbnail;
            const description = req.body.descripcion;
            const code = Number(req.body.codigo);
            const stock = Number(req.body.stock);

            const newProducto = {
                
                nombre: `${name}`,
                descripcion: `${description}`,
                codigo: code,
                thumbnail: `${url}`,
                precio: price,
                stock: stock
            };
            const id = await myCrudProductos.save(newProducto);

            return res.json(`El id asignado es ${id}`);
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    } 


const updateProductById = async (req, res) => {
   
        try {
            const id = Number(req.params.id);
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.thumbnail;
            const description = req.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(req.body.codigo);
            const stock = Number(req.body.stock);

            let allProducts = await myCrudProductos.getAll();
            const productIndex = allProducts.findIndex(product => product.id === id);

            if (productIndex < 0) {
                return res.status(401).json({
                    error: "producto no encontrado"
                });
            }
            allProducts[productIndex].nombre = name;
            allProducts[productIndex].thumbnail = url;
            allProducts[productIndex].descripcion = description;
            allProducts[productIndex].codigo = code;
            allProducts[productIndex].precio = price;
            allProducts[productIndex].stock = stock;

            await myCrudProductos.write(allProducts, `Mensaje modificado`);
            return res.json(`Se actualizó el id ${id}`);

        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    
    
}

const deleteProductById = async (req, res) => {
   
        try {
            const id = Number(req.params.id);
            await myCrudProductos.deleteById(id);

            return res.json(`Se eliminó de forma correcta el ID:${id}`);
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    
}

export default {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
};