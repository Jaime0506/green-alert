import { AnimatePresence, motion } from "framer-motion"
import { Drawer } from "."

interface DrawerWrapperProps {
    isOpenDrawer: boolean
    children: React.ReactNode
}

export const DrawerWrapper = ({ isOpenDrawer, children }: DrawerWrapperProps) => {

    return (
        <AnimatePresence>
            {
                isOpenDrawer && (
                    <motion.div
                        key="drawer"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 500 }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: .5 }}
                    >
                        <Drawer>
                            {children}
                        </Drawer>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}
