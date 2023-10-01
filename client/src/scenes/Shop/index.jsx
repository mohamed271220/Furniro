import Banner from "../../components/Banner";
import CertiBanner from "../../components/CertiBanner";
import Products from "../../components/Products";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../constants/Http";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingSpinner from "../../constants/Loading/LoadingSpinner/LoadingSpinner";
import LoadingSkeleton from "../../constants/Loading/SkeletonTwo/Skeleton";



const Shop = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts({ signal }),
  });



  console.log(data);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const firstIndexOfProduct = indexOfLastProduct - productsPerPage;
  const records = data?.products?.slice(firstIndexOfProduct, indexOfLastProduct) || [];
  const nPage = Math.ceil(data?.products?.length / productsPerPage) || 0;
  const numbers = [...Array(nPage + 1).keys()].slice(1);
  console.log(numbers);


  const prePage = () => {
    if (currentPage !== firstIndexOfProduct) {
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



  if (isError) {
    return <ErrorBlock title="Something went wrong" message={error} />;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Banner title="Shop" path={["Home", "Shop"]} />
      <div className="Shop w-full flex flex-col pb-[5vh]">
        <div className="filter w-full bg-secondary flex flex-row flex-wrap  md:flex-nowrap text-[2vh] items-center justify-between gap-[2vh] p-[2vh]">
          <p>Showing {productsPerPage} of {data?.products.length + 1} results</p>
          <div className="flex flex-row gap-[2vh]">
            <p>Show</p>
            <select onChange={(e) => {setProductPerPage(e.target.value)
            setCurrentPage(1)
            
            }}>
              <option>6</option>
              <option>12</option>
            </select>
          </div>
          <div className="flex flex-row gap-[2vh]">
            <p>Sort by</p>
            <select>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">

          {isPending ? <div className="w-full flex flex-col items-center">
            <LoadingSkeleton type='feed' />
          </div>
            :
            <Products products={records} />
          }
          {
            isError && <ErrorBlock title='Something went wrong' message={error} />
          }

          <div className="pagination">
            <ul className="flex flex-row justify-center items-center gap-[2.5vh]">
              {currentPage === 1 ? <li className=" hidden"></li> : <li className="bg-secondary  px-[2vh] py-[1vh]  text-[3vh] font-semibold rounded-[3px]">
                <a href="#" onClick={prePage}>
                  Previous
                </a>
              </li>}
              {numbers.map((number, index) => (
                <li
                  className={`${currentPage === number
                    ? "bg-dim-yellow text-white px-[2vh] py-[1vh]  text-[3vh] font-semibold rounded-[3px]"
                    : " bg-secondary px-[2vh] py-[1vh]   text-[3vh] font-semibold rounded-[3px]"
                    }`}
                  key={index}
                >
                  <a href="#" onClick={() => changePage(number)}>
                    {number}
                  </a>
                </li>
              ))}
              {currentPage === nPage ? <li className=" hidden"></li> : <li className="bg-secondary px-[2vh] py-[1vh]  text-[3vh] font-semibold rounded-[3px]">
                <a href="#" onClick={nextPage}>
                  Next
                </a>
              </li>}
            </ul>
          </div>
        </div>
      </div>
      <CertiBanner />
    </div>
  );
};

export default Shop;
