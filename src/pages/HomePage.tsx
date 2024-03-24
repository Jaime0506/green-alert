import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

// Importo la imagenq que voy a usar de fondo, en este caso el de los arbolitos,
// de recomendacion si va a agregar imagenes, uselas en formado .webp transformela
// los navegadores las cargan mas rapido
import backgroundImage from '../assets/background.webp'

// Mi componente <HomePage /> va a contener todo lo que va a tener mi pagina inicial
// descripccion titulos etc.

// Puede notar que aca no ando importando el Navbar, y eso es porque yo lo importo en el
// AppRouter, es decir todas las rutas a acepccion de la de /auth va tener que renderizar
// ese Navbar (el navbar es la barra superior con las opcciones de navegacion)
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

    // Devuelvase al AppRputer y valla al MapPage
    return (
        <main>
            <div className='bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${backgroundImage})`, width: '100%', minHeight: '100vh' }}>
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
            </div>
        </main>
    )
}

// background: url(<path-to-image>) lightgray -0.096px -2px / 100.013% 108.753% no-repeat;