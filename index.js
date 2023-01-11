const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');
require('dotenv').config()


const main = async () => {
    const busquedas = new Busquedas()

    let opt
    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                const busquedaCiudad = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(busquedaCiudad);
                const idSeleccionado = await listarLugares(lugares);
                if (idSeleccionado === '0') continue;

                const lugarSel = await lugares.find(l => l.id === idSeleccionado);

                busquedas.agregarHistorial(lugarSel.nombre)
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)

                console.clear();
                console.log(`\n Información de la ciudad\n`.green);
                console.log(`Ciudad: ${lugarSel.nombre}`);
                console.log(`Lat: ${lugarSel.lat}`);
                console.log(`Lng: ${lugarSel.lng}`);
                console.log(`Temperaturas: ${clima.temp}`);
                console.log(`Minima: ${clima.min} `);
                console.log(`Maxima: ${clima.max}`);
                console.log(`Como esta el clima: ${clima.desc}`);

                break;
            case 2:
                busquedas.historialCapitalizado.forEach((l, i) => {
                    const idx = `${i + 1}`.green
                    console.log(`${idx} ${l}`);
                })
                break;
            case 0:

                break;

            default:
                break;
        }
        await pausa()
    } while (opt != 0);
}



main()