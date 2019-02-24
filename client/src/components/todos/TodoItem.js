import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import Moment from "react-moment";

import { updateTodo, deleteTodo } from "../../actions/todoActions";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    const { todo } = this.props;
    this.state = {
      text: todo.text,
      editTodo: false
    };
  }

  onClickEdit() {
    this.setState({ editTodo: true });
  }

  onClickCancel() {
    const { todo } = this.props;

    this.setState({ editTodo: false });
    this.setState({ text: todo.text });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateData(markasdone, text, id) {
    const updateTodoItem = {
      markasdone,
      text,
      id
    };

    if (updateTodoItem.text !== "" && updateTodoItem.text.length <= 300) {
      this.props.updateTodo(updateTodoItem);
      this.setState({ editTodo: false });
    } else {
      var snackbarName = "updatewarningsnackbar";
      this.showSnackbar(snackbarName);
      this.setState({ editTodo: true });
    }
  }

  deleteData(id) {
    this.props.deleteTodo(id);
    var snackbarName = "deletesnackbar";
    this.showSnackbar(snackbarName);
  }

  showSnackbar(snackbarName) {
    var x = document.getElementById(snackbarName);
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  renderList() {
    const { todo } = this.props;
    let todoText;

    !this.state.editTodo
      ? (todoText = todo.text)
      : (todoText = (
          <div>
            <textarea
              className="form-control form-control-sm bg-white"
              name="text"
              defaultValue={todo.text}
              placeholder="* Text is required"
              onChange={this.onChange.bind(this)}
            />
            <button
              type="button"
              onClick={this.updateData.bind(
                this,
                todo.markasdone,
                this.state.text,
                todo._id
              )}
              className="btn btn-outline-primary btn-sm"
            >
              <strong>Update</strong>
            </button>
            <button
              type="button"
              onClick={this.onClickCancel.bind(this)}
              className="btn btn-outline-primary btn-sm"
            >
              <strong>Cancel</strong>
            </button>
          </div>
        ));

    return (
      <div className="row mb-2">
        <div className="col-md-2 text-center">
          <button
            type="button"
            onClick={this.updateData.bind(
              this,
              !todo.markasdone,
              todo.text,
              todo._id
            )}
            className="btn btn-light"
            title="Click to mark as Done/Undone"
          >
            <i
              className={classnames("far fa-lg fa-check-circle text-success", {
                "far fa-lg fa-circle text-dark": !todo.markasdone
              })}
            />
          </button>
        </div>
        <div className="col-md-4">{todoText}</div>
        <div className="col-md-2 text-center">
          <Moment fromNow withTitle titleFormat="DD MMM YYYY, hh:mm a">
            {todo.createdon}
          </Moment>
        </div>
        <div className="col-md-2 text-center">
          <button
            type="button"
            onClick={this.onClickEdit.bind(this)}
            className="btn btn-light"
          >
            <i className="far fa-lg fa-edit text-warning" />
          </button>
        </div>
        <div className="col-md-2 text-center">
          <button
            type="button"
            onClick={this.deleteData.bind(this, todo._id)}
            className="btn btn-light"
          >
            <i className="far fa-lg fa-trash-alt text-danger" />
          </button>
        </div>
      </div>
    );
  }

  render() {
    return this.renderList();
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { updateTodo, deleteTodo }
)(TodoItem);
