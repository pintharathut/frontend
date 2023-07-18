import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/main.css";
import axios from "axios";

function MainMenu() {
  const [displayname, setDisplayname] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleExit = () => {
    sessionStorage.removeItem("username");
    window.location.href = "/";
  };

  useEffect(() => {
    // Retrieve the username from sessionStorage
    const username = sessionStorage.getItem("username");

    // Make the GET request using the retrieved username
    if (username) {
      axios
        .get("http://localhost:8081/user-info", {
          params: {
            username: username,
          },
        })
        .then((res) => {
          setDisplayname(res.data.display_name);

          // Set the appropriate contact information based on user_type
          const userType = res.data.user_type;
          switch (userType) {
            case "user":
              setContactInfo(res.data.phone_number);
              break;
            case "provider":
              setContactInfo(res.data.address);
              break;
            case "admin":
              setContactInfo(res.data.email);
              break;
            default:
              setContactInfo("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="banner">
        <h4 className="alert">You are now logged in</h4>
      </div>
      <h1>
        <b>CIMT</b>
      </h1>
      <h3 className="member">{displayname}</h3>
      <h4 className="num">{contactInfo}</h4>
      <hr width="100%" color="lightgray" />
      <div>
        <h1 className="menu-title">Main Menu</h1>
        <ul className="menu">
          <li>
            <Link to="/add-resource" className="menu-item">
              Add Available Resource
            </Link>
          </li>
          <li>
            <Link to="/add-incident" className="menu-item">
              Add Emergency Incident
            </Link>
          </li>
          <li>
            <Link to="/search-resources" className="menu-item">
              Search Resources
            </Link>
          </li>
          <li>
            <Link to="/generate-report" className="menu-item">
              Generate Resource Report
            </Link>
          </li>
        </ul>
      </div>
      <button className="exit" onClick={handleExit}>
        Exit
      </button>

      <footer className="footer">
        &copy; Copyright 2023. All rights reserved. CIMT
      </footer>
    </div>
  );
}

export default MainMenu;
