var React = require('react');

var GearSelectionForm = React.createClass({
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
							   defaultChecked={this.props.defaultGears[i] === this.props.number }/>
						{this.props.defaultGears[i]}
					</label>
				);
		}; 

		for (var i = 0; i < this.props.number; i++) {
			textInputs.push(<input key={i} name={i} type="text" value={this.props.sizes[i]} onChange={this.props.textChange} />);
		};

		return (
			<div>
			<form onChange={this.props.radioChange}>
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
