import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useState } from "react"

const containerStyles = {
    width: '100%',
    height: 'calc(100vh - 93px)'
}

const center = {
    lat: 4.6365476,
    lng: -74.0652501
}

interface MapProps {
    API_KEY: string,
    location: {
        lat: number,
        lng: number
    }
}

export const Map = ({ API_KEY, location }: MapProps) => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        id: 'google-map-script'
    })

    const [, setMap] = useState<unknown>(undefined)

    const onLoad = useCallback((map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyles}
            center={location}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={(event) => console.log(event.latLng?.lat(), event.latLng?.lng())}
        >
            <Marker position={center}/>
            <Marker position={{ lat: 4.642579, lng: -74.059486}}/>
        </GoogleMap>
    ) : <></>
}
