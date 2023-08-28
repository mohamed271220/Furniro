import HomeHero from "../../components/HomeHero/index";
import HomeCategories from "../../components/HomeCategories/index";
import Products from "../../components/Products/index";
import HomeCarousel from "../../components/HomeCarousel";
import Hashes from "../../components/HomeHashes";
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

const Home = () => {
  return (
    <div
      className="flex flex-col items-center justify-center
  w-full z-10
  "
    >
      <HomeHero />
      <HomeCategories />
      <Products products={data} />
      <HomeCarousel/>
      <Hashes/>
    </div>
  );
};

export default Home;
