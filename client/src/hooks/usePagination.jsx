import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePagination = (initialPage, initialItemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const navigate = useNavigate();


    const getPaginatedData = (data) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    };

    const getPageNumbers = (dataLength) => {
        const numberOfPages = Math.ceil(dataLength / itemsPerPage);
        return [...Array(numberOfPages + 1).keys()].slice(1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            navigate(`?page=${currentPage - 1}`);
        }
    };

    const goToPage = (number) => {
        setCurrentPage(number);
        navigate(`?page=${number}`);
    };

    const goToNextPage = (dataLength) => {
        if (currentPage < Math.ceil(dataLength / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
            navigate(`?page=${currentPage + 1}`);
        }
    };

    return {
        currentPage,
        itemsPerPage,
        setItemsPerPage,
        getPaginatedData,
        getPageNumbers,
        goToPreviousPage,
        goToPage,
        goToNextPage,
    };
};