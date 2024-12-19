const form = document.querySelector("#prestamos-form");
const table = document.querySelector("#prestamos-lista tbody");
let listaDatos = [];

let editando = false;
let idEdicion = null;

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
}

const nuevoId = () => {
    let ultimoRegistro = listaDatos[listaDatos.length - 1];
    if (ultimoRegistro) {
        return ultimoRegistro.id + 1;
    } else {
        return 1;
    }
}

form.onsubmit = (evento) => {
    evento.preventDefault();
    let fd = new FormData(form);
    let datos = Object.fromEntries(fd.entries());
    let tipoOperacion = form.dataset.type;
    if (tipoOperacion === "add") {
        datos.id = nuevoId();
        datos.enviado = false;
        //guardarEstudiante(datos, generarTabla);
        registrarTareaSync(datos);
    } else {
        datos.id = parseInt(form.dataset.id);
        editarPrestamo(datos, generarTabla);
    }
    form.reset();
}

const registrarTareaSync = (datos) => {
    guardarPrestamo(datos, () => {
        generarTabla();
        
        if ('SyncManager' in window) {
            navigator.serviceWorker.ready.then((swRegistrado) => {
                return swRegistrado.sync.register('sync-info-prestamos');
            });
        }
        if (Notification.permission === "granted") {
            const notification = new Notification("¡Registro Creado!", {
                body: "Se ha registrado un nuevo prestamo."
            });
        }
    });
};

const generarFila = ({ id, numControl, nombreCompleto, tituloLibro, fechaPrestamo, fechaDevolucion, enviado }) => {
    let tr = document.createElement('tr');

    // Numero de control
    let td = document.createElement('td');
    td.textContent = numControl;
    tr.appendChild(td);

    // Nombre
    td = document.createElement('td');
    td.textContent = nombreCompleto;
    tr.appendChild(td);

    // Libro
    td = document.createElement('td');
    td.textContent = tituloLibro;
    tr.appendChild(td);

    // Fecha de prestamo
    td = document.createElement('td');
    td.textContent = fechaPrestamo;
    tr.appendChild(td);

    // Fecha de devolución
    td = document.createElement('td');
    td.textContent = fechaDevolucion;
    tr.appendChild(td);

    // Enviado
    td = document.createElement('td');
    td.textContent = enviado ? 'SI' : 'NO';
    tr.appendChild(td);

    // Acciones
    td = document.createElement('td');
    let btn = document.createElement('button');
    btn.textContent = 'Editar';
    btn.className = 'btn btn-info';
    btn.onclick = () => editarRegistro(id);
    //btn.onclick = () => { 
/*         var valoresFormulario;
        listarPorId(id, ({ id, numControl, nombreCompleto, tituloLibro, fechaPrestamo, fechaDevolucion }) => {
            valoresFormulario = {
                id, numControl, nombreCompleto, tituloLibro, fechaPrestamo, fechaDevolucion 
            }
        }); */
        /* window.location.href = './../editar.html'; */
        //editarElementos();
    //}
    td.appendChild(btn);
    tr.appendChild(td);

    td = document.createElement('td');
    btn = document.createElement('button');
    btn.textContent = 'Eliminar';
    btn.className = 'btn btn-danger';
    btn.onclick = () => {
        eliminarPrestamo(id, generarTabla);
    };
    td.appendChild(btn);
    tr.appendChild(td);

    return tr;
};


var editarElementos = () => {
    //window.location.href = './../editar.html';
    //editarRegistro(id);
}
const generarTabla = () => {
    listarPrestamos((datos) => {
        listaDatos = datos;
        table.innerHTML = '';
        datos.forEach((registro) => {
            table.appendChild(generarFila(registro));
        });
    });
    form.dataset.type = 'add';
    form.querySelector('button[type="submit"]').textContent = 'Guardar';
};

const editarRegistro = (id) => {
    //window.location.href = './../editar.html';
    listarPorId(id, ({ id, numControl, nombreCompleto, tituloLibro, fechaPrestamo, fechaDevolucion }) => {
        form.querySelector("#numControl").value = numControl;
        form.querySelector("#nombreCompleto").value = nombreCompleto;
        form.querySelector("#tituloLibro").value = tituloLibro;
        form.querySelector("#fechaPrestamo").value = fechaPrestamo;
        form.querySelector("#fechaDevolucion").value = fechaDevolucion;
        form.dataset.id = id;
        form.dataset.type = "update";
        form.querySelector("button").textContent = "Actualizar";
    });
}

// Función para limpiar el formulario y reiniciar edición
const resetFormulario = () => {
    form.reset();
    editando = false;
    idEdicion = null;
    document.querySelector(".btn-primary").textContent = "Guardar";
};

abrirBd(generarTabla);

const canal = new BroadcastChannel('sw-messages');
canal.addEventListener('message', (e) => {
    generarTabla();
});
