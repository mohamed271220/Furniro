const Navbar = ({ user, logout }) => {
  console.log(user);
  return (
    <div className="w-full flex flex-row  justify-between items-center padding-x py-2 sm:py-1">
      <div>Logo</div>
      <ul className="flex flex-row space-x-4">
        <li>Home</li>
        <li>Shop</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="flex flex-row space-x-4">
        {user && (
          <div className="icon">
            <button className={""} onClick={logout}>
              icon
            </button>
          </div>
        )}
        <div className="icon">Cart</div>
        <div className="icon">Favorite</div>
        <img
          src={user?.picture}
          alt="profile"
          className={"w-10 h-10 rounded-full border-2 border-black"}
        />
      </div>
    </div>
  );
};

export default Navbar;
