interface MarkerType {
    active: boolean
    created_at?: Date
    id: string
    incident_type: number
    name?: string

    coords: {
        lat: number,
        lng: number
    }
}

interface FormIncident {
    name: string
    incident_type: number
}

interface IncidentType {
    id: number,
    name: string
}

export type { MarkerType, FormIncident, IncidentType }