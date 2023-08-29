import Banner from "../../components/Banner";
import CertiBanner from "../../components/CertiBanner";
import Products from "../../components/Products";
import { useState } from "react";

const data = [
  {
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0,
    photo: "./Ex.png",
    newTag: true,
  },
  {
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0,
    photo: "./Ex.png",
    newTag: true,
  },
  {
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
  {
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0,
    photo: "./Ex.png",
    newTag: true,
  },
  {
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
  {
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
  {
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
  {
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
];

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const firstIndexOfProduct = indexOfLastProduct - productsPerPage;
  const records = data.slice(firstIndexOfProduct, indexOfLastProduct);
  const nPage = Math.ceil(data.length / productsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

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

  return (
    <div className="w-full flex flex-col items-center">
      <Banner title="Shop" path={["Home", "Shop"]} />
      <div className="Shop w-full flex flex-col pb-[6vh]">
        <div className="filter bg-secondary flex flex-row items-center justify-between p-[2vh]">
          <p>Showing 1{"–"}16 of 32 results</p>
          <div>
            <p>Show</p>
            <select>
              <option>12</option>
            </select>
          </div>
          <div>
            <p>Sort by</p>
            <select>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Products products={records} />
          <div className="pagination">
            <ul className="flex flex-row justify-center items-center gap-[2.5vh]">
              <li className="bg-secondary  px-[2vh] py-[1vh]  text-[3vh] font-semibold rounded-[3px]">
                <a href="#" onClick={prePage}>
                  Previous
                </a>
              </li>
              {numbers.map((number, index) => (
                <li
                  className={`${
                    currentPage === number
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
              <li className="bg-secondary px-[2vh] py-[1vh]  text-[3vh] font-semibold rounded-[3px]">
                <a href="#" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <CertiBanner />
    </div>
  );
};

export default Shop;
