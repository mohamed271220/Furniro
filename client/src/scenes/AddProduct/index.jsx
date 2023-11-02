// Form lib
import { Field, FieldArray, Formik, getIn, Form, ErrorMessage } from "formik";

// Validation lib
import * as yup from "yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Banner from "../../components/Banner";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  sale: yup.number()
    .min(0.01, "Sale must be at least 0.01")
    .max(0.99, "Sale must be at most 0.99")
    .required("Sale is required"),
  images: yup.array().required("Images is required"),
  sizeOptions: yup
    .array()
    .of(
      yup.object().shape({
        size: yup.string(),
      })
    )
    .required("SizeOptions is required"),
  Tags: yup
    .array()
    .of(
      yup.object().shape({
        tag: yup.string(),
      })
    )
    .required("Tags is required"),
  shortDescription: yup.string().required("ShortDescription is required"),
  description: yup
    .array()
    .of(
      yup.object().shape({
        paragraph: yup.string(),
      })
    )
    .required("Description is required"),
  salesPackage: yup.string().required("SalesPackage is required"),
  modal: yup.string().required("Modal is required"),
  secondaryMat: yup.string().required("SecondaryMat is required"),
  config: yup.string().required("Config is required"),
  color: yup
    .array()
    .of(
      yup.object().shape({
        c: yup.string(),
      })
    )
    .required("Color is required"),
  fillingMat: yup.string().required("FillingMat is required"),
  load: yup.string().required("Load is required"),
  origin: yup.string().required("Origin is required"),
  width: yup.number().required("Width is required"),
  height: yup.number().required("Height is required"),
  depth: yup.number().required("Depth is required"),
  weight: yup.number().required("Weight is required"),
  seatHeight: yup.number().required("SeatHeight is required"),
  legHeight: yup.number().required("LegHeight is required"),
});

const initialValue = {
  name: "",
  price: "",
  sale: "",
  images: [],
  sizeOptions: [""],
  Tags: [""],
  shortDescription: "",
  description: [""],
  salesPackage: "",
  modal: "",
  secondaryMat: "",
  config: "",
  color: [""],
  fillingMat: "",
  load: "",
  origin: "",
  width: "",
  height: "",
  depth: "",
  weight: "",
  seatHeight: "",
  legHeight: "",
};

const AddProduct = () => {
  const [addedPhotos, setAddedPhotos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


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

  function uploadPhoto(ev) {
    setIsLoading(true);
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response);
        const { data: filenames } = response;
        // console.log(filenames);

        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    setIsLoading(true);
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
    setIsLoading(false);
  }
  function selectAsMain(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([
      filename,
      ...addedPhotos.filter((photo) => photo !== filename),
    ]);
  }
  const formSubmitHandler = async (values, onSubmitProps) => {
    const id = toast.loading("Please wait...");
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("sale", values.sale);
    formData.append("images", JSON.stringify(addedPhotos));
    formData.append("sizeOptions", JSON.stringify(values.sizeOptions));
    formData.append("Tags", JSON.stringify(values.Tags));
    formData.append("shortDescription", values.shortDescription);
    formData.append("description", JSON.stringify(values.description));
    formData.append("salesPackage", values.salesPackage);
    formData.append("modal", values.modal);
    formData.append("secondaryMat", values.secondaryMat);
    formData.append("config", values.config);
    formData.append("color", JSON.stringify(values.color));
    formData.append("fillingMat", values.fillingMat);
    formData.append("load", values.load);
    formData.append("origin", values.origin);
    formData.append("width", values.width);
    formData.append("height", values.height);
    formData.append("depth", values.depth);
    formData.append("weight", values.weight);
    formData.append("seatHeight", values.seatHeight);
    formData.append("legHeight", values.legHeight);

    setIsLoading(true);
    try {
      const response = await axios.post(`/admin/product`, formData, {});
      // const savedUser = await response.json();
      if (response) {

        toast.update(id, {
          render: "Product added successfully",
          type: "success",
          ...config,
          isLoading: false,
        });

      }
      onSubmitProps.resetForm();
      setIsLoading(false);
      navigate("/");
      return savedUser;
    } catch (err) {
      toast.update(id, {
        render: "Failed to add product.",
        type: "error",
        isLoading: false,
        ...config,
      });
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Banner title={"Add a Product"} path={["Home", "Admin", "Add product"]} />
      <Formik
        onSubmit={formSubmitHandler}
        validationSchema={productSchema}
        initialValues={initialValue}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-[2vh] p-[4vh]"
          >
            <div>
              <div className="form-control">
                <div className="form-control-input">
                  <label htmlFor="name">name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter the name of the product"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className={errors.name && touched.name ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.name && touched.name ? errors.name : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="price">price</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter the price(minimum 20)"
                    min="20"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className={errors.price && touched.price ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.price && touched.price ? errors.price : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="sale">sale</label>
                  <input
                    type="number"
                    name="sale"
                    id="sale"
                    min="0.00"
                    max="0.99"
                    step="0.01"
                    placeholder="Enter the sale(minimum 0.00 for no sale and maximum 0.99 for 99% sale)"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sale}
                    className={errors.sale && touched.sale ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.sale && touched.sale ? errors.sale : ""}
                  </p>
                </div>

                <div className="form-control-input ">
                  <FieldArray name="sizeOptions">
                    {(arrayHelpers) => (
                      <div>
                        <h3>Add sizes</h3>
                        {values.sizeOptions.map((option, i) => {
                          const sizeErrors =
                            (errors.sizeOptions?.length &&
                              errors.sizeOptions[i]) ||
                            {};
                          const sizeTouched =
                            (touched.sizeOptions?.length &&
                              touched.sizeOptions[i]) ||
                            {};
                          return (
                            <div className="inner-div" key={i}>
                              <label htmlFor={`sizeOptions.${i}.size}`}>
                                size
                              </label>
                              <Field
                                type="text"
                                name={`sizeOptions.${i}.size`}
                                placeholder="Enter the size of the product (eg: sm,md,lg,xl)"
                                className={
                                  "form-control" +
                                  (sizeErrors.name && sizeTouched.name
                                    ? " is-invalid"
                                    : "")
                                }
                              />

                              <ErrorMessage
                                name={`sizeOptions.${i}.size`}
                                component="div"
                                className="invalid-feedback"
                              />
                              <div>
                                <button
                                  className="btn-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    arrayHelpers.remove(i);
                                  }}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <button
                          className="btn-3"
                          onClick={(e) => {
                            e.preventDefault();
                            arrayHelpers.push({ size: "" });
                            // console.log(values.sizeOptions)
                          }}
                        >
                          Add another size
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="form-control-input">
                  <FieldArray name="Tags">
                    {(arrayHelpers) => (
                      <div>
                        <h3>Add tags</h3>
                        {values.Tags.map((tag, index) => {
                          const tagErrors =
                            (errors.Tags?.length && errors.Tags[index]) || {};
                          const tagTouched =
                            (touched.Tags?.length && touched.Tags[index]) || {};
                          return (
                            <div className="inner-div" key={index}>
                              <label htmlFor={`Tags.${index}.tag`}>tag</label>
                              <Field

                                type="text"
                                name={`Tags.${index}.tag`}
                                placeholder="Enter the tag of the product (eg: new,hot)"
                                id="tag"
                                className={
                                  "form-control" +
                                  (tagErrors.tag && tagTouched.tag
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name={`Tags.${index}.tag`}
                                component="div"
                                className="invalid-feedback"
                              />
                              <div>
                                <button
                                  className="btn-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    arrayHelpers.remove(index);
                                  }}
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <button
                          className="btn-3"
                          onClick={(e) => {
                            e.preventDefault();
                            arrayHelpers.push({ tag: "" });
                            // console.log(values.sizeOptions)
                          }}
                        >
                          Add another tag
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="form-control-input">
                  <label htmlFor="shortDescription">short description</label>
                  <textarea
                    name="shortDescription"
                    id="shortDescription"
                    placeholder="Enter the short description of the product"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.shortDescription}
                    className={
                      errors.shortDescription && touched.shortDescription
                        ? "error"
                        : ""
                    }
                  />
                  <p className="error-message">
                    {errors.shortDescription && touched.shortDescription
                      ? errors.shortDescription
                      : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <FieldArray name="description">
                    {(arrayHelpers) => (
                      <div className="">
                        <h3>Add description paragraphs</h3>
                        {values.description.map((p, index) => {
                          const paragraphErrors =
                            (errors.description?.length &&
                              errors.description[index]) ||
                            {};
                          const paragraphTouched =
                            (touched.description?.length &&
                              touched.description[index]) ||
                            {};

                          return (
                            <div key={index} className="inner-div">
                              <label htmlFor={`description.${index}.paragraph`}>
                                paragraph
                              </label>
                              <Field
                                as="textarea"
                                type="text"
                                placeholder="Enter detailed paragraphs of the product"
                                name={`description.${index}.paragraph`}
                                className={
                                  "form-control" +
                                  (paragraphErrors.paragraph &&
                                    paragraphTouched.paragraph
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name={`description.${index}.paragraph`}
                                component="div"
                                className="invalid-feedback"
                              />
                              <button
                                className="btn-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  arrayHelpers.remove(index);
                                }}
                              >
                                -
                              </button>
                            </div>
                          );
                        })}
                        <button
                          className="btn-3"
                          onClick={(e) => {
                            e.preventDefault();
                            arrayHelpers.push({ paragraph: "" });
                            // console.log(values.sizeOptions)
                          }}
                        >
                          Add another paragraph
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="form-control-input">
                  <label htmlFor="salesPackage">Sales package</label>
                  <textarea
                    name="salesPackage"
                    id="salesPackage"
                    placeholder="Enter what's in the package of the product"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.salesPackage}
                    className={
                      errors.salesPackage && touched.salesPackage ? "error" : ""
                    }
                  />
                  <p className="error-message">
                    {errors.salesPackage && touched.salesPackage
                      ? errors.salesPackage
                      : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="modal">Modal</label>
                  <input
                    type="text"
                    name="modal"
                    placeholder="Enter the modal of the product"
                    id="modal"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.modal}
                    className={errors.modal && touched.modal ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.modal && touched.modal ? errors.modal : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="secondaryMat">Secondary material</label>
                  <input
                    type="text"
                    name="secondaryMat"
                    id="secondaryMat"
                    placeholder="Enter the secondary material of the product"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.secondaryMat}
                    className={
                      errors.secondaryMat && touched.secondaryMat ? "error" : ""
                    }
                  />
                  <p className="error-message">
                    {errors.secondaryMat && touched.secondaryMat
                      ? errors.secondaryMat
                      : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="config">config</label>
                  <input
                    type="text"
                    name="config"
                    placeholder="Enter the configuration of the product"
                    id="config"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.config}
                    className={errors.config && touched.config ? "error" : ""}
                  />

                  <p className="error-message">
                    {errors.config && touched.config ? errors.config : ""}
                  </p>
                </div>
                <div className="form-control-input">
                  <FieldArray name="color">
                    {(arrayHelpers) => (
                      <div>
                        <h3>Colors</h3>
                        {values.color.map((c, index) => {
                          const colorErrors =
                            (errors.color?.length && errors.color[index]) || {};
                          const colorTouched =
                            (touched.color?.length && touched.color[index]) ||
                            {};

                          return (
                            <div key={index} className="inner-div">
                              <label htmlFor={`color.${index}.c`}>color</label>
                            <div className="flex flex-col !mt-0 !gap-0 justify-center bg-white text-[2vh] rounded text-gray-300">
                            <span className="m-0 ">Code</span>
                              <Field
                                type="color"
                                name={`color.${index}.c`}
                                id="c"
                                
                                className={
                                  "!m-0  appearance-none w-[10vh] h-[10vh] border border-gray-300 rounded-full" +
                                  (colorErrors.c && colorTouched.c
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </div>
                            
                              <ErrorMessage
                                name={`color.${index}.c`}
                                component="div"
                                className="invalid-feedback"
                              />
                              <button
                                className="btn-3"
                                onClick={(e) => {
                                  e.preventDefault();
                                  arrayHelpers.remove(index);
                                }}
                              >
                                -
                              </button>
                            </div>
                          );
                        })}
                        <button
                          className="btn-3"
                          onClick={(e) => {
                            e.preventDefault();
                            arrayHelpers.push({ c: "" });
                            // console.log(values.sizeOptions)
                          }}
                        >
                          Add another color
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="form-control-input">
                  <label htmlFor="fillingMat">filling material</label>
                  <input
                    type="text"
                    name="fillingMat"
                    id="fillingMat"
                    placeholder="Enter the filling material of the product"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fillingMat}
                    className={
                      errors.fillingMat && touched.fillingMat ? "error" : ""
                    }
                  />
                  <p className="error-message">
                    {errors.fillingMat && touched.fillingMat
                      ? errors.fillingMat
                      : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="load">load</label>
                  <input
                    type="text"
                    name="load"
                    id="load"
                    placeholder="Enter the load of the product in KG"
                    min={0}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.load}
                    className={errors.load && touched.load ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.load && touched.load ? errors.load : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="origin">origin</label>
                  <input
                    type="text"
                    name="origin"
                    id="origin"
                    placeholder="Enter the origin of the product (eg: Egypt)"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.origin}
                    className={errors.origin && touched.origin ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.origin && touched.origin ? errors.origin : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="width">width</label>
                  <input
                    type="number"
                    name="width"
                    id="width"
                    placeholder="Enter the width of the product in cm"
                    min='0'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.width}
                    className={errors.width && touched.width ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.width && touched.width ? errors.width : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="height">height</label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    min='0'
                    placeholder="Enter the height of the product in cm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.height}
                    className={errors.height && touched.height ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.height && touched.height ? errors.height : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="depth">depth</label>
                  <input
                    type="number"
                    name="depth"
                    id="depth"
                    min='0'
                    placeholder="Enter the depth of the product in cm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.depth}
                    className={errors.depth && touched.depth ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.depth && touched.depth ? errors.depth : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="weight">weight</label>
                  <input
                    type="number"
                    name="weight"
                    min='0'
                    id="weight"
                    placeholder="Enter the weight of the product in KG"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.weight}
                    className={errors.weight && touched.weight ? "error" : ""}
                  />
                  <p className="error-message">
                    {errors.weight && touched.weight ? errors.weight : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="seatHeight">seat height</label>
                  <input
                    type="number"
                    name="seatHeight"
                    id="seatHeight"
                    min='0'
                    placeholder="Enter the seat height of the product in cm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.seatHeight}
                    className={
                      errors.seatHeight && touched.seatHeight ? "error" : ""
                    }
                  />
                  <p className="error-message">
                    {errors.seatHeight && touched.seatHeight
                      ? errors.seatHeight
                      : ""}
                  </p>
                </div>

                <div className="form-control-input">
                  <label htmlFor="legHeight">leg height</label>
                  <input
                    type="number"
                    name="legHeight"
                    min='0'
                    placeholder="Enter the leg height of the product in cm"
                    id="legHeight"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.legHeight}
                    className={
                      errors.legHeight && touched.legHeight ? "error" : ""
                    }
                  />
                  <p className="error-message">
                    {errors.legHeight && touched.legHeight
                      ? errors.legHeight
                      : ""}
                  </p>
                </div>

                {/* //add images */}
                <div className="form-control__collection">
                  <label htmlFor="file" className="label-upload">Upload Images</label>
                  {addedPhotos.length > 0 &&
                    addedPhotos.map((link) => (
                      <div className="form-control__uploader" key={link}>
                        <img
                          src={link}
                          alt=""
                        />
                        <button
                          onClick={(ev) => removePhoto(ev, link)}
                          className="btn-1 "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>

                        <button
                          onClick={(ev) => selectAsMain(ev, link)}
                          className="btn-2"
                        >
                          {link === addedPhotos[0] && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="btn-icon"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {link !== addedPhotos[0] && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="btn-icon"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    ))}
                  <label className="form-control__label">
                    <input
                      type="file"
                      multiple
                      name="file"
                      readId=""
                      className="hidden"
                      onChange={uploadPhoto}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    Upload
                  </label>
                </div>
              </div>
            </div>
            <button
              disabled={isLoading
              }
              className="btn-3 bg-[#fdd49e]" type="submit">
              Submit
            </button>
          </form>
        )}
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

export default AddProduct;
