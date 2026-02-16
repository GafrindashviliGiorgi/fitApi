import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bigDiv">
      <ul>
        <li className="color1">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/Food" className="nav-link">Food</Link>
        </li>
        <li>
          <Link to="/BuyFood" className="nav-link">Buy Food</Link>
        </li>
        <li className="Snaks">
          <Link to="/Snaks" className="nav-link">Snacks</Link>
        </li>
            <li className="color4">
          <Link to="/Chatbot" className="nav-link">Chatbot</Link>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default Header;