import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Store from "./components/pages/Store";
import Profile from "./components/pages/Profile";
import Post from "./components/pages/Post";
import Footer from "./components/Footer/index";

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/store" component={Store} />
        <Route exact path="/post" component={Post} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
