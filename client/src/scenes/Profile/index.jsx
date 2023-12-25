import { Link } from "react-router-dom";

const Profile = ({ user }) => {
    console.log(user);
    return (
        <div>
            {user.data.role === "admin" || user.data.role === "coolerAdmin" && (
                <div className="bg-dim-yellow h-[10vh] px-6 flex flex-row justify-between items-center">
                    <h1 className="text-[2vh] text-white">Looks like you&apos;re an admin!</h1>
                    <Link className="btn-3" to={"dashboard"}>
                        Go to Admin Dashboard
                    </Link>
                </div>
            )}
            <h1>Profile</h1>
            <p>Name: {user.data.username}</p>
            <p>Email: {user.data.email}</p>
            <p>Phone: {user.data.phone}</p>
            <p>Username: {user.data.username}</p>
            <p>ID: {user.data._id}</p>
            <p>Role: {user.data.role}</p>
            <p>Status: {user.data.status}</p>
            <p>Created at: {user.data.createdAt}</p>
            <p>Updated at: {user.data.updatedAt}</p>
        </div>
    )
}

export default Profile