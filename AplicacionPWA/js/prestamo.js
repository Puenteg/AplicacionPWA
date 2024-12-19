function guardarDatos() {
    let numControl = document.getElementById("numControl").value;
    let nombreCompleto = document.getElementById("nombreCompleto").value;
    let tituloLibro = document.getElementById("tituloLibro").value;
    let fechaPrestamo = document.getElementById("fechaPrestamo").value;
    let fechaDevolucion = document.getElementById("fechaDevolucion").value;

    localStorage.setItem("numControl", numControl);
    localStorage.setItem("nombreCompleto", nombreCompleto);
    localStorage.setItem("tituloLibro", tituloLibro);
    localStorage.setItem("fechaPrestamo", fechaPrestamo);
    localStorage.setItem("fechaDevolucion", fechaDevolucion);
}

function guardarObjeto() {
    let prestamo = {
        numControl: document.getElementById("numControl").value,
        nombreCompleto: document.getElementById("nombreCompleto").value,
        tituloLibro: document.getElementById("tituloLibro").value,
        fechaPrestamo: document.getElementById("fechaPrestamo").value,
        fechaDevolucion: document.getElementById("fechaDevolucion").value
    };

    sessionStorage.setItem("prestamo", JSON.stringify(prestamo));
}

function recuperarDatos() {
    let numControl = localStorage.getItem("numControl");
    let nombreCompleto = localStorage.getItem("nombreCompleto");
    let tituloLibro = localStorage.getItem("tituloLibro");
    let fechaPrestamo = localStorage.getItem("fechaPrestamo");
    let fechaDevolucion = localStorage.getItem("fechaDevolucion");

    document.getElementById("resultados").innerHTML = `
        <p>Número de Control: ${numControl}</p>
        <p>Nombre Completo: ${nombreCompleto}</p>
        <p>Título del Libro: ${tituloLibro}</p>
        <p>Fecha de Préstamo: ${fechaPrestamo}</p>
        <p>Fecha de Devolución: ${fechaDevolucion}</p>
    `;
}

function recuperarObjeto() {
    let prestamo = JSON.parse(sessionStorage.getItem("prestamo"));

    document.getElementById("resultados").innerHTML = `
        <p>Número de Control: ${prestamo.numControl}</p>
        <p>Nombre Completo: ${prestamo.nombreCompleto}</p>
        <p>Título del Libro: ${prestamo.tituloLibro}</p>
        <p>Fecha de Préstamo: ${prestamo.fechaPrestamo}</p>
        <p>Fecha de Devolución: ${prestamo.fechaDevolucion}</p>
    `;
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
    document.getElementById("resultados").innerHTML = "<p>Datos borrados correctamente</p>";
}
