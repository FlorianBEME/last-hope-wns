import React from "react";
import logo from "./img/logo_LastHope_inline.png";
import "./App.css";
import TestSpaceX from "./components/launchesPast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <div>
          <TestSpaceX />
        </div>
      </main>
    </div>
  );
}

export default App;
