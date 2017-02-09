var React = require('react');

var GearSelectionForm = React.createClass({
	render: function() {
		textInputs = [];
		for (var i = 0; i < this.props.number; i++) {
			textInputs.push(<input type="text" value={this.props.sizes[i]} />);
		};
		return (
			<form>
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
				<br />
				<label>
					Gear Sizes: 
					{textInputs}
				</label>
			</form>
			);
	}
});

module.exports = GearSelectionForm;
