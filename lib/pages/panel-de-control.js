import { addProduct, getAllProducts } from "../service/products.js"
import { getAllUsers, register } from "../service/user.js"

//Referencia de tablas
const productTableBody = document.getElementById("productTableBody")
const userTableBody = document.getElementById("userTableBody")
//Referencia de formularios
const addProductsForm = document.getElementById("addProductsForm") 
const addUsersForm = document.getElementById("addUsersForm") 

//Le asignamos un color a cada tipo de categoría
const handleCategoryColor = (category)=>{
    let color = "ligth";

    switch (category) {
        case "men's clothing":
            color = "text-bg-danger"
            break;
        case "jewelery":
            color = "text-bg-info"
            break;
        case "women's clothing":
            color = "text-bg-warning"
            break;
        case "electronics":
            color = "text-bg-dark"
            break;
        default:
            break;
    }

    return color
}

//Plantilla para tabla: Productos
const genericProductTemplate = (product)=>{
    return `<tr>
        <td>
        <div class="d-flex align-items-center gap-2">
            <img
                src="${product.image}"
                class="rounded-circle"
                alt=""
                style="width: 45px; height: 45px"
            />
            <span class="fw-bold text-nowrap">
                ${product.title}
            </span>
        </div>
        </td>
        <td>
        <span class="badge ${handleCategoryColor(product.category)}">
            ${product.category}
        </span>
        </td>
        <td>
        <span class="badge text-bg-success rounded-pill d-inline">$${product.price}</span>
        </td>
        <td>
            <div class="d-flex gap-1">
                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm fw-bold"
                    data-mdb-ripple-color="dark"
                >
                    Editar
                </button> 
                <button
                    type="button"
                    class="btn btn-outline-primary btn-sm fw-bold"
                    data-mdb-ripple-color="dark"
                >
                    <i class="bi bi-trash3"></i>
                </button> 
            </div>
        </td>
    </tr>     
    `
}

//Plantilla para tabla: Usuarios
const genericUserTemplate = (user)=>{
    const fullname = `${user.name.firstname} ${user.name.lastname}`

    return `
    <tr>
        <td>
        <div class="d-flex align-items-center gap-2">
            <div class="rounded-circle">
                <i class="bi bi-person fs-3"></i>
            </div>
            <div>
                <p class="fw-bold mb-1">${user.username}</p>
                <p class="text-muted mb-0">${fullname}</p>
            </div>
        </div>
        </td>
        <td>
        <p class="fw-normal mb-1">${user.email}</p>
        </td>
        <td>
        <span class="badge text-bg-secondary rounded-pill d-inline">${user.phone}</span>
        </td>
        <td>
            <button
                type="button"
                class="btn btn-outline-primary btn-sm fw-bold"
                data-mdb-ripple-color="dark"
            >
                Editar
            </button> 
            <button
                type="button"
                class="btn btn-outline-primary btn-sm fw-bold"
                data-mdb-ripple-color="dark"
            >
                <i class="bi bi-trash3"></i>
            </button> 
        </td>
    </tr>
    `
}

//Rellenamos la tabla de productos
const fillProductsTable = async ()=>{
    const products = await getAllProducts()

    products.forEach(product => {
        productTableBody.innerHTML += genericProductTemplate(product)
    });
}

//Rellenamos la tabla de usuarios
const fillUsersTable = async ()=>{
    const users = await getAllUsers()

    users.forEach(user => {
        userTableBody.innerHTML += genericUserTemplate(user)
    });

}

//Reseteamos los valores
const resetValues = (inputs)=>{
    inputs.forEach(input=>{
        input.value = ''

    })
}

//Enviamos el producto
const submitProduct = async (e)=>{
    e.preventDefault()
    const inputs = addProductsForm.querySelectorAll(".input")

    //Valores de los inputs dentro de un objeto
    const values = {
        title: inputs[0].value,
        image: inputs[1].value,
        description: inputs[2].value,
        price: inputs[3].value,
        category: inputs[4].value,
    }

    //Desctructuramos los valores
    const {title, image, description, price} = values

    //Validación de que esten todos los campos completos
    if (
        title === ''||
        image === ''||
        description === ''||
        price === ''
    ) {
        alert("Por favor completa todos los campos")
        return
    }

    //Realizamos la petición
    const res = await addProduct(values)

    //Si se realiza correctamente:
    if (res) {
        alert('Producto agregado correctamente')
        //Renderizamos el producto en la tabla
        productTableBody.insertAdjacentHTML('afterbegin', genericProductTemplate(values))

        //Reseteamos los valores
        resetValues(inputs)

    }

}
//Enviamos el usuario
const submitUser = async (e)=>{
    e.preventDefault()
    const inputs = addUsersForm.querySelectorAll(".input")

    //Valores de los inputs dentro de un objeto
    const values = {
        username: inputs[0].value,
        name: {
            firstname: inputs[1].value,
            lastname: inputs[2].value,
        },
        email: inputs[3].value,
        phone: inputs[4].value,
    }

    //Desctructuramos los valores
    const {username, name, email, phone} = values

    //Validación de que esten todos los campos completos
    if (
        username === ''||
        name.firstname === ''||
        name.lastname === ''||
        email === '' ||
        phone === ''
    ) {
        alert("Por favor completa todos los campos")
        return
    }

    //Realizamos la petición
    const res = await register(values)

    //Si se realiza correctamente:
    if (res) {
        alert('Usuario agregado correctamente')
        //Renderizamos el producto en la tabla
        userTableBody.insertAdjacentHTML('afterbegin', genericUserTemplate(values))

        //Reseteamos los valores
        resetValues(inputs)

    }
}


addProductsForm.addEventListener("submit", submitProduct)
addUsersForm.addEventListener("submit", submitUser)



fillProductsTable()
fillUsersTable()