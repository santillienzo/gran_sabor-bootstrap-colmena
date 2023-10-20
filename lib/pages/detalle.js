//IMPORTACIONES
import { getOneProduct, getProductsInCategory } from "../services/products.js";

const id = new URLSearchParams(window.location.search).get('id');

const product_image = document.getElementById('product-image')
const product_title = document.getElementById('product-title')
const product_price = document.getElementById('product-price')
const product_description = document.getElementById('product-description')

const productos_relacionados_container = document.getElementById('productos-relacionados')

//Rellenamos la lista de productos relacionados
const fillProductosRelacionados = async (category)=>{
    const products = await getProductsInCategory(category)

    products.forEach(product => {    

        // crear elemento para el producto
        productos_relacionados_container.innerHTML += `
            <div class="col">
                <div class="card h-100">
                <img 
                    style="min-height: 300px; max-height: 300px;"
                    class="card-img-top"
                    src=${product.image} 
                    alt=""
                >
                <div class="card-body p-4">
                    <div class="text-center">
                    <h5 class="fw-bolder">${product.title}</h5>
                    <span>$${product.price}</span>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                    <a href="/detalle.html?id=${product.id}" class="btn btn-outline-success mt-auto">
                        Añadir al carrito
                    </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    
    
      });
    
}

//Rellenamos los detalles del producto
const fillDetailProduct = async () =>{
    const product = await getOneProduct(id)

    //Rellenamos todos los campos con los datos del producto
    if (product) {
        product_image.src = product.image
        product_title.innerText = product.title
        product_price.innerText = `$${product.price}`
        product_description.innerText = product.description

        //Rellenamos los productos relacionados medainte su categoría
        fillProductosRelacionados(product.category)
    }

}

fillDetailProduct()