import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ExerciseOption extends Component {
  constructor(props) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

	handleMouseDown (event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}

	handleMouseEnter (event) {
		this.props.onFocus(this.props.option, event);
	}

	handleMouseMove (event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	}

	render () {
		return (
			<div className={this.props.className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}>
        {/* USE THIS TO CUSTOMIZE OPTION TO SHOW EXTRA DATA */}
        {this.props.children} - ({this.props.option.value})
			</div>
		);
	}
}

ExerciseOption.PropTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  option: PropTypes.object.isRequired,
}

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
        style={{'textAlign': 'center'}}
        placeholder="Add new exercise"
        name="form-field-name"
        value={null}
        options={this.props.exercises}
        optionComponent={ExerciseOption}
        onChange={this.handleSearchBoxChange}
      />
    )
  }
}
