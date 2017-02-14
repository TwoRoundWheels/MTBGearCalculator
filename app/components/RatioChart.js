var React = require('react');

var RatioChart = React.createClass({
	render: function () {
		var rowLabels = ["First: ", "Second: ", "Third: "];
		var numberOfGearsFront = this.props.numberOfGearsFront;
		var numberOfGearsRear = this.props.numberOfGearsRear;
		var gears = this.props.sizeOfGearsRear;
		var ratioCollection = this.props.sizeOfGearsFront.map(function(size, index) {
			var ratios = [];
			if (index < numberOfGearsFront) {
				for (var i = 0; i < gears.length; i++) {
					if (i < numberOfGearsRear) {
						var ratio = size / gears[i];
						ratios[i] = <td key={i}>{ratio.toFixed(2)}</td>
					}	
				};
				return <tr key={index}><th>{rowLabels[index]}</th>{ratios}</tr>
			}
		});	
		return (
			<div>
				<table>
					<tbody>
						{ratioCollection}
					</tbody>
				</table>
			</div>
			)
	}
});

module.exports = RatioChart;