import { v4 as uuidv4} from 'uuid'

import type { MarkerType } from "../types";

export const newIncident = (lat: number, lng: number):MarkerType => {
    const incident: MarkerType = {
        id: uuidv4(),
        active: true,
        coords: {
            lat,
            lng
        },
        incident_type: 0,
        images: []
    }
    
    return incident
}