import { register } from "../services/user.js";

// Obtener referencia a los elementos del formulario
const form = document.getElementById('form');
const userInput = document.getElementById("user")
const nameInput = document.getElementById("name")
const lastnameInput = document.getElementById("lastname")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const _passwordInput = document.getElementById("_password")
//TOAST
const _successToast = document.getElementById('successToast')
const _errorToast = document.getElementById('errorToast')

// Función manejadora del submit del formulario  
form.addEventListener('submit', async (e) => {
    const successToast = bootstrap.Toast.getOrCreateInstance(_successToast)
    const errorToast = bootstrap.Toast.getOrCreateInstance(_errorToast)

    // Prevenir submit por defecto
    e.preventDefault();
  
    // Obtener los valores ingresados
    const username = userInput.value;
    const firstname = nameInput.value;
    const lastname = lastnameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const _password = _passwordInput.value;
  
    // Validaciones
    if(
        username === '' || 
        firstname === '' || 
        lastname === '' || 
        email === '' || 
        password === '' || 
        _password === ''
    ) {
        errorToast.show()
        return;
    }

    //Validación contraseña
    if (password !== _password) {
        errorToast.show()
        return;
    }
  
    // Si es válido, enviar petición al backend
    const res = await register({
        username,
        email,
        name: firstname,
        lastname,
        password
    })
    if (res.id) {
        successToast.show()
    }else{
        errorToast.show()
    }
  
  });