import ReactDOM from 'react-dom/client'

import GreenAlert from './GreenAlert.tsx'

import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'


//  Arranque de la aplicacion,
// Eso del getElement root, etc. es de react, es lo basico que
// necesita react para funcionar

// El BrowserRouter viene de la libreria React router dom
// y permite darle el contexto de rutas en la aplicacion, se encarga 

// El provider viene de React redux toolkit, que es el que se encarga
// de proveer mi estado global de la aplicacion, es decir
// Todo componente hijo, que su padre este envuelto en el Provider,
// tendra acceso a las funciones y estado dele estado global

// En este caso todos los hijos del componente <GreenAlert />

// El provider tiene la prop store y le paso el store que cree
// para mi aplicacion, en la carpeta de store/store.ts

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <GreenAlert />
        </Provider>
    </BrowserRouter>
)
