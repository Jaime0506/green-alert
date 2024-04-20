import backgroundImage from '../assets/background.webp'

interface ContainerProps {
    children: React.ReactNode
    className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
    return (
        <main className={`bg-no-repeat bg-cover bg-center ${className}`} style={{ backgroundImage: `url(${backgroundImage})`, width: '100%', minHeight: '100vh' }}>
            {children}
        </main>
    )
}

