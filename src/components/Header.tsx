import { SyntheticEvent } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

interface Props {
  name: string;
  setName: (name: string) => void;
}

const Header = ({ name, setName }: Props) => {
  let history = useHistory();
  const logoutHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    localStorage.name = "";
    localStorage.jwt = null;

    setName("");
    history.push("/");
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
