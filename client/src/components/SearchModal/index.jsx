import Modal from "../Modal";
import { BsBagPlus, BsFillXCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { cartActions } from "../../store/cartSlice";

const config = {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    hideProgressBar: false,
    draggable: true,
    progress: undefined,
    theme: "light",
};


const SearchModal = ({ onClose, isOpen }) => {
    const [loading, setLoading] = useState(false);



    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>

            </Modal>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default SearchModal;
