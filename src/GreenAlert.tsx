import { useEffect } from "react"
import { AppRouter } from "./router/AppRouter"

import { useAppDispatch } from "./hooks/useStore"
import { setCoords } from "./store/location/locationSlice"

const GreenAlert = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                const { latitude, longitude } = position.coords

                dispatch(setCoords({ lat: latitude, lng: longitude }))
            }, (error) => {
                console.log(error)
            })
        } else {
            console.log("La api de geolocation no esta soportada en este navegador")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AppRouter />
    )
}

export default GreenAlert
