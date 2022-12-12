import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import NoteState from "./context/notes/NoteState";

const App = () => {
  const [progress, setProgress] = useState(0);
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <LoadingBar color="#f11946" progress={progress} height={3} />
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
              path="/users"
              element={<Users setProgress={setProgress} />}
            ></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
