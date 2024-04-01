import { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";
import {
  handleIncidentActiveColor,
  handleIncidentIcon,
  handleIncidentText,
  handleIncidentColor,
  handleIncidentActiveText,
  handleIncidentFormatDate,
  handleIncidentImage,
} from "../../../utils";

import { v4 as uuidv4 } from "uuid";
import { addIncident, clearActiveIncident, deleteActiveIncident, setActiveIncident } from "../../../store/Incidents";
import { MarkerType } from "../../../types";

// El tipo de dato que va a recivir mi componente
interface MapProps {
  API_KEY: string;
  isOpenDrawer: boolean;
  toggleDrawer: (type?: "edit") => void;
  editing: boolean
}

export const Map = ({
  API_KEY,
  toggleDrawer,
  isOpenDrawer,
  editing
}: MapProps) => {
  const { loaded: loadedIncidents, markers, active } = useAppSelector(
    // Renombra loaded
    (state) => state.indicents
  );

  const dispatch = useAppDispatch();
  // Aca uso el hook de la api de react-google-maps/api para conectarme
  // de manera automatica a los servicios de google, y cuando se conecte correctamente
  // isLoaded, tendra el valor de true, le paso los valores que necesita para funcionar
  // todo eso y mas en la documentacion:

  // https://web.archive.org/web/20230701010714mp_/https://react-google-maps-api-docs.netlify.app/#section-introduction
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    id: "google-map-script",
  });

  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const handleOnLoad = (map: google.maps.Map) => {
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ coords }) => bounds.extend(coords));

    map.fitBounds(bounds);
  };

  // Funcion que se va a llamar cada vez que se ejecute haga click en el mapa
  const handleOnClickMap = (event: google.maps.MapMouseEvent) => {
    const { latLng } = event;

    if (latLng != null) {
      const lat = latLng?.lat(); // Si existe llame la funcion
      const lng = latLng?.lng();

      // Abre el modal cuando hace click, siempre y cuando no halla un un marker activo y el Form de actualizar este cerrado
      if (!activeMarker) {
        toggleDrawer();
        // LOGICA NECESARIA PARA MOSTRAR EL PUNTERO X DEFAULT CUANDO HACE CLICK EL USUARIO PARA CREAR UN REGISTRO
      }

      if (isOpenDrawer && !active?.created_at && active?.id && !editing) {
        dispatch(deleteActiveIncident())
      }

      // Necesito condicionar, cuando se abre pa editar, pero no se hace nd
      // necesito que limpie eso igualmente
      if (isOpenDrawer && editing) {
        dispatch(clearActiveIncident())
      }

      // Agrega un marker cuando se hace click en el mapa, pero el Drawer
      // se encuentra cerrado, porque si no hago esta condicion
      // se va a agregar un marker cada vez que haga click en el mapa, inclusve
      // cuando solo quiero cerrar el Drawer
      if (!isOpenDrawer && !activeMarker && !active) {
        // Agrega marcador cuando el drawer esta cerrado y no hay ninguna ventana de marcadores abierta
        const uuid = uuidv4();
        console.log("aca")

        const newIncident: MarkerType = {
          id: uuid,
          active: true,
          coords: {
            lat,
            lng,
          },
          incident_type: 0, // Icono por defecto
        };

        dispatch(addIncident(newIncident));
        dispatch(setActiveIncident(newIncident)); // Establece un marcador que contiene la info del ultimo marcador
      }
    }

    setActiveMarker(null);
  };

  const handleOnDoubleClick = (id: string) => {

    const currentIncident = markers?.filter(marker => marker.id === id)[0]

    console.log(currentIncident)

    if (!isOpenDrawer && currentIncident) {
      console.log("llego aca")
      dispatch(setActiveIncident(currentIncident))
      toggleDrawer("edit")
    }

    setActiveMarker(null)
  };

  const handleActiveMarker = (id: string) => {
    setActiveMarker(id);
  };

  return (
    isLoaded &&
    loadedIncidents && (
      <GoogleMap
        onLoad={handleOnLoad}
        onClick={handleOnClickMap}
        mapContainerStyle={{
          width: "100vw",
          height: "calc(100vh - 111px)",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
        }}
      >
        {markers?.map(
          ({ id, coords, incident_type, active, created_at, name }) => (
            <Marker
              key={id}
              position={coords}
              onClick={() => handleActiveMarker(id)}
              onDblClick={() => {
                handleOnDoubleClick(id);
              }}
              icon={{
                url: handleIncidentIcon(incident_type),
                scaledSize: new window.google.maps.Size(35, 35),
              }}
            >
              {activeMarker === id && !isOpenDrawer ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="w-full">
                    <img
                      src={handleIncidentImage(incident_type)}
                      alt="landSlide"
                      className="w-full rounded "
                    />
                    <main className="p-2 flex flex-col">
                      <h1
                        className={`text-base pb-2 font-bold ${handleIncidentColor(
                          incident_type
                        )}`}
                      >
                        {handleIncidentText(incident_type)}
                      </h1>

                      <section className="flex gap-1 flex-col">
                        <header className="flex gap-1">
                          <h3 className="font-semibold">Estado:</h3>
                          <p
                            className={`font-bold ${handleIncidentActiveColor(
                              active
                            )}`}
                          >
                            {handleIncidentActiveText(active)}
                          </p>
                        </header>

                        <div className="font-semibold">
                          <p>{handleIncidentFormatDate(created_at)}</p>
                        </div>

                        <footer>
                          <p className="font-semibold">Creado por: {name}</p>
                        </footer>
                      </section>
                    </main>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          )
        )}
      </GoogleMap>
    )
  );
};
