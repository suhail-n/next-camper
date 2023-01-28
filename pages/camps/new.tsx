import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast, { Toaster } from "react-hot-toast";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewCampSchema } from "../../validation/camps";
import { Figure } from "react-bootstrap";
import { useRouter } from "next/router";

type CampInputs = {
  title: string;
  rating: number;
  image: string;
  content: string;
};

const NewCampPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CampInputs>({
    resolver: yupResolver(NewCampSchema),
  });
  const image = useWatch({
    control,
    name: "image",
  });
  /**
   * @param {Event} event
   */
  const onSubmitHandler: SubmitHandler<CampInputs> = async ({
    title,
    content,
    image,
    rating,
  }) => {
    const response = await fetch("/api/camps", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        image,
        rating,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const status = response.status;
    if (status === 200) {
      const body = await response.json();
      toast.success("Successfully created camp!");
      console.log(JSON.stringify(body));
      reset();
    } else if (status === 400) {
      toast.error("Failed creation with validation error");
    } else if (status === 401) {
      router.push("/api/auth/signin");
    } else {
      toast.error("Something went wrong. Pleast contact support.");
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <Toaster position="top-center" reverseOrder={true} />
      <Form.Group controlId="formCampTitle" className="m-3">
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder="Title..." {...register("title")} />
        {errors.title?.message && (
          <Form.Text className="text-danger">{errors.title.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formCampImageUrl" className="m-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control placeholder="URL..." {...register("image")} />
        {errors.image?.message && (
          <>
            <Form.Text className="text-danger">
              {errors.image.message}
            </Form.Text>
            <br />
          </>
        )}
        {image && (
          <Figure>
            <br />
            <Figure.Image
              width={171}
              height={180}
              alt="171x180 Broken camp image"
              src={image}
            />
            <Figure.Caption>Preview</Figure.Caption>
          </Figure>
        )}
      </Form.Group>

      <Form.Group controlId="formCampRating" className="m-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control as="select" {...register("rating")}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formCampContent" className="m-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          placeholder="Content..."
          {...register("content")}
          as="textarea"
          rows={4}
        />
        {errors.content?.message && (
          <Form.Text className="text-danger">
            {errors.content.message}
          </Form.Text>
        )}
      </Form.Group>

      <Button variant="secondary" type="submit" className="m-3">
        Submit
      </Button>
    </Form>
  );
};
export default NewCampPage;
