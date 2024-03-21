import React from 'react'
import ReactDOM from 'react-dom/client'

import GreenAlert from './GreenAlert.tsx'

import './index.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <GreenAlert />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
