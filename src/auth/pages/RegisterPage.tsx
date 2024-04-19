import { Link } from "react-router-dom";

import { BiSolidLockAlt, BiSolidUser } from "react-icons/bi";
import { IoMail } from "react-icons/io5";

import "../styles/AuthStyles.css";

export const RegisterPage = () => {
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login Enviado");
    };

    return (
        <main className="container">
            <div className="wrapper">
                <form action="submit" onSubmit={handleOnSubmit}>
                    <h1>GreenAlert</h1>

                    <div className="input-box">
                        <input type="text" placeholder="Nombre de Usuario" required></input>
                        <BiSolidUser className="icon" />
                    </div>

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

                    <button type="submit">Registrarme</button>

                    <div className="register-link">
                        <p>
                            ¿Ya tienes una cuenta?{" "}
                            <Link className="a" to="/auth/login">
                                Iniciar ahora
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
};