const Pagination = ({
    currentPage,
    prePage,
    numbers,
    changePage,
    nextPage,
    nPage
}) => {
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
                    <a href="#" onClick={(e) => { e.preventDefault(); prePage(); }}>
                        Previous
                    </a>
                </li>}
                <li className={currentPage === 1 ? "bg-dim-yellow text-white px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]" : "bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"}>
                    <a href="#" onClick={(e) => { e.preventDefault(); changePage(1); }}>
                        1
                    </a>
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
                        <a href="#" onClick={(e) => { e.preventDefault(); changePage(number); }}>
                            {number}
                        </a>
                    </li>
                ))}
                {end < nPage - 1 && <li>...</li>}
                <li className={currentPage === nPage ? "bg-dim-yellow text-white px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]" : "bg-secondary px-[2vh] py-[1vh] text-[2vh] font-semibold rounded-[3px]"}>
                    <a href="#" onClick={(e) => { e.preventDefault(); changePage(nPage); }}>
                        {nPage}
                    </a>
                </li>
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