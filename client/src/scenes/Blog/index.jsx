import { useQuery } from "@tanstack/react-query"
import Banner from "../../components/Banner"
import CertiBanner from "../../components/CertiBanner"
import { getPosts } from "../../constants/Http"
import { useRef, useState } from "react"
import LoadingSpinner from "../../constants/Loading/LoadingSpinner/LoadingSpinner"
import ErrorBlock from "../../components/ErrorBlock"
import Posts from "../../components/Posts"
import Pagination from "../../components/Pagination"
import { usePagination } from "../../hooks/usePagination"

const Blog = () => {
  const searchElement = useRef();
  const [search, setSearch] = useState();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: ({ signal }) => getPosts({ signal, searchTerm: search })
  })

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

  if (records) {
    console.log(records);
  }


  function handleSearchSubmit(event) {
    event.preventDefault();
    setSearch(searchElement.current.value);
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

      <div className="flex flex-col gap-[2vh] items-start  w-full
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
        <div className=" w-full md:w-[30%]  p-5 rounded-lg   
        " >
          <form onSubmit={handleSearchSubmit} id="search-form">
            <input
              type="search"
              placeholder="Search events"
              ref={searchElement}
            />
            <button>Search</button>
          </form>
        </div>
      </div>
      <CertiBanner />
    </div>
  )
}

export default Blog