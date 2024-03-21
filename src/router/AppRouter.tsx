import { Route, Routes, useLocation } from 'react-router-dom'
import { AuthRouter } from '../auth/router'
import { HomePage } from '../pages'

import { Navbar } from '../components'
import { MapPage } from '../green-alert/pages'

export const AppRouter = () => {

    const location = useLocation()
    const { pathname } = location

    const isAuthRoute = pathname.includes('/auth')

    return (
        <>
            { !isAuthRoute && (<Navbar />)}

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/mapa' element={<MapPage />}/>
                <Route path='/auth/*' element={<AuthRouter />} />
            </Routes>
        </>
    )
}
