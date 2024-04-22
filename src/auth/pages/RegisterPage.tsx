import { Link } from "react-router-dom";

import { useAppDispatch, useFormValues } from "../../hooks";

import { Container } from "../../components";
import { RegisterInputs } from "../components";

import type { FormRegister } from "../../types";

import "../styles/AuthStyles.css";
import { onRegisterUser } from "../../store/auth";

const initialStateForm: FormRegister = {
    name: "",
    email: "",
    password: "",
}

export const RegisterPage = () => {

    const dispatch = useAppDispatch()
    const { formState, onChangeInputs } = useFormValues({ initialStateForm })

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("LLEGE")

        dispatch(onRegisterUser(formState))
    };

    return (
        <Container className="flex items-center justify-center">
            <section className="wrapper">
                <form action="submit" onSubmit={handleOnSubmit}>

                    <RegisterInputs
                        formState={formState}
                        onChangeInputs={onChangeInputs}
                    />

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
            </section>
        </Container>
    );
};