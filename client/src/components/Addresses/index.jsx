import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Modal from '../Modal';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa';
import './index.css';
const addressSchema = Yup.object().shape({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
});

const initialAddressValues = {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
};



const Addresses = ({ addresses, activeAddress, isModalOpen, setIsModalOpen }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(activeAddress);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [modalError, setModalError] = useState(false)

    const config = {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    };

    const handleActiveChange = async (id) => {
        setIsLoading(true);
        try {
            const response = await axios.put('/user/addresses', { address: id });
            if (response.status === 200) {
                setSelectedAddress(id);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const formSubmitHandler = async (values, onSubmitProps) => {
        const id = toast.loading("Please wait...");
        try {
            const data = {
                street: values.street,
                city: values.city,
                state: values.state,
                postalCode: values.postalCode,
                country: values.country
            };
            setIsLoading(true);
            const response = await axios.post("/user/addresses", data, {});
            if (response) {
                toast.update(id, {
                    render: "Address added successfully",
                    type: "success",
                    ...config,
                    isLoading: false,
                });

            }
            setIsLoading(false);
            setIsModalOpen(false);
            onSubmitProps.resetForm();
            console.log(response.data);

        } catch (error) {
            toast.update(id, {
                render: "Failed to add address.",
                type: "error",
                isLoading: false,
                ...config,
            });
            setIsLoading(false);
            setModalError("Failed to add address.");
        }
    };
    return (
        <div>
            <table className='w-full'>
                <thead>
                    <tr className=' border-none td w-full'>
                        <th className='border-none py-2 px-4'>Active</th>
                        <th className='border-none py-2 px-4'>Street</th>
                        <th className='border-none py-2 px-4'>City</th>
                        <th className='border-none py-2 px-4'>State</th>
                        <th className='border-none py-2 px-4 w-24 whitespace-nowrap'>Postal Code</th>
                        <th className='border-none py-2 px-4'>Country</th>
                    </tr>
                </thead>
                {
                    addresses?.map((address) => {
                        return (
                            <tbody key={address._id}>
                                <tr className='p-0  px-4 w-full'>
                                    <td className='td'>
                                        {isLoading ? (
                                            <div className="spinner"></div>
                                        ) : (
                                            <button
                                                className={`text-[1.3vh] rounded-lg py-[1vh] px-[3vh]  ${selectedAddress === address._id ? 'bg-green-500 text-white' : 'bg-slate-200'}`}
                                                onClick={() => handleActiveChange(address._id)}
                                            >
                                                {selectedAddress === address._id ? <FaCheck /> : <FaTimes />}
                                            </button>
                                        )}
                                    </td>
                                    <td className='td'>{address.street}</td>
                                    <td className='td'>{address.city}</td>
                                    <td className='td'>{address.state}</td>
                                    <td className='td'>{address.postalCode}</td>
                                    <td className='td'>{address.country}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>

            {isModalOpen && (
                <Modal title="Add Address" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isForm={true}>
                    <Formik
                        initialValues={initialAddressValues}
                        validationSchema={addressSchema}
                        onSubmit={formSubmitHandler}
                    >
                        {({ errors, isSubmitting, handleSubmit }) => (
                            <Form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                                method="POST"
                                className='flex flex-col gap-6'>
                                <div className="form-control">
                                    <div className="form-control-input">
                                        <label htmlFor="street">Street</label>
                                        <Field id="street" name="street" />
                                        <ErrorMessage name="street" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-control-input">
                                        <label htmlFor="city">City</label>
                                        <Field id="city" name="city" />
                                        <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-control-input">
                                        <label htmlFor="state">State</label>
                                        <Field id="state" name="state" />
                                        <ErrorMessage name="state" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-control-input">
                                        <label htmlFor="postalCode">Postal Code</label>
                                        <Field id="postalCode" name="postalCode" />
                                        <ErrorMessage name="postalCode" component="div" className="invalid-feedback" />
                                    </div>

                                    <div className="form-control-input">
                                        <label htmlFor="country">Country</label>
                                        <Field id="country" name="country" />
                                        <ErrorMessage name="country" component="div" className="invalid-feedback" />
                                    </div>
                                </div>

                                <button type="submit" disabled={isSubmitting || Object.keys(errors).length !== 0 || isLoading}
                                    className="btn-3 bg-[#fdd49e]" >
                                    Submit
                                </button>
                                {modalError && <p className="invalid-feedback">{modalError}</p>}
                            </Form>
                        )}
                    </Formik>
                </Modal>
            )}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Addresses