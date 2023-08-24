import { Link } from "react-router-dom";

function Signup() {
  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  return (
    <div className={""}>
      <h1 className={""}>Sign up Form</h1>
      <div className={""}>
        <div className={""}>
          <img className={""} src="" alt="signup" />
        </div>
        <div className={""}>
          <h2 className={""}>Create Account</h2>
          <input type="text" className={""} placeholder="Username" />
          <input type="text" className={""} placeholder="Email" />
          <input type="password" className={""} placeholder="Password" />
          <button className={""}>Sign Up</button>
          <p className={""}>or</p>
          <button className={""} onClick={googleAuth}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sing up with Google</span>
          </button>
          <p className={""}>
            Already Have Account ? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
