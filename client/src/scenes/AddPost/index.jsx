import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Banner from "../../components/Banner";

const blogPostSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    tag: Yup.string().required("Tag is required"),
    image: Yup.string(),
    body: Yup.array().of(
        Yup.object().shape({
            type: Yup.string().oneOf(["title", "paragraph", "image"]).required(),
            content: Yup.string().required(),
        })
    ),
});

const initialValues = {
    title: "",
    author: "",
    image: "",
    tag: "",
    body: [{ type: "title", content: "" }],
};


const BlogPostForm = () => {
    const [addedPhotos, setAddedPhotos] = useState();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const setFieldValueRef = useRef();

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
        const file = ev.target.files;
        const data = new FormData();
        data.append("photos", file[0]);
        axios
            .post("/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                const { data: filename } = response;
                setFieldValueRef.current('image', filename[0]); // Use the setFieldValue function
                setAddedPhotos(filename[0])
                setIsLoading(false);
            })
            .catch((error) => {
                
                setIsLoading(false);
            });
    }
    function removePhoto() {
        setIsLoading(true);
        setAddedPhotos('');
        setIsLoading(false);
    }

    const formSubmitHandler = async (values, onSubmitProps) => {
        const id = toast.loading("Please wait...");
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("author", values.author);
            formData.append("image", values.image);
            formData.append("tag", values.tag);
            formData.append("body", JSON.stringify(values.body));
            setIsLoading(true);

            const response = await axios.post("/admin/post", formData, {});
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

        } catch (error) {
            setIsLoading(false);
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
            <Banner title={'Add Post'} path={["Home", "Admin", "Add Post"]} />
            <Formik
                initialValues={initialValues}
                validationSchema={blogPostSchema}
                onSubmit={formSubmitHandler}
            >
                {({ values, errors, touched, handleSubmit, isSubmitting
                    , handleBlur, setFieldValue,
                    handleChange }) => {
                    // Store a reference to the setFieldValue function
                    const isFormEmpty = Object.values(values).some((value) => value === '');

                    setFieldValueRef.current = setFieldValue;
                    return <Form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        method="POST"
                        className="flex flex-col gap-[2vh] p-[4vh]"
                    >
                        <div className="form-control">
                            <div className="form-control-input">
                                <label htmlFor="title">Title</label>
                                <Field type="text" name="title" placeholder="Write an attractive title." />
                                <ErrorMessage name="title" component="div"
                                    className="invalid-feedback" />
                            </div>
                            <div className="form-control-input">
                                <label htmlFor="author">Author</label>
                                <Field type="text" name="author" placeholder="What is the name you want to appear with?" />
                                <ErrorMessage name="author" component="div"
                                    className="invalid-feedback" />
                            </div>
                            <div className="form-control-input">
                                <label htmlFor="tag">Tag</label>
                                <Field type="text" name="tag" placeholder="Put a relevant tag." />
                                <ErrorMessage name="tag" component="div"
                                    className="invalid-feedback" />
                            </div>


                            <div className="form-control__collection">
                                <label htmlFor="file" className="label-upload">Upload Article&rsquo;s main image</label>
                                {addedPhotos &&
                                    <>
                                        <div className="form-control__uploader">
                                            <img src={addedPhotos}
                                                alt="" />
                                            <button
                                                onClick={() => removePhoto()}
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


                                        </div>
                                    </>

                                }

                                <label className="form-control__label">
                                    <input
                                        type="file"
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


                            <div className="form-control-input">
                                <FieldArray name="body">
                                    {(arrayHelpers) => (
                                        <div>
                                            <h3>Add body sections</h3>
                                            {values.body.map((section, index) => {
                                                const sectionErrors =
                                                    (errors.body?.length && errors.body[index]) || {};
                                                const sectionTouched =
                                                    (touched.body?.length && touched.body[index]) || {};
                                                return (
                                                    <div className="inner-div" key={index}>
                                                        <label htmlFor={`body.${index}.type`}>Type</label>
                                                        <Field
                                                            as="select"
                                                            name={`body.${index}.type`}
                                                            className={
                                                                "form-control w-full  p-3 bg-primary" +
                                                                (sectionErrors.type && sectionTouched.type ? " is-invalid" : "")
                                                            }
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                if (e.target.value !== "image") {
                                                                    setFieldValue(`body.${index}.content`, "");
                                                                }
                                                            }}

                                                        >
                                                            <option className="p-1" value="title">Title</option>
                                                            <option className="p-1" value="paragraph">Paragraph</option>
                                                            <option className="p-1" value="image">Image</option>
                                                        </Field>
                                                        <ErrorMessage component="div"
                                                            className="invalid-feedback" name={`body.${index}.type`} />

                                                        {values.body[index].type === "image" && (
                                                            <>
                                                                <label className="!font-semibold" htmlFor={`body.${index}.content`}>Image URL</label>
                                                                <Field
                                                                    as="input"
                                                                    type="text"
                                                                    name={`body.${index}.content`}
                                                                    placeholder="https://example.com/image.jpg"
                                                                    className={
                                                                        "form-control w-full" +
                                                                        (sectionErrors.content && sectionTouched.content
                                                                            ? " is-invalid"
                                                                            : "")
                                                                    }
                                                                    validate={(value) => {
                                                                        if (values.body[index].type === "image") {
                                                                            if (!value) {
                                                                                return "Image URL is required";
                                                                            }
                                                                            if (!/^https?:\/\/.+/.test(value)) {
                                                                                return "Invalid URL";
                                                                            }
                                                                        }
                                                                        return undefined;
                                                                    }}
                                                                />
                                                                <ErrorMessage
                                                                    component="div"
                                                                    className="invalid-feedback"
                                                                    name={`body.${index}.content`} />

                                                                {values.body[index].content && (
                                                                    <img
                                                                        src={values.body[index].content}
                                                                        alt="Image"
                                                                        onLoad={() => {
                                                                            // Set a flag to indicate that the image has loaded successfully
                                                                            arrayHelpers.replace(index, {
                                                                                type: "image",
                                                                                content: values.body[index].content,
                                                                                isValid: true,
                                                                            });
                                                                        }}
                                                                        onError={() => {
                                                                            // Set a flag to indicate that the image has failed to load
                                                                            arrayHelpers.replace(index, {
                                                                                type: "image",
                                                                                content: values.body[index].content,
                                                                                isValid: false,
                                                                            });
                                                                        }}
                                                                    />
                                                                )}

                                                                {!values.body[index].isValid && (
                                                                    <div className="invalid-feedback">Invalid image URL</div>
                                                                )}
                                                            </>
                                                        )}

                                                        {values.body[index].type !== "image" && (
                                                            <>
                                                                <label htmlFor={`body.${index}.content`}>Content</label>
                                                                <Field
                                                                    as="textarea"
                                                                    name={`body.${index}.content`}
                                                                    placeholder="Write something..."
                                                                    className={
                                                                        "form-control w-full" +
                                                                        (sectionErrors.content && sectionTouched.content
                                                                            ? " is-invalid"
                                                                            : "")
                                                                    }
                                                                />
                                                                <ErrorMessage name={`body.${index}.content`}
                                                                    component="div"
                                                                    className="invalid-feedback"
                                                                />
                                                            </>
                                                        )}

                                                        <button type="button" className="btn-3" onClick={() => arrayHelpers.remove(index)}>
                                                            -
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            <button
                                                className="btn-3"
                                                type="button"
                                                onClick={() => arrayHelpers.push({ type: "title", content: "" })}
                                            >
                                                Add another section
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                        </div>
                        <button type="submit" disabled={isFormEmpty || !addedPhotos || isSubmitting || Object.keys(errors).length !== 0 || isLoading}
                            className="btn-3 bg-[#fdd49e]" >
                            Submit
                        </button>
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
export default BlogPostForm