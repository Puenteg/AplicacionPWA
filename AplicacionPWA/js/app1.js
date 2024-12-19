// localStorage.setItem("nombrePersona", "Maria");

// sessionStorage.setItem("edadPersona", 22);

// const nombre = localStorage.getItem("nombrePersona");
// console.log("Nombre: ", nombre);

// const edad = sessionStorage.getItem("edadPersona");
// console.log("Edad: ", edad);

// setTimeout(() => {
//     sessionStorage.removeItem("edadPersona");
// }, 3000);

function almacenarDatos() {
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;

    localStorage.setItem("nombrePersona", nombre);
    sessionStorage.setItem("edadPersona", edad);
}

function obtenerDatos() {
    let nombre = localStorage.getItem("nombrePersona");
    let edad = sessionStorage.getItem("edadPersona");

    document.getElementById("nombre").value = nombre;
    document.getElementById("edad").value = edad;
}

const persona = {
    nombre: "",
    edad: 0
}

function almacenarObjeto() {
    persona.nombre = document.getElementById("nombre").value;
    persona.edad = document.getElementById("edad").value;

    sessionStorage.setItem("persona", JSON.stringify(persona));
}

function obtenerObjeto() {
    let {nombre, edad} = JSON.parse(sessionStorage.getItem("persona"));

    document.getElementById("nombre").value = nombre;
    document.getElementById("edad").value = edad;
}

function eliminar() {
    sessionStorage.clear();
}