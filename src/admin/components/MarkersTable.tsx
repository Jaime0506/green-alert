import { handleIncidentFormatDate, handleIncidentText } from "../../utils";
import { MdEdit, MdDelete } from 'react-icons/md'

import type { MarkerType } from "../../types";

interface MarkersTableProps {
    markers: MarkerType[]
    openModal: (marker: MarkerType) => void
    onDelete: (id: string) => void
}

export const MarkersTable = ({ markers, openModal, onDelete }: MarkersTableProps) => {

    const renderTableHeader = () => {
        if (markers != undefined) {
            let headers = Object.keys(markers[0] || {});
            headers = headers.filter((item) => item != 'name')
            headers = headers.filter((item) => item != 'images')

            headers.push("coords.lat", "coords.lng"); // Añadir coordenadas separadas
            headers.push("Actions")
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
                    <td className="px-6 py-4 flex gap-4">
                        <MdEdit className="cursor-pointer text-lg text-green-500" onClick={() => openModal(marker)} />
                        <MdDelete className="cursor-pointer text-lg text-red-600" onClick={() => onDelete(marker.id)} />
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="shadow-xl sm:rounded-xl rounded">
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
                    {renderTableHeader()}
                </thead>
                <tbody className="w-full">
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    )
}
