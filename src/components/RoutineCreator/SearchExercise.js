import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class SearchExercise extends Component {
  constructor(props) {
    super(props)
    this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
  }

  handleSearchBoxChange(selection) {
    if (selection && selection.value) {
      this.props.handleChange(selection);
    }
  }

  render() {
    return (
      <Select
        name="form-field-name"
        value={null}
        options={this.props.exercises}
        onChange={this.handleSearchBoxChange}
      />
    )
  }
}
