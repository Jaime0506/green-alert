import { useState } from "react"
import { useAppSelector } from "../../hooks/useStore"

import { Map, DrawerWrapper } from "../components"

const API_KEY = import.meta.env.VITE_API_KEY

export const MapPage = () => {

    const { coords } = useAppSelector(state => state.location)
    const { lat, lng } = coords

    const [isOpenDrawer, setIsOpenDrawer] = useState(false)

    const toggleDrawer = () => {
        setIsOpenDrawer(value =>  !value)
    }

    if (lat === null && lng === null) return <div>Cargando ando</div>

    return (
        <div className="border border-red-500 flex">
            {lat !== null && lng !== null && (
                <Map API_KEY={API_KEY} location={coords as { lat: number, lng: number }} toggleDrawer={toggleDrawer} isOpenDrawer={isOpenDrawer} />
            )}

            <DrawerWrapper isOpenDrawer={isOpenDrawer} toggleDrawer={toggleDrawer}>
                Emote pa todos
            </DrawerWrapper>
        </div>
    )
}
