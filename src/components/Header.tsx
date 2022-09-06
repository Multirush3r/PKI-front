import { SyntheticEvent } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

interface Props {
  name: string;
  setName: (name: string) => void;
}

const Header = ({ name, setName }: Props) => {
  const logoutHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/auth/logout", {
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    setName("");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {name ? (
            <Nav className="ms-auto">
              <Nav.Link onClick={logoutHandler}>LogOut</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link href="/signup">SignUp</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
