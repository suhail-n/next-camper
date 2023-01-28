import { useSession } from "next-auth/react";

export const ProtectedPage = () => {
  const { data: session } = useSession();
  let header;
  if (session) {
    header = (
      <>
        <h1>Signed in as {JSON.stringify(session.user)}</h1>
      </>
    );
  } else {
    header = <h1>Protected Page</h1>;
  }
  return header;
};

export default ProtectedPage;
