import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Pagination = ({
    currentPage,
    prePage,
    numbers,
    changePage,
    nextPage,
    nPage
}) => {
    const location = useLocation();
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = searchParams.get('page');

        if (page !== null && page !== currentPage) {
            changePage(Number(page));
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // if you want a smooth scrolling effect
        });
    };


    // Define the range of page numbers to display
    const range = 5;
    const start = Math.max(2, currentPage - Math.floor(range / 2));
    const end = Math.min(nPage - 1, start + range - 1);

    // Generate the list of page numbers to display
    const displayedNumbers = [];
    for (let i = start; i <= end; i++) {
        displayedNumbers.push(i);
    }


    return (
        <div className="Pagination w-full flex justify-center">
            <ul className="flex flex-row flex-wrap justify-center w-[80%] items-center gap-[2vh]">
                {currentPage === 1 ? <li className="hidden"></li> : <li className="bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]">
                    <Link href="#" onClick={(e) => { e.preventDefault(); prePage(); scrollToTop(); }}>
                        Previous
                    </Link>
                </li>}
                <li className={currentPage === 1 ? "bg-dim-yellow text-white px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]" : "bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"}>
                    <Link href="#" onClick={(e) => { e.preventDefault(); changePage(1); scrollToTop(); }}>
                        1
                    </Link>
                </li>
                {start > 2 && <li>...</li>}
                {displayedNumbers.map((number, index) => (
                    <li
                        className={`${currentPage === number
                            ? "bg-dim-yellow text-white px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"
                            : " bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"
                            }`}
                        key={index}
                    >
                        <Link href="#" onClick={(e) => { e.preventDefault(); changePage(number); scrollToTop(); }}>
                            {number}
                        </Link>
                    </li>
                ))}
                {end < nPage - 1 && <li>...</li>}
                <li className={currentPage === nPage ? "bg-dim-yellow text-white px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]" : "bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"}>
                    <Link href="#" onClick={(e) => { e.preventDefault(); changePage(nPage); scrollToTop(); }}>
                        {nPage}
                    </Link>
                </li>
                {currentPage === nPage || nPage === 0 ? <li className="hidden"></li> : <li className="bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]">
                    <Link href="#" onClick={(e) => { e.preventDefault(); nextPage(); scrollToTop(); }}>
                        Next
                    </Link>
                </li>}
            </ul>
        </div>
    )
}

export default Pagination;