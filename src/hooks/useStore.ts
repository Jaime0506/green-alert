import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux'
import  type { RootState, AppDispatch } from '../store/store'

// Esto es algo de la documentacion de RTk, ya que como estamos usando Typescript,
// debemos definir unos tipos a nuestras propiedades, porq si no da errores raros
// aca puede encontrar mas info: https://redux-toolkit.js.org/tutorials/typescript

// Ahi puede entender un poquito mas de como funciona
export const useAppDispatch: () => AppDispatch = useDispatch // Hace las acciones
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // Trae el estado