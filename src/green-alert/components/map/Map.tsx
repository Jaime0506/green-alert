import { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useAppDispatch, useAppSelector } from "../../../hooks/useStore";

import {
  addIncident,
  cancelActiveIncident,
  clearActiveIncident,
  deleteActiveIncident,
  setActiveIncident,
} from "../../../store/incidents";
import { newIncident } from "../../../utils/newIncident";
import { InfoWindowContent } from "./";

import { handleIncidentIcon } from "../../../utils";
import type { MarkerType } from "../../../types";

interface MapProps {
  API_KEY: string;
  isOpenDrawer: boolean;
  toggleDrawer: (type?: "edit") => void;
  editing: boolean;
  onClick: (marker: MarkerType) => void;
}

export const Map = (props: MapProps) => {
  const { status } = useAppSelector((state) => state.auth);

  const { API_KEY, editing, isOpenDrawer, toggleDrawer, onClick } = props;

  const {
    loaded: loadedIncidents,
    markers,
    active,
  } = useAppSelector((state) => state.incidents);
  const dispatch = useAppDispatch();

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

  const handleOnClickMap = (event: google.maps.MapMouseEvent) => {
    if (status === "authenticated") {
      const { latLng } = event;

      if (latLng != null) {
        const lat = latLng?.lat();
        const lng = latLng?.lng();

        if (!activeMarker) toggleDrawer();

        const shouldCancelActiveIncident =
          isOpenDrawer &&
          !active?.created_at &&
          active?.id.length > 0 &&
          !editing;

        if (shouldCancelActiveIncident) {
          dispatch(cancelActiveIncident(active));
          dispatch(deleteActiveIncident());
          dispatch(clearActiveIncident());
        }

        if (isOpenDrawer && editing) dispatch(clearActiveIncident());

        const isDrawerClosed = !isOpenDrawer;
        const noActiveMarker = !activeMarker;
        const isEmptyActiveId = !(active.id.length > 0);
        const shouldCreateIncident =
          isDrawerClosed && noActiveMarker && isEmptyActiveId;

        if (shouldCreateIncident) {
          const incident = newIncident(lat, lng);

          dispatch(addIncident(incident));
          dispatch(setActiveIncident(incident)); // Establece un marcador que contiene la info del ultimo marcador
        }
      }

      setActiveMarker(null);
    }
    setActiveMarker(null);
  };

  const handleOnDoubleClick = (id: string) => {
    if (status === "authenticated") {
      const currentIncident = markers?.filter((marker) => marker.id === id)[0];

      if (!isOpenDrawer && currentIncident) {
        dispatch(setActiveIncident({ ...currentIncident }));
        toggleDrawer("edit");
      }

      setActiveMarker(null);
    }
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
        {markers?.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.coords}
            onClick={() => handleActiveMarker(marker.id)}
            onDblClick={() => {
              handleOnDoubleClick(marker.id);
            }}
            icon={{
              url: handleIncidentIcon(marker.incident_type),
              scaledSize: new window.google.maps.Size(35, 35),
            }}
          >
            {activeMarker === marker.id && !isOpenDrawer ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <InfoWindowContent marker={marker} onClick={onClick} />
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    )
  );
};
