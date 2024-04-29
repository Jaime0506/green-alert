import { BiSolidLockAlt } from "react-icons/bi"
import { IoMail } from "react-icons/io5"

import type { FormLogin } from "../../types"

interface LoginInputsProps {
    formState: FormLogin
    onChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const LoginInputs = ({ formState, onChangeInputs }: LoginInputsProps) => {
    return (
        <>
            <h1>GreenAlert</h1>

            <div className="input-box">
                <input
                    type="text"
                    placeholder="Correo electronico"
                    required
                    name="email"
                    value={formState.email}
                    onChange={onChangeInputs}
                    aria-label="Correo electronico"
                ></input>
                <IoMail className="icon" />
            </div>

            <div className="input-box">
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    required
                    name="password"
                    value={formState.password}
                    onChange={onChangeInputs}
                    aria-label="Contraseña"
                ></input>
                <BiSolidLockAlt className="icon" />
            </div>
        </>
    )
}
