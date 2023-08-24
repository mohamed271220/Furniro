

function Home(userDetails) {
	const user = userDetails.user;
	const logout = () => {
		window.open(`${import.meta.env.VITE_REACT_APP_API_URL}/logout`, "_self");
	};
	return (
		<div className={""}>
			<h1 className={""}>Home</h1>
			<div className={""}>
				<div className={""}>
					<img className={""} src="./images/profile.jpg" alt="login" />
				</div>
				<div className={""}>
					<h2 className={""}>Profile</h2>
					<img
						src={user.picture}
						alt="profile"
						className={""}
					/>
					<input
						type="text"
						defaultValue={user.name}
						className={""}
						placeholder="UserName"
					/>
					<input
						type="text"
						defaultValue={user.email}
						className={""}
						placeholder="Email"
					/>
					<button className={""} onClick={logout}>
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;