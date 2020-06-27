const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Error al guardar: ', err);
    });
};

const cargarDB = () => {

    try {
        return listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

};

const getListado = () => {
    try {
        return cargarDB();
    } catch (error) {
        return console.log('No se pudo cargar el listado');
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    const nuevoLlistado = cargarDB().filter(tarea => tarea.descripcion !== descripcion);
    if (nuevoLlistado.length === listadoPorHacer.length) {
        console.log('No se pudo borrar la tarea', error);
        return false;
    } else {
        listadoPorHacer = nuevoLlistado;
        guardarDB();
        return true;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}