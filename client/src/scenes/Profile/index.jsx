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
    return (<>
        {user.data.role === "admin" || user.data.role === "coolerAdmin" && (
            <div className="bg-dim-yellow h-[10vh] w-full px-6 flex flex-row justify-between items-center gap-3">
                <h1 className="text-[2vh] text-white">Welcome back admin!</h1>
                <Link className="btn-3" to={"/dashboard"}>
                    Admin Dashboard
                </Link>
            </div>
        )}
        <div className="flex md:flex-row flex-col h-fit-content w-full p-4 justify-center  gap-3 flex-wrap">
            <div className="flex items-start content-start  md:flex-row flex-col  md:w-[40%] w-full  gap-3 flex-wrap">
                <div className=" flex flex-col w-full h-fit rounded-md justify-center items-center p-6 bg-primary gap-6">
                    <p className="font-semibold text-[3vh]">{user.data.username}</p>
                    <div>
                        <img src={user.user?._json.picture} alt="profile" className="w-30 h-30 rounded-full" />
                    </div>
                </div>
                <div className=" flex flex-col w-full h-fit rounded-md justify-center items-center p-6 bg-primary text-[1.5vh] ">
                    <p>Email: {user.data.email}</p>
                    {user.data.phone && <p>Phone: {user.data.phone}</p>}
                    <p>Username: {user.data.username}</p>
                    <p>ID: {user.data._id}</p>
                </div>
            </div>
            <div className="flex md:flex-row flex-col md:w-[40%] w-full  justify-center items-center gap-3 flex-wrap">
                <div className="text-[2vh] w-full gap-4 flex flex-col rounded-md items-start p-6 bg-primary">
                    <p className="font-semibold text-[3vh]">Addresses</p>
                    <div>
                        <Addresses addresses={addresses?.addresses} refetchAddresses={refetchAddresses} />
                    </div>
                </div>
                <div className="text-[2vh] w-full flex flex-col rounded-md items-start p-6 bg-primary">
                    <p className="font-semibold text-[3vh]">Orders</p>
                    <div>
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
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Profile


/*
      

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
      
*/