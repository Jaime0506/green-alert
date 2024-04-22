import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthRouter } from '../auth/router'
import { HomePage } from '../pages'

import { Loading, Navbar } from '../components'
import { MapPage } from '../green-alert/pages'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'
import { onGetUser } from '../store/auth'

export const AppRouter = () => {

    const { status } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    // Aca simplemente uso el hook que ofrece router dom, que me dice la localizacion actual
    // en la que se encuentra mi aplicacion, si me encuentro en / o en /auth o /map,
    // esto me permite saber donde me encuentro
    const location = useLocation()

    // Extraigo el pathname que es practicamente la ruta en tipo string, en la que me encueuntro
    const { pathname } = location
    // Aca simplemente uso el metodo includes de los String para saber si este string incluye /auth
    // en caso de ser verdadero significa que estoy en la ruta /auth
    const isAuthRoute = pathname.includes('/auth')

    useEffect(() => {
        dispatch(onGetUser())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (status === "checking")  return <Loading />

    return (
        <>
            {!isAuthRoute && (<Navbar />)}

            <Routes>
                {
                    status === "not-authenticated" ? (
                        <>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/map' element={<MapPage />} />
                            <Route path='/auth/*' element={<AuthRouter />} />
                        </>
                    ) : (
                        <>
                            <Route path='/map' element={<MapPage />} />
                            <Route path='/*' element={<Navigate to="/map" />} />
                        </>
                    )
                }

                <Route path='/*' element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}
