import { Link } from "react-router-dom";
import { BiSolidLockAlt } from "react-icons/bi";
import { IoMail } from "react-icons/io5";

import "../styles/AuthStyles.css";

export const LoginPage = () => {
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login Enviado");
    };

    return (
        <main className="container w-full">
            <div className="wrapper">
                <form action="submit" onSubmit={handleOnSubmit}>
                    <h1>GreenAlert</h1>

                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Correo electronico"
                            required
                        ></input>
                        <IoMail className="icon" />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Contraseña" required></input>
                        <BiSolidLockAlt className="icon" />
                    </div>

                    <button type="submit">Iniciar sesion</button>

                    <div className="register-link">
                        <p>
                            ¿No tienes una cuenta?{" "}
                            <Link className="a" to="/auth/register">
                                Registrarme
                            </Link>
                            <br></br>
                            <Link className="a" to="/" style={{ color: "#fff" }}>
                                Ir al inicio
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
};