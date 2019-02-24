import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">ToDo App</h1>
              <p className="lead">A simple, easy to add or update todo app</p>
              <hr className="mt-4 mb-4" />
              <Link
                to="/todos"
                className="btn btn-lg btn-outline-dark text-light mt-4 mr-2"
              >
                Add/View todo list
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
