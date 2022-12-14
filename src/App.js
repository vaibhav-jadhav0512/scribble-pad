import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import NoteState from "./context/notes/NoteState";

const App = () => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <NoteState>
        <Router>
          <LoadingBar color="#f11946" progress={progress} height={3} />
          <Navbar />
          <div className="container">
            <Alert message="Note saved successfully!" />
            <Routes>
              <Route
                exact
                path="/"
                element={<Home setProgress={setProgress} />}
              ></Route>
              <Route
                exact
                path="/about"
                element={<About setProgress={setProgress} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={<SignUp setProgress={setProgress} />}
              ></Route>
              <Route
                exact
                path="/login"
                element={<Login setProgress={setProgress} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
