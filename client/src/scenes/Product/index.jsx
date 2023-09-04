import { useParams } from "react-router-dom";
import MockImg1 from "../../assets/images/MockImg1.png";
import MockImg2 from "../../assets/images/MockImg2.png";
import MockImg3 from "../../assets/images/MockImg3.png";

const Product = () => {
  const id = useParams().id;

  
  const data = {
    name: "Asgaard sofa",
    price: 250,
    sale: 0.01,
    isNew: false,
    images: [MockImg1, MockImg2, MockImg3],
    rating: 4.5,
    reviews: [
      {
        name: "John",
        rating: 5,
        comment: "Nice product",
      },
      {
        name: "John",
        rating: 5,
        comment: "Nice product",
      },
      {
        name: "John",
        rating: 5,
        comment: "Nice product",
      },
    ],
    sizeOptions: ["sm", "md", "lg"],
    Tags: ["sofa", "furniture"],
    ShortDescription:
      "Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.",
    description: [
      "Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.",
      "Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.",
    ],
    salesPackage: "1 sectional sofa",
    modal: "TFCBLIGRBL6SRHS",
    config: "L-shaped",
    fillingMat: "Foam",
    load: "280",
    origin: "Egypt",
    width: 265.32,
    height: 76,
    depth: 167.67,
    weight: 45,
    seatHeight: 41.52,
    legHeight: 5.46,
  };

  //TODO: Get product data from API with id

  return (
    <div className="w-full flex flex-col gap-[3vh]">
      <div className="bg-secondary flex flex-row text-[2vh] items-center justify-start gap-[2vh]  p-[4vh]">
        <span>Home</span> <span>{">"}</span>
        <span>Shop</span> <span>{">"}</span>
        <span>{"|"}</span> <span className="text-gray-500">{data.name}</span>
      </div>
      <div className="product flex flex-col gap-[3vh] ">
        <div className="info w-full px-[9vh] gap-[4vh] py-[2vh] flex flex-row">
          {/* images  */}
          <div className="images flex lg:flex-row flex-col-reverse gap-[2vh] w-[50%]">
            <div className="flex flex-row lg:flex-col gap-[2vh]">
              <img className="w-[10vh] h-[10vh]" src={data.images[1]} alt="" />
              <img className="w-[10vh] h-[10vh]" src={data.images[0]} alt="" />
            </div>
            <img className="w-[75%] h-[60vh]" src={data.images[2]} alt="" />
          </div>

          {/* details */}

          <div className="flex flex-col w-[40%] gap-[2vh]">
            <h2 className="text-[6vh]">{data.name}</h2>
            <h3 className="text-[4vh] text-gray-500">{data.price}.00$</h3>
            <div className="text-[2.5vh]">stars | {data.rating}</div>
            <p className="text-[2vh]">{data.ShortDescription}</p>

            <div className="flex flex-col gap-[2vh] text-[2.1vh] mt-[1vh]">
              <p className="text-gray-500">size</p>
              <div className="flex flex-row gap-[2vh]">
                {data.sizeOptions.map((size) => (
                  <span className="bg-secondary p-[1vh] rounded-sm" key={size}>
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* cart control  */}

            <div className="flex flex-row items-center  text-[3vh] gap-[3vh] mt-[3vh]">
              <div className=" border-gray-500 border-[.2vh] rounded-lg p-[1vh]">
                {" "}
                - 1 +{" "}
              </div>
              <div className="border-black border-[.2vh] p-[1vh] px-[2.5vh] rounded-[5px]">
                <button>Add To Cart</button>
              </div>
              <div className="border-black border-[.2vh] p-[1vh] px-[2.5vh] rounded-[5px]">
                <button>+ Compare</button>{" "}
              </div>
            </div>

            <hr />

            <p className="text-gray-500 text-[2vh]">
              Tags:{" "}
              {data.Tags.map((tag) => (
                <span key={tag}>{tag},</span>
              ))}
            </p>
          </div>
        </div>

        <hr />

        <div className="desc  w-full px-[9vh] gap-[4vh] py-[2vh]">
          <div
            className="control flex flex-row items-center justify-center pb-[6vh]
          gap-[3vh] text-[4vh]
          "
          >
            <button>Description</button>
            <button>Additional Information</button>
            <button>Reviews [{data.reviews.length}]</button>
          </div>
          <div className="flex flex-col gap-[3vh] text-[2vh] text-[#9F9F9F]">
            {data.description.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
