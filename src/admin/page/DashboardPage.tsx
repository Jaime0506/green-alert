import { useEffect, useState } from "react"
import { MarkerType } from "../../types"
import { handleIncidentFormatDate, handleIncidentText } from "../../utils"

interface DashboardPageProps {
    markers: MarkerType[]
}

interface MarkerColumns {
    key: string | undefined,
    label: string | undefined
}


export const DashboardPage = ({ markers }: DashboardPageProps) => {

    const [columnsTable, setColumnsTable] = useState<MarkerColumns[] | undefined>()

    useEffect(() => {
        if (markers != undefined && markers.length > 0) {
            const nameColumns: MarkerColumns[] = []

            Object.keys(markers[0]).forEach(key => {
                const temp: MarkerColumns = {
                    key: undefined,
                    label: undefined
                }
                temp["key"] = key
                temp["label"] = key

                nameColumns.push(temp)
            })

            setColumnsTable(nameColumns)
        }
    }, [markers])

    useEffect(() => {
        console.log(columnsTable)
    }, [columnsTable])

    const renderTableHeader = () => {
        if (markers != undefined) {
            let headers = Object.keys(markers[0] || {});
            headers = headers.filter((item) => item != 'name')
            headers = headers.filter((item) => item != 'images')

            headers.push("coords.lat", "coords.lng"); // Añadir coordenadas separadas
            const filteredHeaders = headers.filter(header => header !== "coords"); // Eliminar "coords" ya que se descompuso

            return (
                <tr>
                    {filteredHeaders.map((key, index) => (
                        <th scope="col" className="px-6 py-3" key={index}>{key.toUpperCase()}</th>
                    ))}
                </tr>
            );
        }
    };

    const renderTableData = () => {
        return markers.map((marker, index) => {
            return (
                <tr key={marker.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                    <td className="px-6 py-4">{handleIncidentText(marker.incident_type)}</td>
                    <td className="px-6 py-4">{marker.created_at ? handleIncidentFormatDate(marker.created_at) : 'N/A'}</td>
                    <td className="px-6 py-4">{marker.active ? "Activo" : "Inactivo"}</td>
                    <td className="px-6 py-4">{marker.name}</td>
                    <td className="px-6 py-4">{marker.coords.lat}</td>
                    <td className="px-6 py-4">{marker.coords.lng}</td>
                </tr>
            );
        });
    };

    return (
        <main className="w-screen bg-red-400 h-screen flex items-center justify-center">
            <div className="w-1/2 shadow-xl sm:rounded-xl rounded bg-green-400">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {renderTableHeader()}
                    </thead>
                    <tbody>
                        {renderTableData()}
                    </tbody>
                </table>
            </div>
        </main>
    )
}
