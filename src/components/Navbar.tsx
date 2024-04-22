import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { Button } from "@nextui-org/react"
import { onLogoutUser } from "../store/auth"

export const Navbar = () => {

    const { status } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleOnClick = () => {
        dispatch(onLogoutUser())
        navigate("/")
    }

    return (
        <div className="bg-white flex p-6 px-16 items-center">
            <header className="flex-1">
                <Link to='/' >
                    <h1 className="font-bold text-[30px] inline-block pr-6">LOGO</h1>
                </Link>
            </header>

            <section className="text-xl">
                <nav>
                    <ul className="flex gap-6 items-center">
                        <li>
                            <Link to="/map">Mapa</Link>
                        </li>

                        {status === "authenticated" ? (
                            <li>
                                <Button
                                    onClick={handleOnClick}
                                    color="danger"
                                >
                                    Cerrar sesion
                                </Button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/auth/login">Inicia sesion</Link>
                                </li>
                                <li>
                                    <Link to="/auth/register">Registrate</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </section>
        </div>
    )
}
