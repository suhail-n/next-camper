import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { getCsrfToken, getProviders } from "next-auth/react";
import { Provider } from "next-auth/providers";
import { Session } from "next-auth/core/types";

type SignInProps = {
  providers: Provider;
  csrfToken: string;
  session: Session | null;
};

const SignIn = ({ providers, csrfToken, session }: SignInProps) => {
  const router = useRouter();
  const foundError = router.query.error;
  const error = Array.isArray(foundError) ? foundError[0] : foundError;
  // use to display all provider options
  // return (
  //   <>
  //     {Object.values(providers).map((provider) => (
  //       <div key={provider.id}>
  //         <button onClick={() => signIn(provider.id)}>
  //           Sign in with {provider.name}
  //         </button>
  //       </div>
  //     ))}
  //   </>
  // );

  // return (
  //   <form method="post" action="/api/auth/callback/credentials">
  //     <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
  //     <label>
  //       Email address
  //       <input type="text" id="email" name="email" />
  //     </label>
  //     <label>
  //       password
  //       <input type="password" id="password" name="password" />
  //     </label>
  //     <button type="submit">login</button>
  //     {error && <p>{error}</p>}
  //   </form>
  // )
  return (
    <Form
      className="mx-auto"
      style={{ maxWidth: "640px" }}
      method="post"
      action="/api/auth/callback/credentials"
    >
      {/* <Toaster position="top-center" reverseOrder={true} /> */}
      <h1 className="mt-3 mb-3">Login</h1>
      <Form.Group controlId="formBasicCsrf">
        <Form.Control name="csrfToken" type="hidden" defaultValue={csrfToken} />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Button variant="light" type="submit" className="mt-3">
        Login
      </Button>
      <br />
      <br />
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session && res && session.user) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      session: null,
      providers,
      csrfToken,
    },
  };
};
