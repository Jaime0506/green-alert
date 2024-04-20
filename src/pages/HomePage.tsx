import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

import { Container } from '../components'

export const HomePage = () => {

    // Hago uso del hook, useNavigate para poder navegar entre las rutas de mi
    // aplicacion, que defini en mi <AppRouter />
    const navigate = useNavigate()

    const navigateToMap = () => {
        // En este caso creo una funcion, que se va a encargar de usar la funcion
        // de router dom, para navegar hacia /mapa
        navigate('/map')
    }

    // El resto son los estilos y estructura que va a tener esta pagina
    return (
        <Container>
            <section className='pt-12'>
                <article className='text-center flex flex-col items-center h-auto p-20'>
                    <h1 className='text-white borderfont-sans text-[148px]' >GreenAlert</h1>

                    <h3 className='w-[870px] text-center text-gray-400'>
                        Accede a nuestra plataforma especializada en el mapeo de registros ambientales. Desde nuestra página, podrás visualizar de manera clara y detallada los registros que documentan incidentes que afectan al medio ambiente. Nuestra herramienta te brinda la capacidad de explorar diferentes regitros, permitiéndote entender mejor los desafíos ambientales que enfrentamos. Con un enfoque serio en la transparencia y la conciencia ambiental, te invitamos a explorar y comprender la realidad ambiental a través de nuestra plataforma.
                    </h3>

                    <Button className='mt-20' style={{ fontFamily: 'Arial' }} variant='shadow' color='success' onClick={navigateToMap}>
                        Empieza ahora
                    </Button>
                </article>
            </section>
        </Container>

    )
}