import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8080/api/user", {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setName(data.name);
    })();
  });

  return (
    <Router>
      <Header name={name} setName={setName} />
      <main>
        <Container>
          <Route path="/" exact component={() => <HomeScreen name={name} />} />
          <Route path="/signup" component={SignupScreen} />
          <Route path="/login" component={LoginScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
