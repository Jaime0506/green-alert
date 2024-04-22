import { BiSolidLockAlt, BiSolidUser } from "react-icons/bi"
import { IoMail } from "react-icons/io5"
import type { FormRegister } from "../../types"
import React from "react"

interface RegisterInputsProps {
    formState: FormRegister
    onChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const RegisterInputs = ({ formState, onChangeInputs }: RegisterInputsProps) => {
    return (
        <>
            <h1>GreenAlert</h1>

            <div className="input-box">
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    required
                    name="name"
                    onChange={onChangeInputs}
                    value={formState.name}
                ></input>
                <BiSolidUser className="icon" />
            </div>

            <div className="input-box">
                <input
                    type="text"
                    placeholder="Correo electronico"
                    required
                    name="email"
                    onChange={onChangeInputs}
                    value={formState.email}
                ></input>
                <IoMail className="icon" />
            </div>

            <div className="input-box">
                <input
                    type="password"
                    placeholder="Contraseña"
                    required
                    name="password"
                    onChange={onChangeInputs}
                    value={formState.password}
                ></input>
                <BiSolidLockAlt className="icon" />
            </div>
        </>
    )
}
