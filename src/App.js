import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";


function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("https://mutinybayboatwatching.xyz/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Failed to load message");
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Well hello there, Sammy.  Perhaps we will find some boats soon...
        </p>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
