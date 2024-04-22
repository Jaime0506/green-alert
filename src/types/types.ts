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
    user: object | null
    errorMessage: string | null
}

export type { MarkerType, FormIncident, IncidentType, FormLogin, FormRegister, AuthType }