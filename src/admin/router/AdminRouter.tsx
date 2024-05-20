import { Routes, Route } from "react-router-dom"
import { useAppSelector } from "../../hooks"
import { useEffect } from "react"

export const AdminRouter = () => {

    const { markers } = useAppSelector(state => state.incidents)

    useEffect(() => {
        console.log(markers)
    }, [markers])

    return (
        <Routes>
            <Route path="/" element={<>Texto de prueba</>} />
        </Routes>
    )
}
