import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { SidebarData } from "../Menubar/sidebarData";
import { connect } from "react-redux";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "../Navibar/navbar.css";
import { logout as signout } from "../../../client";
import { VIEW_USER, CLEAR_REPORT_DATA } from "../../../actions";

function Index({ dispatch, props }) {
  const [sidebar, setSidebar] = useState(false);
  const showsidebar = () => setSidebar(!sidebar);
  const [modalShown, toggleModal] = useState(false);

  function handle(title) {
    if (title == "Registration") {
      dispatch({ type: CLEAR_REPORT_DATA });
    }
  }
  const logout = {
    title: "Reports",
    path: "/reports",
    icon: <IoIcons.IoIosLogOut />,
    cName: "nav-text",
  };
  return (
    <>
      <div className="navbar">
      
      </div>{" "}
      
    </>
  );
}
const MapStateToprops = (store) => {
  return { ...store };
};
export default connect(MapStateToprops)(Index);
