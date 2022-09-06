import { useState, SyntheticEvent } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { RouteComponentProps } from "react-router";

interface Props {
  history: RouteComponentProps["history"];
}

const SignupScreen = ({ history }: Props) => {
  const [nick, setNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    // interact with the backend
    await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: nick,
        email: email,
        password: password,
      }),
    });
    history.push("/login");
  };

  return (
    <FormContainer>
      <h1>Dis a SignUp page</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Nick</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your nickname"
            value={nick}
            onChange={(e) => setNick(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default SignupScreen;
