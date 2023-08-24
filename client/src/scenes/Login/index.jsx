import { Link } from "react-router-dom";


function Login() {
	const googleAuth = () => {
		console.log(import.meta.env.VITE_REACT_APP_API_URL);
		window.open(
			`${import.meta.env.VITE_REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	return (
		<div className={''}>
			<h1 className={''}>Log in Form</h1>
			<div className={''}>
				<div className={''}>
					<img className={''} src="" alt="login" />
				</div>
				<div className={''}>
					<h2 className={''}>Members Log in</h2>
					<input type="text" className={''} placeholder="Email" />
					<input type="text" className={''} placeholder="Password" />
					<button className={''}>Log In</button>
					<p className={''}>or</p>
					<button className={''} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing in with Google</span>
					</button>
					<p className={''}>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;