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
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <LoadingBar color="#f11946" progress={progress} height={3} />
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home showAlert={showAlert} setProgress={setProgress} />
                }
              ></Route>
              <Route
                exact
                path="/about"
                element={<About setProgress={setProgress} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={
                  <SignUp showAlert={showAlert} setProgress={setProgress} />
                }
              ></Route>
              <Route
                exact
                path="/login"
                element={
                  <Login showAlert={showAlert} setProgress={setProgress} />
                }
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
