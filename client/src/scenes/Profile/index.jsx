import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAddresses, getOrders } from "../../constants/Http";
import Addresses from "../../components/Addresses";

const Profile = ({ user }) => {
    const { data: orders, isError: isOrdersError, isPending: isOrdersPending, error: ordersError, refetch: ordersRefetch } = useQuery({
        queryKey: ['orders'], queryFn: ({ signal }) => getOrders({ signal })
    });
    const { data: addresses, isError: isAddressesError, isPending: isAddressesPending, addressesError, refetchAddresses } = useQuery({
        queryKey: ['addresses'], queryFn: ({ signal }) => getAddresses({ signal })
    });
    return (
        <div>
            {user.data.role === "admin" || user.data.role === "coolerAdmin" && (
                <div className="bg-dim-yellow h-[10vh] px-6 flex flex-row justify-between items-center gap-3">
                    <h1 className="text-[2vh] text-white">Welcome back admin!</h1>
                    <Link className="btn-3" to={"/dashboard"}>
                        Admin Dashboard
                    </Link>
                </div>
            )}
            <p>Name: {user.data.username}</p>
            <p>Email: {user.data.email}</p>
            <p>Phone: {user.data.phone}</p>
            <p>Username: {user.data.username}</p>
            <p>ID: {user.data._id}</p>
            <p>Role: {user.data.role}</p>
            <p>Status: {user.data.status}</p>
            <p>Created at: {user.data.createdAt}</p>
            <p>Updated at: {user.data.updatedAt}</p>
            <p>Orders: {orders?.orders?.length || 0}</p>
            <p>orders goes here</p>
            {
                orders?.orders?.map((order) => {
                    return (
                        <div key={order._id} >
                            <p>{order.createdAt}</p>
                            <p>{order.status}</p>
                            <p>{order.totalPrice}</p>
                        </div>
                    )
                })
            }
        <Addresses addresses={addresses} />
        </div>
    )
}

export default Profile