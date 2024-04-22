import { Link } from "react-router-dom";

import { Container } from "../../components";

import "../styles/AuthStyles.css";
import { useAppDispatch, useFormValues } from "../../hooks";
import { FormLogin } from "../../types";
import { LoginInputs } from "../components";
import { onLoginUser } from "../../store/auth";

const initialStateForm: FormLogin = {
    email: "",
    password: ""
}

export const LoginPage = () => {

    const dispatch = useAppDispatch()
    const { formState, onChangeInputs } = useFormValues({ initialStateForm })

    const handleOnSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(onLoginUser(formState))
    };

    return (
        <Container className="flex items-center justify-center">
            <section className="wrapper" >
                <form action="submit" onSubmit={handleOnSubmit}>
                    
                    <LoginInputs 
                        formState={formState}
                        onChangeInputs={onChangeInputs}
                    />

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
            </section>
        </Container>
    );
};