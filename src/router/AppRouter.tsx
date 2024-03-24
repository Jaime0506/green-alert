import { Route, Routes, useLocation } from 'react-router-dom'
import { AuthRouter } from '../auth/router'
import { HomePage } from '../pages'

import { Navbar } from '../components'
import { MapPage } from '../green-alert/pages'

export const AppRouter = () => {

    // Aca simplemente uso el hook que ofrece router dom, que me dice la localizacion actual
    // en la que se encuentra mi aplicacion, si me encuentro en / o en /auth o /map,
    // esto me permite saber donde me encuentro
    const location = useLocation()

    // Extraigo el pathname que es practicamente la ruta en tipo string, en la que me encueuntro
    const { pathname } = location
    // Aca simplemente uso el metodo includes de los String para saber si este string incluye /auth
    // en caso de ser verdadero significa que estoy en la ruta /auth
    const isAuthRoute = pathname.includes('/auth')

    // Todo lo anterior se encuentra en la documentacion, eso si sigue funcionando igual

    // En este caso hago uso de los componentes, Routes y Route que ofrece
    // la libreria y creo mis rutas, defino 2 rutas raiz y 1 anidad

    // Rutas raiz
    // (/) que es el punto de inicio de mi aplicacion, el home

    // (/map) que va a conter todo lo relacionado con el mapa

    // (/auth/*) que todo lo que venga depues del /auth va a a entrar a esa ruta
    // es decir es una ruta anidada porque puede que tegna /auth/pepe o /auth/login
    // pero no nos importa lo que venga despues del Auth, para eso hago uso del *
    // puede obtener mas info de aqui, la documentacion oficial es un poco diferente
    // porque si bien es la misma version, lo hacen con otros componentes, que son mas nuevos
    // Y ofrecen mas cosas respecto al server side rendering, pero aca no usamos eso, porque no se como XD

    // https://bluuweb.dev/05-react/05-router6.html
    // Aqui hay ejemplos de uso
    return (
        <>
            {/* 
                Aca simplemente con el restulado de la evalucacion de en que ruta me encuentro?, me mostrar el Navbar o no 
                porque en nuestro diseño en firma no estipulamos que se vea el Navbar en la parte de autenticacion
            */}

            { !isAuthRoute && (<Navbar />)}

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/map' element={<MapPage />}/>
                <Route path='/auth/*' element={<AuthRouter />} />
            </Routes>
        </>
    )
}
