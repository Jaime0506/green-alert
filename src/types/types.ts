interface MarkerType {
    active: true
    created_at?: Date
    id: string
    incident_type: number
    name?: string

    coords: {
        lat: number,
        lng: number
    }
}

interface MarkerTypeRequired {
    active: true
    created_at: Date
    id: string
    incident_type: number
    name: string

    coords: {
        lat: number,
        lng: number
    }
}

export type { MarkerType, MarkerTypeRequired }