import { useEffect } from "react"
import { AppRouter } from "./router/AppRouter"

import { useAppDispatch } from "./hooks/useStore"
import { setCoords } from "./store/location/locationSlice"

// Mi componente GreenAlert es mi punto de partida de mi aplicacion
// todos los componentes hijos, tendran en ultima instancia este componente
// como padre

const GreenAlert = () => {

    // el Hook, useDispatch es de Redux tool kit (RTK para simplificar)
    // y es el que me permite disparar las acciones que defini en mi slice
    // del store

    // El slice lo defino despues cuando llegue a esa parte
    const dispatch = useAppDispatch()

    // El useEffect hace que se ejecute lo que este dentro de este
    // cuando se carga el componente, por primera vez unicamente, cada que se monte
    // o cada vez que cambie un estado en especifico

    // En este caso quiero que se ejecute unicamente una vez cuando se monta el componente
    // la logica que tiene adentro se ejectura
    useEffect(() => {
        // Practicamente lo que hace aca es:

        // 1. Preguntar si existe la api de geolocalizacion que traer los navegadores
        // (la mayoria de navegadores modernos)
        if (navigator.geolocation) {

            // 2. Si efectivamente existe esta Api, entonces uso su metodo para obtener la posicion actual
            // obviamente en este isntante el usuario debe dar acceso a la ubicacion

            // la funcion recive una funcion para cado caso, caso de exito, o caso de error
            // Obtengo lo que me retorna la funcion  (position: GelocationPosition), ese Geolocation..
            // Es el tipo de dato que deberia retornarme la funcion, y asi vez le paso la funcion que quiero que ejecute
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                
                // 3. Cuando llega aca, significa que efectivamente pudo obtener la geolocalizacion
                // del usuario, entonces simplemente destructuro los datos que me interesan
                // que retorna la Api

                // (Puede mirar lo que viene de la api usando un) console.log(position)
                // Para no ponerse a buscar documentacion
                const { latitude, longitude } = position.coords

                // Y Aca simplemente uso del dispatch de RTK para guardar en forma de objeto,
                // la lat y lng, (un objeto en javascript no es el mismo concepto que en Java, si algo
                // investigue objetos en javascript, pero si es muy parecido)
                dispatch(setCoords({ lat: latitude, lng: longitude }))
            }, (error) => {
                // En caso de que ocurra un error, al tratar de obtener la ubicacion
                // Como que el usuario no de permisos, entrara aca el codigo
                console.log(error)
            })
        } else {
            // En caso de que no encuentre la Api en el navegador
            console.log("La api de geolocation no esta soportada en este navegador")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        // El siguiente punto imporante es el AppRouter, Que es el que se va a ancargar
        // de manejar y gestionar las rutas de mi aplicacion, gracias a la libreria react router dom
        <AppRouter />
    )
}

// Yo tengo la mañana de exportar como default el punto de arranque de mi aplicacion
// el resto los exporto de la manera normal

// export const NombreComponente ...

export default GreenAlert
