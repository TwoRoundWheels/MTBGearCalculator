var React = require('react');
var Label = require('react-bootstrap').Label;
var Radio = require('react-bootstrap').Radio;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var Form = require('react-bootstrap').Form;

var GearSelectionForm = React.createClass({
	propTypes: {
		radioChange: React.PropTypes.func, 
		textChange: React.PropTypes.func,
		number: React.PropTypes.number,
		sizes: React.PropTypes.arrayOf(React.PropTypes.number),
		defaultGears: React.PropTypes.arrayOf(React.PropTypes.number),
		position: React.PropTypes.string,
		side: React.PropTypes.string,
		selectedGearInput: React.PropTypes.number
	},
	handleTextChange: function (e) {
		var value = Number(e.target.value);
		if (value >= 0 && value <= 50) {
			if (this.props.side === "Left" && Number(e.target.name) === this.props.selectedGearInput) {
				var selected = true;
			} else {
				var selected = false;
			}
			e.target.style.color = "black";
			var index = Number(e.target.name);
			var side = this.props.side;
			var position = this.props.position
			this.props.textChange(value, index, side, position, selected);
		} else {
			e.target.style.color = "red";
		}
		
	},
	handleRadioChange: function (e) {
		var value = Number(e.target.value);
		var side = this.props.side;
		var position = this.props.position;
		this.props.radioChange(value, side, position);
	},
	render: function() {
		var textInputs = [];
		var radioButtons = [];

		for (var i = 0; i < this.props.defaultGears.length; i++) {
			radioButtons.push(
					<Radio inline key={i}
							   name="number-of-gears" 
							   value={this.props.defaultGears[i]} 
							   defaultChecked={this.props.defaultGears[i] === this.props.number}>
						{this.props.defaultGears[i]}
					</Radio>
				);
		}; 

		for (var i = 0; i < this.props.number; i++) {
			textInputs.push(<input key={i} name={i} type="number" value={this.props.sizes[i]} onChange={this.handleTextChange} />);
		};

		return (
			<div>
				<Form inline>
					<FormGroup onChange={this.handleRadioChange} className="gear-selection-form">
						<h4><Label>Number of Gears {this.props.position}:</Label></h4>
						{radioButtons}
					</FormGroup>
					<FormGroup className = {this.props.position === "Front" ? "gear-selection-form pull-right" : className = "gear-selection-form"}>
					<h4><Label>Gear Size{this.props.number == 1 ? "" : "s"} {this.props.position}: </Label></h4>
					{textInputs}	
					</FormGroup>
				</Form>
			</div>
			);
	}
});

module.exports = GearSelectionForm;
