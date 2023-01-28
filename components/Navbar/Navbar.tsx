import Link from "next/link";
import React, { MouseEvent } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { signOut, useSession, signIn } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();
  function onLogoutHandler(e: MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    signOut({
      redirect: false,
    });
  }

  return (
    <Navbar bg="light" variant="light" expand="lg" className="mb-4">
      <Container>
        <Link href="/">
          <Navbar.Brand>Camper</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">
              <Nav.Link as="span">Home</Nav.Link>
            </Link>
            <Link href="/protected">
              <Nav.Link as="span">Protected</Nav.Link>
            </Link>
            {session?.user && (
              <Link href="/camps/new">
                <Nav.Link as="span">New Camp</Nav.Link>
              </Link>
            )}
          </Nav>
          <Nav>
            {!session?.user && (
              <Link href="/api/auth/signin">
                <Nav.Link as="span">Login</Nav.Link>
              </Link>
            )}
            {!session?.user && (
              <Link href="/signup">
                <Nav.Link as="span">Sign Up</Nav.Link>
              </Link>
            )}
            {session?.user && (
              <Nav.Link onClick={onLogoutHandler}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
