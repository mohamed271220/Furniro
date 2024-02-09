import { createPortal } from "react-dom";
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose, isForm,isSearchForm, isOpen }) {
  return createPortal(
    <div className="relative">
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 `}
        onClick={onClose}
      />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.dialog
            key="modal"
            className={`absolute ${isForm ? "top-4 m-auto" : "top-0 left-0"} transform -translate-x-1/2 -translate-y-1/2 ${isSearchForm ? 'py-0' : 'py-[2vh]'} px-[3vh] w-[30rem] max-w-[90%] z-50 bg-white
          overflow-auto
          `}
            open
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0.3, y: 30 },
              exit: { opacity: 0.3, y: 50 },
            }}
            transition={{ exit: { duration: 0.5 } }}

            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="font-bold text-[3vh]">{title}</h2>
            {children}
          </motion.dialog>
        )}
      </AnimatePresence>
    </div>
    ,
    document.getElementById("modal")
  );
}
