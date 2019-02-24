import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-sm navbar-dark mb-4"
        style={{ backgroundColor: "#263238" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            ToDo App
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;
