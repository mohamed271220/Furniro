import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Banner from '../../components/Banner';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';



const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    message: Yup.string()
      .required('Required'),
  });

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
    setIsLoading(true);
  
    try {
      const response = await axios.post('/contact', values);
      if (response.status === 200) {
        toast.update(id, {
          render: "Thanks for the kind words!",
          type: "success",
          ...config,
          isLoading: false
        });
        setIsLoading(false);
        navigate("/contact");
        onSubmitProps.resetForm();
      }
    } catch (error) {
      toast.update(id, {
        render: "Something went wrong",
        type: "error",
        ...config,
        isLoading: false,
      });
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Banner title={'Contact Us'} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={formSubmitHandler}
      >
        {({ values, errors, touched, handleSubmit, isSubmitting
          , handleBlur, setFieldValue,
          handleChange }) => {
          const isFormEmpty = Object.values(values).some((value) => value === '');

          return <Form
            onSubmit={handleSubmit}
            method="POST"
            className="flex flex-col px-[2vh] gap-[1vh] w-full justify-center items-center"
          >
            <div className="form-control-input w-full">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" placeholder="Enter your name" />
              <ErrorMessage className="invalid-feedback" name="name" component="div" />
            </div>
            <div className="form-control-input w-full">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" placeholder="Enter your email" />
              <ErrorMessage className="invalid-feedback" name="email" component="div" />
            </div>
            <div className="form-control-input w-full">
              <label htmlFor="message">Message</label>
              <Field name="message" type="text" as="textarea" placeholder="Leave a message ! (;" />
              <ErrorMessage className="invalid-feedback" name="message" component="div" />
            </div>
            <button type='submit'  disabled={isFormEmpty || isSubmitting || Object.keys(errors).length !== 0 || isLoading} className='btn-3 bg-primary' >Submit</button>
          </Form>
        }}
      </Formik>
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
  );
};

export default Contact;