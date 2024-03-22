import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useState } from "react"

const containerStyles = {
    width: '100%',
    height: 'calc(100vh - 93px)'
}

// const center = {
//     lat: 4.6365476,
//     lng: -74.0652501
// }

interface MapProps {
    API_KEY: string
    isOpenDrawer: boolean
    toggleDrawer: () => void
    location: {
        lat: number,
        lng: number
    }
}

interface MarkerType {
    coords: {
        lat: number,
        lng: number
    }
}

export const Map = ({ API_KEY, location, toggleDrawer, isOpenDrawer }: MapProps) => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        id: 'google-map-script'
    })

    const [, setMap] = useState<unknown>(undefined)
    const [markers, setMarkers] = useState<MarkerType[]>([
        {
            coords: {
                lat: location.lat,
                lng: location.lng
            }
        }
    ])

    // const onLoad = useCallback((map: google.maps.Map) => {
    //     // const bounds = new window.google.maps.LatLngBounds(center);
    //     // map.fitBounds(bounds);

    //     // setMap(map)
    // }, [])

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const addMarker = (lat: number, lng: number) => {
        setMarkers([...markers, {
            coords: {
                lat,
                lng
            }
        }])
    }

    const handleOnClickMap = (event: google.maps.MapMouseEvent) => {
        const { latLng } = event

        if (latLng != null) {
            const lat = latLng?.lat()
            const lng = latLng?.lng()

            toggleDrawer()
    
            if (!isOpenDrawer) addMarker(lat, lng) 
        }
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyles}
            center={{ lat: location.lat, lng: location.lng }}
            zoom={15}
            // onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleOnClickMap}
        >
            {markers.map((item) => (
                <Marker position={item.coords} />
            ))}
            {/* <Marker position={center} 
                icon={{
                url: UserIcon,
                scaledSize: new window.google.maps.Size(25, 25)
            }} /> */}

        </GoogleMap>
    ) : <></>
}
