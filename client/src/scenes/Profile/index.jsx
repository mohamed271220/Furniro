import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAddresses, getOrders } from "../../constants/Http";
import Addresses from "../../components/Addresses";
import { useState } from "react";
import Banner from "../../components/Banner";

const Profile = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: orders, isError: isOrdersError, isPending: isOrdersPending, error: ordersError, refetch: ordersRefetch } = useQuery({
        queryKey: ['orders'], queryFn: ({ signal }) => getOrders({ signal })
    });
    const { data: addresses, isError: isAddressesError, isPending: isAddressesPending, addressesError, refetchAddresses } = useQuery({
        queryKey: ['addresses'], queryFn: ({ signal }) => getAddresses({ signal })
    });
    return (<>
        {user.data.role === "admin" || user.data.role === "coolerAdmin" ? (
            <div className="bg-dim-yellow h-[10vh] w-full px-6 flex flex-row justify-between items-center gap-3">
                <h1 className="text-[2vh] text-white">Welcome back admin!</h1>
                <Link className="btn-3" to={"/dashboard"}>
                    Admin Dashboard
                </Link>
            </div>
        ) : <Banner title={"Welcome back " + user.data.username + "!"} />}
        <div className="flex md:flex-row flex-col h-fit-content w-full p-4 justify-center  gap-3 flex-wrap">
            <div className="flex items-start content-start  md:flex-row flex-col  md:w-[40%] w-full  gap-3 flex-wrap">
                <div className=" flex flex-col w-full h-fit rounded-md justify-center items-center p-6 bg-primary gap-6 min-h-[40vh] ">
                    <p className="font-semibold text-[3vh]">{user.data.username}</p>
                    <div>
                        <img src={user.user?._json.picture} alt="profile" className="w-30 h-30 rounded-full" />
                    </div>
                    <div className=" flex flex-col w-full h-fit rounded-md justify-center items-center p-6 bg-primary text-[1.5vh] ">
                        <p>Email: {user.data.email}</p>
                        {user.data.phone && <p>Phone: {user.data.phone}</p>}
                        <p>Username: {user.data.username}</p>
                        <p>ID: {user.data._id}</p>
                    </div>
                </div>

            </div>
            <div className="flex md:flex-row flex-col md:w-[40%] w-full  justify-center items-center gap-3 flex-wrap">
                <div className="text-[2vh] w-full gap-4 flex flex-col rounded-md items-start p-6 bg-primary">
                    <p className="font-semibold text-[3vh]">Addresses</p>
                    <div className="bg-white rounded-lg w-full h-[40vh]
                    overflow-x-auto">
                        <Addresses activeAddress={user.data.activeAddress} addresses={addresses?.addresses} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refetchAddresses={refetchAddresses} />
                    </div>
                    <button className="btn-3 !bg-orange-300" type="button"
                        onClick={() => setIsModalOpen(true)}>Add Address</button>
                </div>
                <div className="text-[2vh] w-full flex flex-col rounded-md items-start p-6 bg-primary">
                    <p className="font-semibold text-[3vh]">Orders</p>
                    <div className="bg-white rounded-lg w-full min-h-[40vh] overflow-y-auto">
                        <table className='w-full' >
                            <thead>
                                <tr className=' border-none td w-full'>
                                    <th className='border-none py-2 px-4'>Created At</th>
                                    <th className='border-none py-2 px-4'>Status</th>
                                    <th className='border-none py-2 px-4'>Total Price</th>
                                </tr>
                            </thead>
                            {
                                orders?.orders?.map((order) => {
                                    return (

                                        <tbody key={order._id}>
                                            <tr className="py-2 px-4 w-full">
                                                <td className="td">{order.createdAt}</td>
                                                <td className="td">{order.status}</td>
                                                <td className="td">{order.totalPrice}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })
                            }
                        </table>
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