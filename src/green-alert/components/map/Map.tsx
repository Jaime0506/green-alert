import { useState } from "react"
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api"

import { useAppSelector } from "../../../hooks/useStore"

import MarkerFire from '../../../assets/icons/fire.svg'
import Rain from '../../../assets/icons/rain.svg'
import LandSlide from '../../../assets/icons/landslide.svg'
import defaultIcon from '../../../assets/icons/default.png'

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

export const Map = ({ API_KEY, toggleDrawer, isOpenDrawer }: MapProps) => {

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
    
    const [activeMarker, setActiveMarker] = useState<string | null>(null)

    const handleOnLoad = (map: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds()
        markers?.forEach(({ coords }) => bounds.extend(coords))

        map.fitBounds(bounds)
    }

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

        setActiveMarker(null)
    }

    const handleActiveMarker = (id: string) => {
        setActiveMarker(id)
    }

    const handleIcon = (typeIncident: number): string => {
        if (typeIncident == 1) return MarkerFire 

        if (typeIncident == 2) return LandSlide

        if (typeIncident == 3)  return Rain

        return defaultIcon
    }

    const handleIncidentType = (typeIncident: number): string => {
        if (typeIncident == 1) return "Incendio"

        if (typeIncident == 2) return "Deslizamiento de tierras"

        if (typeIncident == 3)  return "Fuertes lluvias"

        return ""
    }

    return (isLoaded && loadedIncidents) && (
        <GoogleMap
            onLoad={handleOnLoad}
            onClick={handleOnClickMap}
            mapContainerStyle={{ width: "100vw", height: "calc(100vh - 93px)" }}
        >
            {markers?.map(({ id, coords, incident_type }) => (
                <Marker
                    key={id}
                    position={coords}
                    onClick={() => handleActiveMarker(id)}
                    icon={{
                        url: handleIcon(incident_type),
                        scaledSize: new window.google.maps.Size(30, 30)
                    }}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <main className="p-2 flex flex-col">
                                <h1 className={`text-base pb-4 text-green-600 font-bold ${incident_type === 1 && 'text-red-600'} ${incident_type === 2 && 'text-amber-700'} ${incident_type === 3 && 'text-blue-400'}`}>
                                    {handleIncidentType(incident_type)}
                                </h1>
                                <p>El que lea esto es gay, pero mega gay</p>
                            </main>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    )
}
