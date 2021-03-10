import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import ForgotPassword from "./Forms/ForgotPassword/ForgotPasswordForm";
import Login from "./Forms/Login";
import Navbar from "./Navibar/Navbar";
import Footer from "../Footer/Footer";
import "./home.css";

const login = true;
const forgot = "";

function index() {
  return (
    <>
      {" "}
      <Router>
        <Navbar />
        <Container className="main-home">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>{" "}
            <Route path="/reset-password">
              <ForgotPassword />
            </Route>{" "}
          </Switch>{" "}
        </Container>{" "}
      </Router>{" "}
      <Footer />
    </>
  );
}

export default index;
