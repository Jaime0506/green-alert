import { useCallback, useState } from "react"
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

import type { MarkerType } from '../../../types'
import { useAppSelector } from "../../../hooks/useStore"

// Este son los estilos del contenedor de mi mapa
const containerStyles = {
    width: '100%',
    height: 'calc(100vh - 93px)'
}

// El tipo de dato que va a recivir mi componente
interface MapProps {
    API_KEY: string
    isOpenDrawer: boolean
    toggleDrawer: () => void
    location: {
        lat: number,
        lng: number
    }
}

export const Map = ({ API_KEY, location, toggleDrawer, isOpenDrawer }: MapProps) => {

    const { loaded: loadedIncidents, markers } = useAppSelector(state => state.indicents)

    // Aca uso el hook de la api de react-google-maps/api para conectarme
    // de manera automatica a los servicios de google, y cuando se conecte correctamente
    // isLoaded, tendra el valor de true, le paso los valores que necesita para funcionar
    // todo eso y mas en la documentacion: 

    // https://web.archive.org/web/20230701010714mp_/https://react-google-maps-api-docs.netlify.app/#section-introduction
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        id: 'google-map-script'
    })

    // Aca simplemnte defino el estado que necesita la api de maps, para funcionar, tiene
    // el tipo unknown porque si le defino un tipo desde el inicio debo darle esos valores inciales
    // de una vez y se presta pa problemas
    const [, setMap] = useState<unknown>(undefined)

    // Aca defino un estado que va a ser un Array que va a conterner elementos
    // del tipo MarkerType que lo defini al inicio, y le doy un item y valor inicial
    // que es el de la ubicacion actual, que la recibo a traves de los props

    // uso de la prop onUnmount, que practicamente se va a ajecutar cuando se desmonte este componente
    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    // Funcion que se va a llamar cada vez que se ejecute haga click en el mapa
    const handleOnClickMap = (event: google.maps.MapMouseEvent) => {
        const { latLng } = event

        if (latLng != null) {
            const lat = latLng?.lat()
            const lng = latLng?.lng()

            // Abre el modal cuando hace click
            toggleDrawer()

            // Agrega un marker cuando se hace click en el mapa, pero el Drawer
            // se encuentra cerrado, porque si no hago esta condicion
            // se va a agregar un marker cada vez que haga click en el mapa, inclusve
            // cuando solo quiero cerrar el Drawer
            if (!isOpenDrawer) console.log(lat, lng)
        }
    }

    // Si ya se cargo la conexion con google, se muestra el mapa, si no, no se muestra nada
    // mientras se termina de cargar

    return isLoaded && loadedIncidents ? (
        <GoogleMap
            mapContainerStyle={containerStyles}
            center={{ lat: location.lat, lng: location.lng }}
            zoom={15}
            // onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleOnClickMap}
        >
            {/* 
                Esto va a renderizar un marcador, por cada marcador existente en mi estado global del store 
                aca puede encontrar mas info de como funciona el .map: https://mauriciogc.medium.com/react-map-filter-y-reduce-54777359d94
            */}
            {markers?.map((item: MarkerType) => {
                if (item.coords) return <Marker key={item.id} position={item.coords} />
            })}

            {/* Forma para que se muestre con un icono personalizado */}

            {/* <Marker position={center} 
                icon={{
                url: UserIcon,
                scaledSize: new window.google.maps.Size(25, 25)
            }} /> */}
        </GoogleMap>
    ) : <></>
}
