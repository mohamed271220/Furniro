import HomeHero from "../../components/HomeHero/index";
import HomeCategories from "../../components/HomeCategories/index";
import Products from "../../components/Products/index";
import HomeCarousel from "../../components/HomeCarousel";
import Hashes from "../../components/HomeHashes";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../constants/Http";

const data = [
  {
    id:'64f6c9266c2c7f8cdb2ec682',
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0,
    photo: "./Ex.png",
    newTag: true,
  },
  {
    id:'64f6c9266c2c7f8cdb2ec682',
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0,
    photo: "./Ex.png",
    newTag: true,
  },
  {
    id:'64f6c9266c2c7f8cdb2ec682',
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
  {
    id:'64f6c9266c2c7f8cdb2ec682',
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0,
    photo: "./Ex.png",
    newTag: true,
  },
  {
    id:'64f6c9266c2c7f8cdb2ec682',
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
  {
    id:'64f6c9266c2c7f8cdb2ec682',
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
  {
    id:'64f6c9266c2c7f8cdb2ec682',
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
  {
    id:'64f6c9266c2c7f8cdb2ec682',
    title: "Lolito",
    ShortDescription: "Luxury big sofa",
    price: 2.5,
    sale: 0.2,
    photo: "./Ex.png",
    newTag: false,
  },
];

const Home = () => {

  const { data:products, isPending, isLoading, isError, error } = useQuery({
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
      <Products home={true} products={data} />
      <HomeCarousel />
      <Hashes />
    </div>
  );
};

export default Home;
