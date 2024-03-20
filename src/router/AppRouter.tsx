import { Route, Routes } from 'react-router-dom'
import { AuthRouter } from '../auth/router/AuthRouter'
import { HomePage } from '../pages'

import { Navbar } from '../components'

export const AppRouter = () => {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/mapa' element={<>Aca debe ir el mapa</>}/>
                <Route path='/auth/*' element={<AuthRouter />} />
            </Routes>
        </>
    )
}
