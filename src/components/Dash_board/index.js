import React from "react";
import Navbar from "./Navibar/index";
import { IconContext } from "react-icons";
import Container from "@material-ui/core/Container";
import Footer from "../Footer/Footer";
import "./dashbar.css";
import RegistrationForm from "./Registration";
import { ProtectRoute } from "../../components/ProtectRoute";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

function Index() {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Navbar />
        <Container className="dashboard">
          <Router>
            <Switch>
              <ProtectRoute
                path="/dashboard/registration"
                component={RegistrationForm}
              />
            </Switch>
          </Router>
        </Container>
        <Footer />
      </IconContext.Provider>
    </>
  );
}

export default Index;
