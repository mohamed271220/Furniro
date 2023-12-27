import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getOrders } from "../../constants/Http";

const Profile = ({ user }) => {
    const { data, isError, isPending, error, refetch } = useQuery({
        queryKey: ['profile'], queryFn: ({ signal }) => getOrders({ signal })
    });
    console.log(data);
    return (
        <div>
            {user.data.role === "admin" || user.data.role === "coolerAdmin" && (
                <div className="bg-dim-yellow h-[10vh] px-6 flex flex-row justify-between items-center gap-3">
                    <h1 className="text-[2vh] text-white">Welcome back admin!</h1>
                    <Link className="btn-3" to={"dashboard"}>
                        Admin Dashboard
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
            <p>Orders: {data?.user?.orders?.length || 0}</p>
            <p>orders goes here</p>
        </div>
    )
}

export default Profile