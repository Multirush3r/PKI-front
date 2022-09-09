import { SyntheticEvent, useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { gapi } from "gapi-script";
import { useHistory } from "react-router-dom";

const clientId =
  "1015428869673-8qkv6aoe2qsha614uh9j9g741q3st1ct.apps.googleusercontent.com";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mess, setMess] = useState("");

  let history = useHistory();

  const styles = {
    color: "red",
  };

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    console.log(JSON.stringify({ email: email, password: password }));

    //interact with a backend using fetch
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();

      console.log(data);

      localStorage.name = data.name;
      localStorage.jwt = data.accessToken;

      console.log(localStorage.name);
      console.log(localStorage.jwt);

      history.push("/");
      window.location.reload();
    } else {
      setMess("BLAD LOGOWANIA");
      console.log("BLAD");
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onSuccess = async (
    res: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("success:", res);

    //interact with a backend using fetch
    if ("accessToken" in res) {
      const response = await fetch(
        "http://localhost:8080/api/auth/login/google/" + res.tokenId,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      localStorage.name = data.name;
      localStorage.jwt = data.accessToken;

      console.log(localStorage.name);
      console.log(localStorage.jwt);
    }

    history.push("/");
  };
  const onFailure = (err: Object) => {
    console.log("failed:", err);
  };

  return (
    <FormContainer>
      <h1>Dis a LogIn page</h1>
      <Form onSubmit={submitHandler}>
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
          Login with email
        </Button>
      </Form>
      <p>OR YOU CAN</p>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
      <br />
      <br />
      <p style={styles}>{mess}</p>
    </FormContainer>
  );
};

export default LoginScreen;
