import { Link } from "react-router-dom";
import Logo from "../../assets/icons/LOGO.svg";
import Google from "../../assets/icons/google.svg";
function Login() {
  const googleAuth = () => {
    console.log(import.meta.env.VITE_REACT_APP_API_URL);
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center  ">
      <div
        className={
          " bg-primary w-[70%] gap-[3vh] padding flex flex-col justify-start items-start rounded-[12px] "
        }
      >
        <div className={""}>
          <img className={""} src={Logo} alt="login" />
        </div>
        <h1 className={"text-dim-yellow font-bold text-[56px] "}>
          Welcome Back
        </h1>
        <div className={"w-full"}>
          <div
            className={
              "flex flex-col text-[16px] justify-start items-start gap-[3vh] "
            }
          >
            <h2 className={"font-bold text-[16px]"}>Log in</h2>
            <input
              type="text"
              className={"w-full h-10 rounded-lg p-5"}
              placeholder="Email"
            />
            <input
              type="text"
              className={"w-full h-10 rounded-lg p-5"}
              placeholder="Password"
            />
            <button className="bg-dim-yellow text-white font-bold px-5 py-2 w-[50%]">
              Log In
            </button>
            <p className={"font-semibold text-[16px]"}>or</p>

            <button
              className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={googleAuth}
            >
              <img src={Google} alt="google" className="h-6 w-6 mr-2" />
              <span className="font-bold text-[16px]">
                Continue with Google
              </span>
            </button>
            <p className={"font-semibold text-[16px]"}>
              New Here ?{" "}
              <Link
                className="text-dim-yellow underline hover:text-blue-500"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
