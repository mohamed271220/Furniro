import HomeHero from "../../components/HomeHero/index";
import HomeCategories from "../../components/HomeCategories/index";
import Products from "../../components/Products/index";
import HomeCarousel from "../../components/HomeCarousel";
import Hashes from "../../components/HomeHashes";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../constants/Http";
import LoadingSpinner from "../../constants/Loading/LoadingSpinner/LoadingSpinner"
import ErrorBlock from "../../components/ErrorBlock";
const Home = ({user}) => {

  const { data: products, isPending,  isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts({ signal, max: 8 }),
  });

  return (
    <div
      className="flex flex-col items-center justify-center
  w-full z-10
  "
    >
      <HomeHero />
      <HomeCategories />
      {isPending ? <LoadingSpinner />
        :
        <Products home={true} products={products?.products} user={user} />
      }
      {
        isError && <ErrorBlock title='Something went wrong' message={error} />
      }
      <HomeCarousel products={products?.products.sort(() => 0.5 - Math.random()).slice(0, 3)} />
      <Hashes />
    </div>
  );
};

export default Home;
