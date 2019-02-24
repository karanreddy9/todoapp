import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { addTodo } from "../../actions/todoActions";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const todoData = {
      text: this.state.text
    };

    this.props.addTodo(todoData);
    if (this.state.text !== "") {
      var x = document.getElementById("successsnackbar");
      x.className = "show";

      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, 3000);
    }
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-4">
        <div className="card border-primary">
          <div>
            <h5 className="card-header bg-primary text-light">
              <strong>Add a ToDo</strong>
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  className={classnames(
                    "form-control form-control-lg bg-light",
                    {
                      "is-invalid": errors.text
                    }
                  )}
                  placeholder="Start typing..."
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
                {errors.text && (
                  <div className="invalid-feedback">{errors.text}</div>
                )}
              </div>
              <button type="submit" className="btn btn-outline-primary">
                <i className="fas fa-sm fa-plus" />
                <strong> Add</strong>
              </button>
            </form>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  todos: state.todos
});

export default connect(
  mapStateToProps,
  { addTodo }
)(AddTodo);
