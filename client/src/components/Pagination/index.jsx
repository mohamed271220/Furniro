const Pagination = ({
    currentPage,
    prePage,
    numbers,
    changePage,
    nextPage,
    nPage
}) => {
    return (
        <div className="Pagination w-full flex justify-center">
            <ul className="flex flex-row flex-wrap justify-center w-[80%] items-center gap-[2vh]">
                {currentPage === 1 ? <li className="hidden"></li> : <li className="bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]">
                    <a href="#" onClick={(e) => { e.preventDefault(); prePage(); }}>
                        Previous
                    </a>
                </li>}
                {numbers.map((number, index) => (
                    <li
                        className={`${currentPage === number
                            ? "bg-dim-yellow text-white px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"
                            : " bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"
                            }`}
                        key={index}
                    >
                        <a href="#" onClick={(e) => { e.preventDefault(); changePage(number); }}>
                            {number}
                        </a>
                    </li>
                ))}
                {currentPage === nPage || nPage === 0 ? <li className="hidden"></li> : <li className="bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]">
                    <a href="#" onClick={(e) => { e.preventDefault(); nextPage(); }}>
                        Next
                    </a>
                </li>}
            </ul>
        </div>
    )
}

export default Pagination;