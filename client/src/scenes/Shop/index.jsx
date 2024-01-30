import Banner from "../../components/Banner";
import CertiBanner from "../../components/CertiBanner";
import Products from "../../components/Products";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../constants/Http";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingSkeleton from "../../constants/Loading/SkeletonTwo/Skeleton";
import Pagination from "../../components/Pagination";
import { usePagination } from "../../hooks/usePagination";



const Shop = ({ user }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts({ signal }),
  });


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

  const records = getPaginatedData(data?.products || []);
  const numbers = getPageNumbers(data?.products?.length || 0);


  if (isError) {
    return <ErrorBlock title="Something went wrong" message={error} />;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <Banner title="Shop" path={["Home", "Shop"]} />
      <div className="Shop w-full flex flex-col pb-[5vh]">
        <div className="filter w-full bg-secondary flex flex-row flex-wrap  md:flex-nowrap text-[2vh] items-center justify-between gap-[2vh] p-[2vh]">
          <p>Showing {records.length} of {data?.products.length} results</p>
          <div className="flex flex-row gap-[2vh]">
            <p>Show</p>
            <select onChange={(e) => {
              setItemsPerPage(e.target.value)
              goToNextPage(1)

            }}>
              <option>8</option>
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
            <Products products={records} user={user} />
          }
          {
            isError && <ErrorBlock title='Something went wrong' message={error} />
          }
          <Pagination
            numbers={numbers}
            currentPage={currentPage}
            changePage={goToPage}
            prePage={goToPreviousPage}
            nextPage={() => goToNextPage(data?.products?.length || 0)}
            nPage={numbers.length}
          />
        </div>
      </div>
      <CertiBanner />
    </div>
  );
};

export default Shop;
