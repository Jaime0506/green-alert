import { Image, Link } from "@nextui-org/react"
import { handleIncidentActiveColor, handleIncidentActiveText, handleIncidentColor, handleIncidentFormatDate, handleIncidentImage, handleIncidentText } from "../../../utils"

import type { MarkerType } from "../../../types"

interface InfoWindowContentProps {
    marker: MarkerType
    onClick: (marker: MarkerType) => void
}

export const InfoWindowContent = ({ marker, onClick }: InfoWindowContentProps) => {

    const { active, incident_type, created_at, name  } = marker

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

                        <Link
                            underline="always"
                            onClick={() => onClick(marker)}
                            className="text-xs pt-2 hover:cursor-pointer"
                        >
                            Ver mas
                        </Link>
                    </footer>
                </section>
            </main>
        </div>
    )
}
