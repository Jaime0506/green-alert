import MarkerFire from '../assets/icons/fire.svg'
import Rain from '../assets/icons/rain.svg'
import LandSlide from '../assets/icons/landslide.svg'
import defaultIcon from '../assets/icons/default.png'

export const handleIncidentText = (type: number) => {
    if (type == 1) return "Incendio"

    if (type == 2) return "Deslizamiento de tierras"

    if (type == 3) return "Fuertes lluvias"

    return ""
}

export const handleIncidentColor = (type: number) => {
    if (type == 1) return "text-red-600"

    if (type == 2) return "text-amber-700"

    if (type == 3) return "text-blue-400"
}

export const handleIncidentIcon = (type: number) => {
    if (type == 1) return MarkerFire

    if (type == 2) return LandSlide

    if (type == 3) return Rain

    return defaultIcon
}

export const handleIncidentActiveText = (status: boolean) => {
    if (status) return "ACTIVO"

    return "INACTIVO"
}

export const handleIncidentActiveColor = (status: boolean) => {
    if (status) return "text-green-500"

    return "text-red-600"
}

export const handleIncidentFormatDate = (date: Date) => {

    const tempDate = new Date(date)

    const day = ("0" + tempDate.getDate()).slice(-2); // Agrega un cero al principio si es necesario
    const month = ("0" + (tempDate.getMonth() + 1)).slice(-2); // Se suma 1 porque los meses van de 0 a 11 en JavaScript
    const year = tempDate.getFullYear().toString().slice(-2); // Obtiene los últimos dos dígitos del año

    // Obteniendo minutos y segundos en formato MINUTES:SECONDS
    let hours = tempDate.getHours();
    const minutes = ("0" + tempDate.getMinutes()).slice(-2);
    const seconds = ("0" + tempDate.getSeconds()).slice(-2);
    
    // Obteniendo horas en formato de 12 horas, minutos y segundos
    const ampm = hours >= 12 ? "PM" : "AM"; // Determina si es AM o PM
    hours = hours % 12 || 12; // Convierte las horas a formato de 12 horas
    
    // Concatenando todo en el formato deseado
    const result = `${day}-${month}-${year} - ${hours}:${minutes}:${seconds} ${ampm}`;

    return result
}