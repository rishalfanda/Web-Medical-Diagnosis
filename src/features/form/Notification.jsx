import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
function Notification({notification}) {
    return (
    <AnimatePresence>
        {notification.show && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center space-x-2 ${
                    notification.type === "success"
                    ? "bg-green-700 text-green-100"
                    : "bg-red-700 text-red-100"
                }`}
            >
                {notification.type === "success" ? (
                    <CheckCircle className="w-5 h-5" />
                    ) : (
                    <XCircle className="w-5 h-5" />
                )}
                <span>{notification.message}</span>
            </motion.div>
            )}
    </AnimatePresence>
    )
}

export default Notification
