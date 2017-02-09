var React = require('react');

var GearSelectionForm = React.createClass({
	render: function() {
		textInputs = [];
		for (var i = 0; i < this.props.number; i++) {
			textInputs.push(<input key={i} name={i} type="text" value={this.props.sizes[i]} onChange={this.props.textChange} />);
		};
		return (
			<div>
			<form onChange={this.props.radioChange}>
				<label>Number of gears:</label>
				<label>
					<input type="radio" name="number-of-gears" value="1" />
					1
				</label>
				<label>
					<input type="radio" name="number-of-gears"  value="2" />
					2
				</label>
				<label>
					<input type="radio" name="number-of-gears"  value="3" />
					3
				</label>
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
