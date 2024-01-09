export function getAllProducts (){
    return fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> json)
}

export function getOneProduct (id){
    return fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=> json)
}

export function getProductInCategory (categoria){
    return fetch(`https://fakestoreapi.com/products/category/${categoria}`)
            .then(res=>res.json())
            .then(json=> json)
}

export function addProduct ({
    title,price,description,image,category
}) {
    return fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title,
                    price,
                    description,
                    image,
                    category
                }
            )
        })
        .then(res=>res.json())
        .then(json=>json)
} 

