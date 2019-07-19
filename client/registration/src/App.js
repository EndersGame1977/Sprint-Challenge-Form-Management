import React from "react";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import UseLocalStorage from "./components/UseLocalStorage";
import ProtectedData from "./components/ProtectedData";

function App() {
  const [token, setToken] = UseLocalStorage("token");
  return (
    <div className="App">
      <RegistrationForm setToken={setToken} />
      <ProtectedData token={token} />
    </div>
  );
}

export default App;
