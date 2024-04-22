import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";

import {
  Map,
  DrawerWrapper,
  Form,
} from "../components";
import { fetchDataIncidentTypes, fetchDataIncidents } from "../../store/incidents";

// Esta es la manera en la que puedo llamar las variables de entorno
// definidar en el archivo .env

// Para que vite las reconozca debe tener como nombre inicial VITE seguido de
// los que se nos de la gana, VITE_CONTRASEÑA_PUERTA
// tratar de tener esa estrucura de todo en mayuscula y usar _ para separar
const API_KEY = import.meta.env.VITE_API_KEY;

export const MapPage = () => {
  // El useAppSelector, es el un hook, que se encarga de traerme mi estado global
  // el hook viene de RTK, y como solo tengo el estado location, simplemnte traigo lo que contega
  // dicho estado
  const { coords } = useAppSelector((state) => state.location);

  const dispatch = useAppDispatch();

  // en este caso de mi estado location unicamente tiene la propiedad coords
  // la cual es un objeto que contiene la lat, lng del usuario, (que se guardo cuando se
  // monto por primera vez mi aplicacion con el useEffect, que explique anteriormente)
  const { lat, lng } = coords;

  // Y este es simplemente un estado para controlar si se encuentra abierto el Drawer o no
  // y pues para abrirlo o cerralo
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [editing, setEditing] = useState(false)

  // Esta funcion se encarga de controlar si se abre o se cierra el Drawer,
  // por eso uso !value, porque si esta en true (abiert) lo cambio a false y si
  // se llama esta funcion cuando value es false entonces la cambia a true, por esto tambien el
  // nombre de la funcion toggle, palanca como la de una switche
  const toggleDrawer = (type?: "edit") => {
    if (type == "edit") {
      setEditing(true)
    } else {
      setEditing(false)
    }

    setIsOpenDrawer((value) => !value);
  };

  // Cuando se monte el componente va a cargar en el estado global
  // mediante mi thunk
  useEffect(() => {
    dispatch(fetchDataIncidents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cuando se monte el componente va a cargar los tipos de incidente que existen en la base de datos
  useEffect(() => {
    dispatch(fetchDataIncidentTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Aca simplemente va a mostrar un Cargando Ando mientras se carga los datos, porque puede que tarde mas de lo esperado
  // entonces se va a mostrar esto mientras, cuando ya se tengan los datos, react
  // se encarga de re cargar este componente y todos lo que dependan de estos valores
  // y efectivamente va mostrar lo que esta en el otro return
  if (lat === null && lng === null) return <div>Cargando ando</div>;

  return (
    <div className="border-t border-green-500 flex p-2">

      {lat !== null && lng !== null && (
        <Map
          API_KEY={API_KEY}
          toggleDrawer={toggleDrawer}
          isOpenDrawer={isOpenDrawer}
          editing={editing}
        />
      )}

      <DrawerWrapper isOpenDrawer={isOpenDrawer}>
        <Form toggleDrawer={toggleDrawer} editing={editing} />
      </DrawerWrapper>
    </div>
  );
};
