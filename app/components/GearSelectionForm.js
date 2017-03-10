var React = require('react');

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
					<label key={i}>
						<input key={i} 
							   type="radio" 
							   name="number-of-gears" 
							   value={this.props.defaultGears[i]} 
							   defaultChecked={this.props.defaultGears[i] === this.props.number}/>
						{this.props.defaultGears[i]}
					</label>
				);
		}; 

		for (var i = 0; i < this.props.number; i++) {
			textInputs.push(<input key={i} name={i} type="number" value={this.props.sizes[i]} onChange={this.handleTextChange} />);
		};

		return (
			<div>
				<form onChange={this.handleRadioChange}>
					<label>Number of gears:</label>
					{radioButtons}
				</form>
				<form>
					<p>
						Gear Sizes: 
						<span>{textInputs}</span>
					</p>
				</form>
			</div>
			);
	}
});

module.exports = GearSelectionForm;
