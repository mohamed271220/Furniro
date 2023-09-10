import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center  bg-white py-[5vh] pb-[15vh]">
      <div className="flex flex-row  gap-[20vh]">
        <div className="flex flex-col gap-[1vh]">
          <h1 className="text-[3vh] font-bold mb-[5vh]">Furniro.</h1>
          <p className="text-[2vh] text-gray-400 ">
            400 University Drive Suite 200 Coral Gables,
          </p>
          <p className="text-[2vh] text-gray-400 ">FL 33134 USA</p>
        </div>

        <div className="flex flex-row gap-[6vh]">
          <div>
            <h3 className="text-[2vh] text-gray-400 font-bold mb-[5vh] ">
              Links
            </h3>
            <ul className="text-[2vh] flex flex-col gap-[5vh] font-bold">
              <li>
                <Link href="">Home</Link>
              </li>
              <li>
                <Link href="">Shop</Link>
              </li>
              <li>
                <Link href="">Blog</Link>
              </li>
              <li>
                <Link href="">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[2vh] text-gray-400 font-bold mb-[5vh] ">
              Help
            </h3>
            <ul className="text-[2vh] flex flex-col gap-[5vh] font-bold">
              <li>
                <a href="">Payment Options</a>
              </li>
              <li>
                <a href="">Payment Options</a>
              </li>
              <li>
                <a href="">Payment Options</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[2vh] text-gray-400 font-bold mb-[5vh]">
              Newsletter
            </h3>
            <input type="text" placeholder="Enter email address" />
          </div>
        </div>
      </div>

      <div
        className="copyrights border-t-[1vh] border-gray-300  w-[80%]
      my-[5vh]
      font-semibold
      text-[2vh]
      pt-[2vh]
       text-gray-400"
      >
        © 2022 Furniiro. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
