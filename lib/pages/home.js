//IMPORTACIONES
import { getAllProducts } from "../service/products.js"

//INSTANCIAS DE ELEMENTOS
const contenedor_pizzas = document.getElementById("contenedor-pizzas")
const contenedor_ensaladas = document.getElementById("contenedor-ensaladas")
const contenedor_sandwiches = document.getElementById("contenedor-sandwiches")
const contenedor_bebidas = document.getElementById("contenedor-bebidas")


const fillProducts = async ()=>{
    const products = await getAllProducts()

    products.forEach(product => {
        const category = product.category

        let container;
        if (category === "men's clothing") {
            container = contenedor_pizzas
        }else if(category === "jewelery"){
            container = contenedor_ensaladas
        }else if(category === "electronics"){
            container = contenedor_sandwiches
        }else if(category === "women's clothing"){
            container = contenedor_bebidas
        }

        //Crear elemento en la categoría

        container.innerHTML += `
        <div class="col">
            <div class="card h-100">
            <img 
                style="min-height: 300px; max-height: 300px;"
                class="card-img-top"
                src="${product.image}" 
                alt=""
            >
            <div class="card-body p-4">
                <div class="text-center">
                <h5 class="fw-bolder">${product.title}</h5>
                <span>$${product.price}</span>
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="text-center d-flex gap-1">
                    <a href="/detalle.html?id=${product.id}" class="btn btn-outline-secondary mt-auto">
                        Ver más
                    </a>
                    <a href="" class="btn btn-outline-success mt-auto">
                        Añadir al carrito
                    </a>
                </div>
            </div>
            </div>
        </div>
        `
    });
}

fillProducts()