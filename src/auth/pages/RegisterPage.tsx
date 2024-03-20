import { Link } from "react-router-dom"

export const RegisterPage = () => {
    return (
        <div>
            <p>Aca me voy a registrar</p>

            <Link to='/auth/login' >Ir al login</Link>
        </div>
    )
}
