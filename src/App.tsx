import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AdminScreen from "./screens/AdminScreen";

function App() {
  const [name, setName] = useState(localStorage.name);

  return (
    <Router>
      <Header name={name} setName={setName} />
      <main>
        <Container>
          <Route path="/" exact component={() => <HomeScreen name={name} />} />
          <Route path="/signup" component={SignupScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/admin" component={AdminScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
