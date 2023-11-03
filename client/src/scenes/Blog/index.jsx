import { useQuery } from "@tanstack/react-query"
import Banner from "../../components/Banner"
import CertiBanner from "../../components/CertiBanner"
import { getPosts } from "../../constants/Http"
import { useRef, useState } from "react"
import LoadingSpinner from "../../constants/Loading/LoadingSpinner/LoadingSpinner"
import ErrorBlock from "../../components/ErrorBlock"
import Posts from "../../components/Posts"

const Blog = () => {
  const searchElement = useRef();
  const [search, setSearch] = useState();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: ({ signal }) => getPosts({ signal, searchTerm: search })
  })

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const firstIndexOfPost = indexOfLastPost - postsPerPage;
  const records = data?.posts?.slice(firstIndexOfPost, indexOfLastPost) || [];
  const nPage = Math.ceil(data?.posts?.length / postsPerPage) || 0;
  const numbers = [...Array(nPage + 1).keys()].slice(1);


  const prePage = () => {
    if (currentPage !== firstIndexOfPost) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changePage = (n) => {
    setCurrentPage(n);
  };
  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };



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

      <div className="flex flex-col gap-3 justify-center items-center 
      bg-[#f2f2f2] p-5 rounded-lg shadow-lg md:flex-row md:gap-0 md:justify-between md:items-center md:p-10 
      lg:p-20 xl:p-40 2xl:p-60 
      
      ">
        <div className="w-[70%] bg-[#f2f2f2] p-5 rounded-lg shadow-lg md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%] 
        ">
          {content}
        </div>
        <div className="w-[30%] bg-[#f2f2f2] p-5 rounded-lg shadow-lg md:w-[40%] lg:w-[30%] xl:w-[20%] 2xl:w-[10%] 
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