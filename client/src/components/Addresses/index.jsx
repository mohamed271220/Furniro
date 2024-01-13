import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Modal from '../Modal';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
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



const Addresses = ({ addresses }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const formSubmitHandler = async (values, onSubmitProps) => {
        const id = toast.loading("Please wait...");
        console.log(values);
        try {
            const formData = new FormData();
            formData.append("street", values.street);
            formData.append("city", values.city);
            formData.append("state", values.state);
            formData.append("state", values.state);
            formData.append("postalCode", values.postalCode);
            formData.append("country", values.country);
            setIsLoading(true);
            const response = await axios.post("/user/addresses", formData, {});
            if (response) {
                toast.update(id, {
                    render: "Product added successfully",
                    type: "success",
                    ...config,
                    isLoading: false,
                });

            }
            setIsLoading(false);
            navigate("/");
            onSubmitProps.resetForm();
            console.log(response.data);

        } catch (error) {
            toast.update(id, {
                render: "Failed to add post.",
                type: "error",
                isLoading: false,
                ...config,
            });
        }
    };
    return (
        <div>
            {
                addresses?.addresses?.map((address) => {
                    return (
                        <div key={address._id} >
                            <p>{address.street}</p>
                            <p>{address.city}</p>
                            <p>{address.state}</p>
                            <p>{address.postalCode}</p>
                            <p>{address.country}</p>
                        </div>
                    )
                })
            }

            <button onClick={() => setIsModalOpen(true)}>Add Address</button>
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