import Modal from "../Modal";
import { BsBagPlus, BsFillXCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { cartActions } from "../../store/cartSlice";
import ErrorBlock from "../ErrorBlock";
import { getProducts } from "../../constants/Http";
import LoadingSpinner from "../../constants/Loading/LoadingSpinner/LoadingSpinner";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import Products from "../Products";

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
    const searchElement = useRef();
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const max = 10;
    const { data, refetch, isPending, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: ({ signal }) => getProducts({ signal, searchTerm: search, max })
    })

    function handleSearchSubmit(event) {
        event.preventDefault();
        refetch();
    }

    let content;

    if (isPending) {
        content = <LoadingSpinner />;
    }


    if (isError) {
        content = (
            <ErrorBlock
                title="An error occurred while fetching the products"
                error={error.info?.message || "failed"}
            />
        );
    }

    if (data) {
        content = (
            <div className="w-full h-[70vh]">
            <Products products={data?.products} />
            </div>
        )
    }


    return (
        <>
            <Modal isForm={true} isSearchForm={true} isOpen={isOpen} onClose={onClose}>
                <div className="w-full px-5 rounded-lg flex flex-col justify-center items-center gap-2 sticky top-0 bg-white z-50 h-[10vh]
        " >
                    <form onSubmit={handleSearchSubmit} id="search-form" className="relative w-full">
                        <input
                            type="search"
                            placeholder="Search products"
                            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="btn-3 !px-2 !py-1 !text-sm absolute top-0 right-0 h-10 rounded-lg"><AiOutlineSearch /></button>
                    </form>
                </div>
                <div className="w-full rounded-lg  
        flex flex-col justify-center items-center
        ">
                    {content}
                </div>
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
