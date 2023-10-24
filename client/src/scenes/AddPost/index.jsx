import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";

const blogPostSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    image: Yup.string().required("Image URL is required"),
    tags: Yup.array().of(Yup.string()),
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
    tags: [],
    body: [{ type: "title", content: "" }],
};


const BlogPostForm = () => {
    const [addedPhotos, setAddedPhotos] = useState();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);



    function uploadPhoto(ev) {
        setIsLoading(true);
        const file = ev.target.file;
        const data = new FormData();
        data.append("image", file);

        axios
            .post("/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // console.log(response);
                const { data: filename } = response;
                // console.log(filenames);

                setAddedPhotos(filename)

            })
            .catch((error) => {
                console.log(error);
            });
        setIsLoading(false);
    }
    function removePhoto(ev, filename) {
        ev.preventDefault();
        setIsLoading(true);
        setAddedPhotos('');
        setIsLoading(false);
    }

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post("/api/blog-posts", values);
            console.log(response.data);
            setSubmitting(false);
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    return (
        <div>
            <Banner title={'Add Post'} path={["Home", "Admin", "Add Post"]} />
            <Formik
                initialValues={initialValues}
                validationSchema={blogPostSchema}
                onSubmit={onSubmit}
            >
                {({ values, errors, touched, isSubmitting }) => (
                    <Form>
                        <label htmlFor="title">Title</label>
                        <Field type="text" name="title" />
                        <ErrorMessage name="title" />

                        <label htmlFor="author">Author</label>
                        <Field type="text" name="author" />
                        <ErrorMessage name="author" />

                        <label htmlFor="image">Image URL</label>
                        <div className="form-control__collection">
                            <label htmlFor="file" className="label-upload">Upload Images</label>
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
                
                        <label htmlFor="tags">Tags</label>
                        <FieldArray name="tags">
                            {(arrayHelpers) => (
                                <div>
                                    {values.tags.map((tag, index) => (
                                        <div key={index}>
                                            <Field name={`tags.${index}`} />
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)}
                                            >
                                                -
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.push("")}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </FieldArray>

                        <label htmlFor="body">Body</label>
                        <FieldArray name="body">
                            {(arrayHelpers) => (
                                <div>
                                    {values.body.map((section, index) => (
                                        <div key={index}>
                                            <label htmlFor={`body.${index}.type`}>Type</label>
                                            <Field
                                                as="select"
                                                name={`body.${index}.type`}
                                                validate={(value) => {
                                                    const otherSections = values.body.filter(
                                                        (s, i) => i !== index
                                                    );
                                                    const hasDuplicate = otherSections.some(
                                                        (s) => s.type === value
                                                    );
                                                    return hasDuplicate
                                                        ? "Duplicate section type"
                                                        : undefined;
                                                }}
                                            >
                                                <option value="title">Title</option>
                                                <option value="paragraph">Paragraph</option>
                                                <option value="image">Image</option>
                                            </Field>
                                            <ErrorMessage name={`body.${index}.type`} />

                                            <label htmlFor={`body.${index}.content`}>Content</label>
                                            <Field
                                                as="textarea"
                                                name={`body.${index}.content`}
                                            />
                                            <ErrorMessage name={`body.${index}.content`} />

                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)}
                                            >
                                                -
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.push({ type: "title", content: "" })}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </FieldArray>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
export default BlogPostForm