import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Banner from '../../components/Banner';

const Contact = () => {
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

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <Banner title={'Contact Us'} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
         {({ values, errors, touched, handleSubmit, isSubmitting
                    , handleBlur, setFieldValue,
                    handleChange }) => {
       return <Form
          onSubmit={onSubmit}
          className="flex flex-col px-[2vh] gap-[1vh] w-full justify-center items-center"
        >
          <div className="form-control-input w-full">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" placeholder="Enter your name"/>
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
          <button className='btn-3 bg-primary' type="submit">Submit</button>
        </Form>
      }}
      </Formik>
    </div>
  );
};

export default Contact;