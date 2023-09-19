import { createPortal } from "react-dom";

import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 "
        onClick={onClose}
      />
      <motion.dialog
        className=" p-[3vh] w-[30rem] max-w-[90%] top-[0]  z-50
    bg-white
        "
        open
        //To reuse states
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 30 },
        }}
        //from these
        initial="hidden"
        //to these
        animate="visible"
        //ends with this
        exit="hidden"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
