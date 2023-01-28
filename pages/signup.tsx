import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
};
const schema = yup
  .object({
    firstName: yup
      .string()
      .required("first name is required")
      .min(3, "must be at least 3 characters")
      .max(50, "must be less than 50 characters"),
    lastName: yup
      .string()
      .required("last name is required")
      .min(3, "must be at least 3 characters")
      .max(50, "must be less than 50 characters"),
    email: yup
      .string()
      .required("email is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "email must be valid"
      ),
    password: yup
      .string()
      .required("password is required")
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .matches(
        /^.*[a-z]+/,
        "password must contain at least 1 lower case letter"
      )
      .matches(
        /^.*[A-Z]+/,
        "password must contain at least 1 upper case letter"
      )
      .matches(/^.*[0-9]+/, "password must contain at least 1 number")
      .matches(/^.*[!&$%&#? "]+/, "password must contain at least 1 symbol"),
    passwordConfirmation: yup
      .string()
      .required("password confirmation is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [signupError, setSignupError] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.replace("/");
  }

  const onSubmitHandler: SubmitHandler<Inputs> = async ({
    firstName,
    lastName,
    password,
    email,
    passwordConfirmation,
  }) => {
    const results = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (results.status === 400) {
      const text = await results.text();
      setSignupError(text);
    } else if (results.status !== 201) {
      setSignupError("Something went wrong. Pleast contact support.");
      toast.error("Something went wrong. Pleast contact support.");
    } else {
      setSignupError(null);
      toast.success("Account created! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />

      <Form
        className="mx-auto"
        style={{ maxWidth: "640px" }}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="mt-3 mb-3">Register</h1>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            {...register("firstName")}
          />
          {errors.firstName?.message && (
            <Form.Text className="text-danger">
              {errors.firstName.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            {...register("lastName")}
          />
          {errors.lastName?.message && (
            <Form.Text className="text-danger">
              {errors.lastName.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email?.message && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password?.message && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPasswordConfirmation">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation?.message && (
            <Form.Text className="text-danger">
              {errors.passwordConfirmation.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="light" type="submit" className="mt-3">
          Signup
        </Button>
        <br />
        <br />
        {signupError && (
          <Form.Text className="text-danger">{signupError}</Form.Text>
        )}
      </Form>
    </>
  );
};

export default RegisterPage;
