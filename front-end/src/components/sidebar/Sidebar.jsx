import React, { useState } from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AddShoppingCart,
  MailOutline,
  Category,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  TableRows,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isToggled, setIsToggled] = useState(true);

  return (
    <div className="sidebar">
      <button
        className="sidebarBtn"
        onClick={() => setIsToggled((previsToggled) => !previsToggled)}
      >
        <TableRows />
      </button>
      {isToggled && (
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li>
                <NavLink to="/" className="link sidebarListItem">
                  <LineStyle className="sidebarIcon" />
                  Home
                </NavLink>
              </li>
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <li>
                <NavLink to="/users" className="link sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className="link sidebarListItem">
                  <Storefront className="sidebarIcon" />
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/newproduct" className="link sidebarListItem">
                  <AddShoppingCart className="sidebarIcon" />
                  Add Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/category" className="link sidebarListItem">
                  <Category className="sidebarIcon" />
                  Categories
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <MailOutline className="sidebarIcon" />
                Mail
              </li>
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Feedback
              </li>
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <WorkOutline className="sidebarIcon" />
                Manage
              </li>
              <li className="sidebarListItem">
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                Reports
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
