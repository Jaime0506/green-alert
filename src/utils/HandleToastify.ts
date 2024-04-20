import { toast } from "react-toastify"

type TypeEvent = "upload" | "update"

export const MessageIncident = {
    success_upload: "Se ha creado el incidente correctamente",
    error_upload: "No se ha podido crear correctamente el incidente",

    success_update: "Se ha actualizado correctamente",
    error_update: "No se ha podido actualizar correctamente"
}

export const handleToToastify = (type: TypeEvent, error: object | null) => {
    let message = ""

    if (error) {
        message = type === "upload" ? MessageIncident.error_upload : MessageIncident.error_update

        toast.error(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        })
        return

    }

    message = type === "upload" ? MessageIncident.success_upload : MessageIncident.success_update

    toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
    
}