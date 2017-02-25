var React = require('react');

var RatioChart = React.createClass({
	getInitialState: function () {
		return {highlight: true};
	},
	handleClick: function (e) {
		//Set value to Boolean true/false value, rather than the string true/false value returned by e.target.value
		value = (e.target.value == 'true');
		this.setState({highlight: value});
	},
	render: function () {
		var rowLabels = ["First: ", "Second: ", "Third: "];
		var numberOfGearsFront = this.props.numberOfGearsFront;
		var numberOfGearsRear = this.props.numberOfGearsRear;
		var gears = this.props.sizeOfGearsRear;
		var numberOfGearsFrontOnOtherSide = this.props.currentNumberOfGearsOppositeFront;
		var numberOfGearsRearOnOtherSide = this.props.currentNumberOfGearsOppositeRear;
		var oppositeFront = this.props.sizeOfGearsOnOppositeFront;
		var oppositeRear = this.props.sizeOfGearsOnOppositeRear;
		var smallestRatioOnOtherSide = oppositeFront[0] / oppositeRear[0];	
		var largestRatioOnOtherSide = oppositeFront[numberOfGearsFrontOnOtherSide - 1] / oppositeRear[numberOfGearsRearOnOtherSide- 1];
		var highlight = this.state.highlight;
		var ratioCollection = this.props.sizeOfGearsFront.map(function(size, index) {
			var ratios = [];
			if (index < numberOfGearsFront) {
				for (var i = 0; i < gears.length; i++) {
					if (i < numberOfGearsRear) {
						var ratio = size / gears[i];
						if (ratio >= smallestRatioOnOtherSide && ratio <= largestRatioOnOtherSide && highlight === true) {
							ratios[i] = <td key={i} className="sharedRatio">{ratio.toFixed(2)}</td>
						} else {
							ratios[i] = <td key={i}>{ratio.toFixed(2)}</td>
						}
					}	
				};
				return <tr key={index}><th>{rowLabels[index]}</th>{ratios}</tr>
			}
		});
		var columnHeadings = function () {
			var headings = [];
			headings[0] = <th key = {0}>Ratios</th>
			for (var i = 1; i <= numberOfGearsRear; i++) {
				headings[i] = <th key={i}>{i}</th>
			}
			return headings;
		}	
		return (
			<div>
				<table>
					<tbody>
						<tr>{columnHeadings()}</tr>
						{ratioCollection}
					</tbody>
				</table>
				<form>
					<label>
						Highlight range of other side: On
						<input type="radio" 
							   name="highlight" 
							   value={true} 
							   defaultChecked={true}
							   onClick={this.handleClick} />
					</label>
					<label>
						Off
						<input type="radio" 
							   name="highlight" 
							   value={false} 
							   defaultChecked={false}
							   onClick={this.handleClick} />
					</label>		
				</form>
			</div>
			)
	}
});

module.exports = RatioChart;