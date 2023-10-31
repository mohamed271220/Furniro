import { Link } from "react-router-dom";

function Completion() {
  return <div className="flex flex-col items-center justify-center  h-screen bg-gray-100">
    <h1 className="text-[6vh] font-serif text-gray-800">Thank you! 🎉</h1>
    <p className="text-[2vh] text-gray-600">Your order has been placed.</p>
    <p className="text-[2vh] text-gray-600">We will contact you shortly.</p>
    <p className="text-[2vh] text-gray-600 mt-[2vh] ">Meanwhile check our <span className="m-0 text-dim-yellow">Socials</span></p>
    <div className="flex flex-row gap-[2vh]">
      icon
      icon
      icon
    </div>
    <button className="btn-3 mt-[2vh]">
      <Link to="/">Back to Home</Link>
    </button>
  </div>
}

export default Completion;
