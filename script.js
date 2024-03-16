const firebaseConfig = {
    apiKey: "AIzaSyCUiJGPp7J8-faTOsm_1LF2m1q2OlNP11w",
    authDomain: "formulario-js-oscar.firebaseapp.com",
    projectId: "formulario-js-oscar",
    storageBucket: "formulario-js-oscar.appspot.com",
    messagingSenderId: "280417544704",
    appId: "1:280417544704:web:57f3c052f42b25451dc6e5",
    measurementId: "G-SJNV9XQKR7"
  };

//Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === ''){
        errorNombre.textContent = "Por favor, introducí tu nombre"
        errorNombre.classList.add('error-message')
    }else {
        errorNombre.textContent = ''
        console.log(errorNombre)
        errorNombre.classList.remove('error-message')
    }

    //Validar correo electronico

    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico
    
    if (!emailPattern.test(emailEntrada.value)) {
      emailError.textContent = 'Por favor, introducí un mail válido';
      emailError.classList.add('error-message');
    } else {
      emailError.textContent = '';
      emailError.classList.remove('error-message');
    }
    //Validar la contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
      contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
      contrasenaError.classList.add('error-message');
    } else {
      contrasenaError.textContent = '';
      contrasenaError.classList.remove('error-message');
    }


    //Si todos los campos son validos enviar informacion
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        //backend que reciba toda la informacion:

        db.collection("users").add({
          nombre: entradaNombre.value,
          email: emailEntrada.value,
          password: contrasenaEntrada.value
        })
        .then((docRef) => {
          alert('El formulario se ha enviado con éxito', docRef.id);
          document.getElementById('formulario').reset();
        })
        .catch((error) => {
          alert(error);
        });
      }




})