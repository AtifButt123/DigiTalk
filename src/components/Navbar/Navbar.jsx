import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBell, faComments, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

import './Navbar.css';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation(); // Hook from react-router-dom to get the current location

  const handleBellIconClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <nav className="navbar">
        <span className="logo"><img src={Logo} alt="logo" /></span>
        <nav className="middle-nav">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li className={location.pathname === "/users" ? "active" : ""}>
              <Link to="/users">
                <FontAwesomeIcon icon={faUsers} />
              </Link>
            </li>
            <li className={location.pathname === "/notifications" ? "active" : ""}>
              <Link to="/notifications" onClick={handleBellIconClick}>
                <FontAwesomeIcon icon={faBell} />
              </Link>
            </li>
            <li className={location.pathname === "/comments" ? "active" : ""}>
              <Link to="/comments">
                <FontAwesomeIcon icon={faComments} />
              </Link>
            </li>
            <li className={location.pathname === "/profile" ? "active" : ""}>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="parent">
          <span className="vertical-bar">_________</span>
          <input className="search-bar" type="text" placeholder="Search for anything..." />
          <a className="search-icon" href="https://www.google.com">
            <FontAwesomeIcon className="search-icon-logo" icon={faSearch} />
          </a>
        </div>
      </nav>
    </div>
  );
}
