import { getAllProducts } from "../service/products.js"
import { getAllUsers } from "../service/user.js"

//Referencia de tablas
const productTableBody = document.getElementById("productTableBody")
const userTableBody = document.getElementById("userTableBody")

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

const fillProductsTable = async ()=>{
    const products = await getAllProducts()

    products.forEach(product => {
        productTableBody.innerHTML += `
        <tr>
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
    });
}

const fillUsersTable = async ()=>{
    const users = await getAllUsers()

    users.forEach(user => {
        const fullname = `${user.name.firstname} ${user.name.lastname}`

        userTableBody.innerHTML += `
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
    });

}


fillProductsTable()
fillUsersTable()