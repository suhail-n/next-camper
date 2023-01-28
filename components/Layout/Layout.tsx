import Container from "react-bootstrap/Container";
import React, { ReactNode } from "react";
import NavBar from "../Navbar/Navbar";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Camper</title>
        <meta name="description" content="Campsite finder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
};

export default Layout;
