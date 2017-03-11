var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Table = ReactBootstrap.Table;

var RatioChart = React.createClass({
	getInitialState: function () {
		return {highlight: true};
	},
	handleClick: function (e) {
		if (e.target.name === "highlight") {
			//Set value to Boolean true/false value, rather than the string true/false value returned by e.target.value
			value = (e.target.value == 'true');
			this.setState({highlight: value});
		} else if (e.target.name === "show-ratios") {
			//Set value to Boolean true/false value, rather than the string true/false value returned by e.target.value
			value = (e.target.value == 'true');
			this.props.handleShowRatioChange(value);
		} else {
			console.warn("Failed to update state of Ratio Chart radio buttons");
		}
	},
	calculateSmallestRatio: function (oppositeFront, oppositeRear, oppositeTireSize) {
		var ratio = oppositeFront[0] / oppositeRear[0];
		if (this.props.showRatios === true) {
			return ratio;
		} else {
			return ratio * oppositeTireSize;
		}
	},
	calculateLargestRatio: function (oppositeFront, oppositeRear, oppositeTireSize) {
		var ratio = oppositeFront / oppositeRear;
		if (this.props.showRatios === true) {
			return ratio;
		} else {
			return ratio * oppositeTireSize;
		}
		
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
		var oppositeTireSize = this.props.oppositeTireSize;
		var tireSize = this.props.tireSize;
		var smallestRatioOnOtherSide = this.calculateSmallestRatio(oppositeFront, oppositeRear, oppositeTireSize);	
		var largestRatioOnOtherSide = this.calculateLargestRatio(oppositeFront[numberOfGearsFrontOnOtherSide - 1], oppositeRear[numberOfGearsRearOnOtherSide - 1], oppositeTireSize);
		var highlight = this.state.highlight;
		var showRatios = this.props.showRatios;
		var side = this.props.side;
		if (side === "Left") {
			var selectedRatio = this.props.selectedFrontValue / this.props.selectedRearValue;
		} else {
			var oppositeRatio = this.props.oppositeSelectedFrontValue / this.props.oppositeSelectedRearValue;
		}
		var ratioCollection = this.props.sizeOfGearsFront.map(function(size, index) {
			var ratios = [];
			if (index < numberOfGearsFront) {
				for (var i = 0; i < gears.length; i++) {
					if (i < numberOfGearsRear) {
						if (showRatios === true) {
							var ratio = size / gears[i];
						} else {
							var ratio = size / gears[i] * tireSize;
						}
						if (ratio >= smallestRatioOnOtherSide && ratio <= largestRatioOnOtherSide && highlight === true) {
							ratios[i] = <td key={i} className="sharedRatio">{ratio.toFixed(2)}</td>
							if (showRatios === true) {
								if (Math.abs(ratio - oppositeRatio) < .1) {
									ratios[i] = <td key={i} className="similar-ratio">{ratio.toFixed(2)}</td>
								}
							} else {
								if (Math.abs(ratio - (oppositeRatio * oppositeTireSize)) < 1) {
									ratios[i] = <td key={i} className="similar-ratio">{ratio.toFixed(2)}</td>
								}
							}
						} else {
							ratios[i] = <td key={i}>{ratio.toFixed(2)}</td>
						}
						if (side === "Left") {
							if (showRatios === true && ratio === selectedRatio) {
								ratios[i] = <td key={i} className="similar-ratio">{ratio.toFixed(2)}</td>
							} else if (ratio === selectedRatio * tireSize) {
								ratios[i] = <td key={i} className="similar-ratio">{ratio.toFixed(2)}</td>
							}
							
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
				<Table bordered condensed>
					<tbody>
						<tr>{columnHeadings()}</tr>
						{ratioCollection}
					</tbody>
				</Table>
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
				<form>
					<label>
						Show Gear Ratios
						<input type="radio" 
							   name="show-ratios" 
							   value={true} 
							   checked={this.props.showRatios ? true : false}
							   onChange={this.handleClick} />
					</label>
					<label>
						Show Gear Inches
						<input type="radio" 
							   name="show-ratios" 
							   value={false} 
							   checked={this.props.showRatios ? false : true}
							   onChange={this.handleClick} />
					</label>		
				</form>
			</div>
			)
	}
});

module.exports = RatioChart;