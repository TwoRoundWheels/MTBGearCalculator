var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Label = ReactBootstrap.Label;
var Radio = ReactBootstrap.Radio;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel
console.log(typeof(FormControl));

var GearSelectionForm = React.createClass({
	handleTextChange: function (e) {
		var value = Number(e.target.value);
		if (value >= 0 && value <= 50) {
			e.target.style.color = "black";
			var index = Number(e.target.name);
			var side = this.props.side;
			var position = this.props.position
			this.props.textChange(value, index, side, position);
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
				<form onChange={this.handleRadioChange}>
					<FormGroup>
						<h4><Label>Number of Gears:</Label></h4>
						{radioButtons}
					</FormGroup>
				</form>
				<form>
					<FormGroup>
					<h4><Label>Gear Sizes: </Label></h4>
					{textInputs}	
					</FormGroup>
				</form>
			</div>
			);
	}
});

module.exports = GearSelectionForm;
