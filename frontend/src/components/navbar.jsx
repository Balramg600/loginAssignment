import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    let user = this.props.user;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand p-2" to="./">
          MyStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to={`/Dashboard`}>
                Dashboard
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  LOGIN
                </Link>
              </li>
            )}
            
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  LOGOUT
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;