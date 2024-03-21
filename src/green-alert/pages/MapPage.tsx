import { useAppSelector } from "../../hooks/useStore"
import { Map } from "../components/map"

const API_KEY = import.meta.env.VITE_API_KEY

export const MapPage = () => {

    const { coords } = useAppSelector(state => state.location)
    const { lat, lng } = coords

    if (lat === null && lng === null) return <div>Cargando ando</div>

    return (
        <>
            {lat !== null && lng !== null && (
                <Map API_KEY={API_KEY} location={coords as { lat: number, lng: number }} />
            )}
        </>
    )
}
