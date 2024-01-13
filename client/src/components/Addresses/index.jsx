import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Modal from '../Modal';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                        onSubmit={(values, { resetForm }) => {
                            // handle form submission
                            console.log(values);
                            resetForm();
                            setIsModalOpen(false);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className='flex flex-col'>
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

                                <button type="submit">Submit</button>
                            </Form>
                        )}
                    </Formik>
                </Modal>
            )}
        </div>
    )
}

export default Addresses