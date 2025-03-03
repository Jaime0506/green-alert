import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchDataIncidentTypes, fetchDataIncidents } from "../../store/incidents"

import { Loading } from "../../components"
import { DashboardPage } from "../page"
import { MarkerType } from "../../types"

export const AdminRouter = () => {

    const { markers } = useAppSelector(state => state.incidents)
    const dispatch = useAppDispatch()

    const [markersTemp, setMarkersTemp] = useState<MarkerType[] | undefined>(undefined)

    useEffect(() => {
        if (markers && markers.length > 0) return
        dispatch(fetchDataIncidents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch(fetchDataIncidentTypes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setMarkersTemp(markers)
    }, [markers])

    if (markersTemp === undefined) return <Loading />

    return (
        <Routes>
            <Route path="/" element={<DashboardPage markers={markersTemp} />} />
        </Routes>
    )
}
