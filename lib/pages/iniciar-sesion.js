import { login } from "../services/user.js";

// Obtener referencia a los elementos del formulario
const form = document.getElementById('form');
const userInput = document.getElementById("user")
const passwordInput = document.getElementById("password")
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
    const password = passwordInput.value;
  
    // Validaciones
    if(username === '' || password === '') {
      errorToast.show()
      return;
    }
  
    // Si es válido, enviar petición al backend
    const res = await login({username,password})

    if (res.token) {
        successToast.show()
    }else{
        errorToast.show()
    }
  });