import React, { Component } from 'react';
import './App.css';
class Input extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onValueChange(e.target.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.addValue(this.props.value);
  }

  render() {
    const value = this.props.value;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Value:
          <input type="text" value={value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Input;
