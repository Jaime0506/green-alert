interface MarkerType {
    active: boolean
    created_at?: Date
    id: string
    incident_type: number
    name?: string
    coords: CoordsTypes 
    images: string[]
    create_by?: string
}

interface FormIncident {
    name: string
    incident_type: number
}

interface FormLogin {
    email: string
    password: string
}

interface FormRegister {
    name: string
    email: string
    password: string
}

interface IncidentType {
    id: number,
    name: string
}

interface AuthType {
    status: "authenticated" | "not-authenticated" | "checking"
    uid: string | null
    user: {
        email: string | undefined
        name: string | undefined
    } | undefined
    errorMessage: string | null
}

interface CoordsTypes {
    lat: number
    lng: number
}

export type { MarkerType, FormIncident, IncidentType, FormLogin, FormRegister, AuthType, CoordsTypes }