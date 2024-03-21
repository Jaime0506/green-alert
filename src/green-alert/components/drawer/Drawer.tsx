import { motion } from 'framer-motion'

interface DrawerProps {
    children: React.ReactNode
}

export const Drawer = ({ children }: DrawerProps ) => {
    return (
        <motion.section>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                { children }
            </motion.div>
        </motion.section>
    )
}
