
import Logo from "../../assets/icons/LOGO.svg";
import Google from "../../assets/icons/google.svg";

function Entry() {


  const googleAuth = () => {
    console.log(import.meta.env.VITE_REACT_APP_API_URL);
    sessionStorage.setItem("redirectUrl", window.location.href);
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );



  };
  return (
    <div className="lg:w-full  lg:h-[100vh] h-full padding-y my-7 flex flex-col justify-center items-center ">
      <div
        className={
          " bg-primary lg:w-[70%] gap-[3vh] padding flex flex-col justify-start items-start rounded-[12px] "
        }
      >
        <div className={""}>
          <img className={""} src={Logo} alt="login" />
        </div>
        <h1 className={"text-dim-yellow font-bold text-[8.5vh] "}>
          Welcome To <span className="text-black">Furniro</span>
        </h1>
        <div className={"w-full"}>
          <div
            className={
              "flex flex-col text-[16px] justify-start items-start gap-[3vh]  border-b-2 pb-[4vh]"
            }
          >
            <h2 className={"font-bold text-[3vh]"}>Join Using:</h2>



            <button
              className="flex items-center m-auto h-[7vh] bg-white border border-gray-300 rounded-lg shadow-md  px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={googleAuth}
            >
              <img src={Google} alt="google" className="h-[3vh] w-[3vh] mr-2" />
              <span className="font text-[3vh]">
                Continue with Google
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Entry;
