import { login } from "../service/user.js"

//Obtener la referencia de los elementos
const form = document.getElementById("form")
const userInput = document.getElementById("user")
const passwordInput = document.getElementById("password")

//TOAST
const _successToast = document.getElementById('successToast')
const _errorToast = document.getElementById("errorToast")

//Agregamos un evento al formulario
form.addEventListener('submit', async(e)=>{
    e.preventDefault()

    const successToast = bootstrap.Toast.getOrCreateInstance(_successToast)
    const errorToast = bootstrap.Toast.getOrCreateInstance(_errorToast)

    //Obtener valores ingresados
    const username = userInput.value
    const password = passwordInput.value

    //validaciones
    if (username === '' || password === '') {
        errorToast.show()
        return 
    }

    //Sí es válido
    const res = await login({username, password})

    if (res.token) {
        successToast.show()
    }else{
        errorToast.show()
    }

})