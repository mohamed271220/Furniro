import { useQuery } from "@tanstack/react-query"
import Banner from "../../components/Banner"
import CertiBanner from "../../components/CertiBanner"
import { getPosts } from "../../constants/Http"
import { useEffect, useRef, useState } from "react"
import LoadingSpinner from "../../constants/Loading/LoadingSpinner/LoadingSpinner"
import ErrorBlock from "../../components/ErrorBlock"
import Posts from "../../components/Posts"
import Pagination from "../../components/Pagination"
import { usePagination } from "../../hooks/usePagination"
import { AiOutlineSearch } from "react-icons/ai"

const Blog = () => {
  const searchElement = useRef();
  const [search, setSearch] = useState('');
  const { data, refetch, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: ({ signal }) => getPosts({ signal, searchTerm: search })
  })
  const [newestPosts, setNewestPosts] = useState(null);
  const { data: newestData, isError: newestError, isPending: newestIsPending, error: newestErrorInfo, refetch: newestRefetch } = useQuery({
    queryKey: ['newestPosts'], queryFn: ({ signal }) => getPosts({ signal, limit: 2 })
  });
  console.log(newestData);


  const {
    currentPage,
    itemsPerPage,
    setItemsPerPage,
    getPaginatedData,
    getPageNumbers,
    goToPreviousPage,
    goToPage,
    goToNextPage,
  } = usePagination(1, 8);

  const records = getPaginatedData(data?.posts || []);
  const numbers = getPageNumbers(data?.posts?.length || 0);

  // if (records) {
  //   console.log(records);
  // }



  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchTerm = searchElement.current.value;
    setSearch(searchTerm);
    refetch();
  }

  let content;

  if (isPending) {
    content = <LoadingSpinner />;
  }


  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred while fetching the posts"
        error={error.info?.message || "failed"}
      />
    );
  }

  if (data) {
    content = (<Posts posts={records} />
    )
  }



  return (
    <div>
      <Banner title={'Blog'} />
      {/* blog made into two columns */}

      <div className="flex flex-col-reverse gap-[2vh] items-start  w-full
       p-5 rounded-lg shadow-lg 
       md:flex-row  
       px-[4vh] md:px-[121px]
      ">
        <div className="w-full md:w-[70%] p-5 rounded-lg  
        flex flex-col justify-center items-center
        ">
          {content}
          <Pagination
            numbers={numbers}
            currentPage={currentPage}
            changePage={goToPage}
            prePage={goToPreviousPage}
            nextPage={() => goToNextPage(data?.products?.length || 0)}
            nPage={numbers.length}
          />
        </div>
        <div className="w-full md:w-[30%]  p-5 rounded-lg flex flex-col justify-center items-center
        " >
          <form onSubmit={handleSearchSubmit} id="search-form" className="relative w-full">
            <input
              type="search"
              placeholder="Search events"
              className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              ref={searchElement}

              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-3 !px-2 !py-1 !text-sm absolute top-0 right-0 h-10 rounded-lg"><AiOutlineSearch /></button>
          </form> <div>

          </div>
        </div>
      </div>
      <CertiBanner />
    </div>
  )
}

export default Blog