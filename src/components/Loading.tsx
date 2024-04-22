import { CircularProgress } from "@nextui-org/react"

export const Loading = () => {
    return (
        <main className="w-full h-screen flex items-center justify-center">
            <CircularProgress color="success" />
        </main>
    )
}
