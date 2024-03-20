import React from 'react'
import ReactDOM from 'react-dom/client'

import GreenAlert from './GreenAlert.tsx'

import './index.css'

import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <GreenAlert />
        </BrowserRouter>
    </React.StrictMode>
)
