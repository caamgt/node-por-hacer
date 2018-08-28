const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    // Covertimos el objeto a un json file.
    let data = JSON.stringify(listadoPorHacer);

    //Lo grabamos en el file system.
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se puedo guardar', err);
    });
}

const cargarDB = () => {
    // Por si el archivo esta vacio.
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    // Para no sobre-escribir todo, si no agregar info.
    cargarDB();
    console.log(cargarDB);
    getListado();
    let porHacer = {
        // descripcion = descripcion, ECMA 7 solo se pone una vez.
        descripcion,
        // false, por las tareas por hacer completas.
        completado: false

    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    // Le estoy diciendo a ajavscript es que me de index o posicion de esta tarea si la descripcion de la tarea coincide. Si no coincide, regresa -1.
    // Valiamos si es igual a la descripcion que me manda la persona.
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        // Despues de editar guardamos
        guardarDB();
        // Para decir que la tarea se hizo correctamente.
        return true;
    } else {
        // Si no lo hizo.
        return false;
    }

}

const borrar = (descripcion) => {
    // Primero cargar la DB para saber que tengo que borrar.
    cargarDB();
    // Usamos la funcion filter() para quitar un elemento en particular del array, y esta funcion regresa un nuevo arreglo.
    // Regresamos cada uno de los elementos que no coincidan con esta condicion.
    // Descripcion que sea diferente a la que estoy recibiendo.
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    // Retornar un "true" si lo borro o un "false" si no lo borro
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar,
}