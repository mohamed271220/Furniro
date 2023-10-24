import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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


    return (
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
                    <Field type="text" name="image" />
                    <ErrorMessage name="image" />

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
    );
};
export default BlogPostForm