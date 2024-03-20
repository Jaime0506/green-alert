import { Link } from "react-router-dom"

export const LoginPage = () => {
  return (
    <div>
        <p>Aca me podre logear</p>
        
        <Link to='/auth/register'> ir  a registro</Link>

        <Link to='/'> 
            <strong>Ir al inicio</strong>
        </Link>
    </div>
  )
}
