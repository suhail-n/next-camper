import * as yup from "yup";

export const NewCampSchema = yup.object({
    title: yup.string().required("name is required").min(3).max(100),
    rating: yup.number().required("rating is required").positive().integer().min(1).max(5),
    content: yup.string().required("content is required").min(50),
    image: yup.string().url().required('image is required'),
});