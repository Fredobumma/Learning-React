import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  const navLinks = [
    { label: "Movies", path: "/movies" },
    { label: "Customers", path: "/customers" },
    { label: "Rentals", path: "/rentals" },
  ];

  if (user) {
    navLinks.push(
      { label: user.name, path: "/profile" },
      { label: "Logout", path: "/logout" }
    );
  } else {
    navLinks.push(
      { label: "Register", path: "/register" },
      { label: "Login", path: "/login" }
    );
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand mb-0 h1">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {navLinks.map((navLink) => (
              <NavLink
                to={navLink.path}
                className="nav-link"
                key={navLink.label}
              >
                {navLink.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
