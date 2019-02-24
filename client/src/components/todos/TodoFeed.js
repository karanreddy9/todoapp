import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodos } from "../../actions/todoActions";

import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

class TodoFeed extends Component {
  componentDidMount() {
    this.props.getTodos();
  }

  render() {
    const { todos } = this.props.todos;
    let todoItems;

    todoItems = todos.map(todo => <TodoItem key={todo._id} todo={todo} />);

    return (
      <div className="todos">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div id="successsnackbar">
                <div className="alert alert-success" role="alert">
                  <strong>Success!</strong> Todo Added to the List
                </div>
              </div>
              <div id="updatewarningsnackbar">
                <div className="alert alert-warning" role="alert">
                  <strong>Warning!</strong> Text should be between 1 and 300
                  characters
                </div>
              </div>
              <div id="deletesnackbar">
                <div className="alert alert-danger" role="alert">
                  <strong>Deleted!</strong> Todo Deleted from the List
                </div>
              </div>
              <AddTodo />
              <div className="card border-primary">
                <div>
                  <h5 className="card-header bg-primary text-light">
                    <strong>Todos List</strong>
                  </h5>
                </div>
                <div>
                  <div className="row mt-2">
                    <div className="col-md-2 text-center">
                      <strong>Done</strong>
                    </div>
                    <div className="col-md-4">
                      <strong>List</strong>
                    </div>
                    <div className="col-md-2 text-center">
                      <strong>Created On</strong>
                    </div>
                    <div className="col-md-2 text-center">
                      <strong>Edit</strong>
                    </div>
                    <div className="col-md-2 text-center">
                      <strong>Delete</strong>
                    </div>
                  </div>
                  <hr />
                  <div>{todoItems}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TodoFeed.propTypes = {
  todos: PropTypes.object.isRequired,
  getTodos: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { getTodos }
)(TodoFeed);
