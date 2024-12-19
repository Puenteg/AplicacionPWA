let baseDatos = indexedDB.open("prestamosDrp", 1);
const almacen = "almacenDrp";
let db = null;

const abrirBd = (callback = null) => {
    baseDatos.onsuccess = (e) => {
        console.log('Base de datos creada');
        db = e.target.result;
        if (callback) callback();
    };
    baseDatos.onupgradeneeded = (e) => {
        console.log('Base de datos actualizada');
        db = e.target.result;
        db.createObjectStore(almacen, { keyPath: 'id' });
    };
};

baseDatos.onsuccess = (evento) => {
    console.log("Base de datos creada");
    db = evento.target.result;
}
baseDatos.onupgradeneeded = (evento) => {
    console.log("DB actualizada");
    db = evento.target.result;
    db.createObjectStore(almacen, { keyPath: "id" });
}

const obtenerAlmacen = (tipoTransaccion) => {
    let transaccion = db.transaction(almacen, tipoTransaccion);
    return transaccion.objectStore(almacen);
}
const guardarPrestamo = (prestamo, onsuccess = null) => {
    let almacen = obtenerAlmacen("readwrite");
    let guardar = almacen.add(prestamo);
    guardar.onsuccess = onsuccess;
}
const listarPrestamos = (onsuccess = null) => {
    let almacen = obtenerAlmacen('readonly');
    let respuesta = almacen.getAll();
    respuesta.onsuccess = (evento) => {
        let lista = evento.target.result;
        if (onsuccess) onsuccess(lista);
    };
};
const listarPorId = (id, onsuccess = null) => {
    let almacen = obtenerAlmacen("readonly");
    let respuesta = almacen.get(id);
    respuesta.onsuccess = (e) => {
        let registro = e.target.result;
        if (onsuccess) onsuccess(registro);
    }
}
const editarPrestamo = (prestamoActualizado, onsuccess = null) => {
    let almacen = obtenerAlmacen("readwrite");
    let respuesta = almacen.put(prestamoActualizado);
    respuesta.onsuccess = onsuccess;
}
const eliminarPrestamo = (id, onsuccess = null) => {
    let almacen = obtenerAlmacen("readwrite");
    let respuesta = almacen.delete(id);
    respuesta.onsuccess = onsuccess;
}