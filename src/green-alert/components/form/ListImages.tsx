import { Image } from "@nextui-org/react"

interface ListImagesProps {
    images: string[]
}

export const ListImages = ({ images }: ListImagesProps) => {

    if (!(images.length > 0)) return null

    return (
        <section className="flex flex-row gap-2 py-4">
            {
                images.map((path, index) => (
                    <div key={index} className="">
                        <Image
                            width={112}
                            alt="Image incidents"
                            src={`https://ohcjcommgokajjptkmhd.supabase.co/storage/v1/object/public/test/${path}`}
                        />
                    </div>
                ))
            }
        </section>
    )
}
