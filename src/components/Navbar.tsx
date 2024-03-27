import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div className="bg-white flex p-6 px-16 items-center">
            <header className="flex-1">
                <Link to='/' >
                    <h1 className="font-bold text-[30px] inline-block pr-6">LOGO</h1>
                </Link>
            </header>

            <section className="text-xl">
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <Link to="/map">Mapa</Link>
                        </li>
                        <li>
                            <Link to="/auth/login">Inicia sesion</Link>
                        </li>
                        <li>
                            <Link to="/auth/register">Registrate</Link>
                        </li>
                    </ul>
                </nav>
            </section>
        </div>
    )
}
