import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white p-[10vh]">
      <div className="flex flex-row gap-[1vh]">
        <div className="flex flex-col gap-[1vh]">
          <h1 className="text-[3vh] font-bold mb-[10vh]">Furniro.</h1>
          <p className="text-[2vh] text-gray-400 ">
            400 University Drive Suite 200 Coral Gables,
          </p>
          <p className="text-[2vh] text-gray-400 ">FL 33134 USA</p>
        </div>

        <div className="flex flex-row gap-[1vh]">
          <div>
            <h3 className="text-[2vh] text-gray-400 ">Links</h3>
            <ul className="text-[2vh] flex flex-col">
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
          <h3 className="text-[2vh] text-gray-400 ">Help</h3>
            <ul className="text-[2vh] flex flex-col">
                <li><a href="">Payment Options</a></li>
                <li><a href="">Payment Options</a></li>
                <li><a href="">Payment Options</a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-[2vh] text-gray-400 ">Newsletter</h3>
            <input type="text" placeholder="Enter email address" />
          </div>
        </div>
      </div>

      <div className="copyrights"></div>
    </div>
  );
};

export default Footer;
