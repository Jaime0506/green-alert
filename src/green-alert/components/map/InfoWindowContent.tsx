import { Image } from "@nextui-org/react"
import type { MarkerType } from "../../../types"
import { handleIncidentActiveColor, handleIncidentActiveText, handleIncidentColor, handleIncidentFormatDate, handleIncidentImage, handleIncidentText } from "../../../utils"

export const InfoWindowContent = ({ active, incident_type, created_at, name }: MarkerType) => {
    return (
        <div className="w-full">
            <Image
                src={handleIncidentImage(incident_type)}
                alt="landSlide"
                className="w-full rounded "
            />
            <main className="p-2 flex flex-col">
                <h1
                    className={`text-base pb-2 font-bold ${handleIncidentColor(
                        incident_type
                    )}`}
                >
                    {handleIncidentText(incident_type)}
                </h1>

                <section className="flex gap-1 flex-col">
                    <header className="flex gap-1">
                        <h3 className="font-semibold">Estado:</h3>
                        <p
                            className={`font-bold ${handleIncidentActiveColor(
                                active
                            )}`}
                        >
                            {handleIncidentActiveText(active)}
                        </p>
                    </header>

                    <div className="font-semibold">
                        <p>{handleIncidentFormatDate(created_at)}</p>
                    </div>

                    <footer>
                        <p className="font-semibold">Creado por: {name}</p>
                    </footer>
                </section>
            </main>
        </div>
    )
}
