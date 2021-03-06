var React = require('react');
var Label = require('react-bootstrap').Label;
var Table = require('react-bootstrap').Table;
var Form = require('react-bootstrap').Form;
var Radio = require('react-bootstrap').Radio;


var RatioChart = React.createClass({
	propTypes: {
		numberOfGearsFront: React.PropTypes.number,
		numberOfGearsRear: React.PropTypes.number,
		sizeOfGearsFront: React.PropTypes.arrayOf(React.PropTypes.number),
		sizeOfGearsRear: React.PropTypes.arrayOf(React.PropTypes.number),
		sizeOfGearsOnOppositeFront: React.PropTypes.arrayOf(React.PropTypes.number),
   		sizeOfGearsOnOppositeRear: React.PropTypes.arrayOf(React.PropTypes.number),
   		currentNumberOfGearsOppositeFront: React.PropTypes.number,
   		currentNumberOfGearsOppositeRear: React.PropTypes.number,
   		tireSize: React.PropTypes.number,
   		oppositeTireSize: React.PropTypes.number,
   		showRatios: React.PropTypes.bool,
   		handleShowRatioChange: React.PropTypes.func,
   		side: React.PropTypes.string,
   		selectedFrontValue: React.PropTypes.number,
   		selectedRearValue: React.PropTypes.number
	},
	defaultProps: {
		similarRatioClasses: ['similar-ratio1', 'similar-ratio2', 'similar-ratio3', 'similar-ratio4', 'similar-ratio5'] 
	},
	getInitialState: function () {
		return {highlight: true};
	},
	handleClick: function (e) {
		if (e.target.name === "highlight") {
			//Set value to Boolean true/false value, rather than the string true/false value returned by e.target.value
			let value = (e.target.value == 'true');
			this.setState({highlight: value});
		} else if (e.target.name === "show-ratios") {
			//Set value to Boolean true/false value, rather than the string true/false value returned by e.target.value
			let value = (e.target.value == 'true');
			this.props.handleShowRatioChange(value);
		} else {
			console.warn("Failed to update state of Ratio Chart radio buttons");
		}
	},
	calculateSmallestRatio: function (oppositeFront, oppositeRear, oppositeTireSize) {
		let ratio = oppositeFront[0] / oppositeRear[0];
		if (this.props.showRatios === true) {
			return ratio;
		} else {
			return ratio * oppositeTireSize;
		}
	},
	calculateLargestRatio: function (oppositeFront, oppositeRear, oppositeTireSize) {
		let ratio = oppositeFront / oppositeRear;
		if (this.props.showRatios === true) {
			return ratio;
		} else {
			return ratio * oppositeTireSize;
		}
		
	},
	calculateAndDisplayRatios: function () {
		const rowLabels = ["First: ", "Second: ", "Third: "];
		const numberOfGearsFront = this.props.numberOfGearsFront;
		const numberOfGearsRear = this.props.numberOfGearsRear;
		const gears = this.props.sizeOfGearsRear;
		const numberOfGearsFrontOnOtherSide = this.props.currentNumberOfGearsOppositeFront;
		const numberOfGearsRearOnOtherSide = this.props.currentNumberOfGearsOppositeRear;
		const oppositeFront = this.props.sizeOfGearsOnOppositeFront;
		const oppositeRear = this.props.sizeOfGearsOnOppositeRear;
		const oppositeTireSize = this.props.oppositeTireSize;
		const tireSize = this.props.tireSize;
		const smallestRatioOnOtherSide = this.calculateSmallestRatio(oppositeFront, oppositeRear, oppositeTireSize);	
		const largestRatioOnOtherSide = this.calculateLargestRatio(oppositeFront[numberOfGearsFrontOnOtherSide - 1], oppositeRear[numberOfGearsRearOnOtherSide - 1], oppositeTireSize);
		const highlight = this.state.highlight;
		const showRatios = this.props.showRatios;
		const side = this.props.side;
		const classes = this.defaultProps.similarRatioClasses;
		let similarCount = 0;
	
		if (side === "Left") {
			var selectedRatio = this.props.selectedFrontValue / this.props.selectedRearValue;
		} else {
			var oppositeRatio = this.props.oppositeSelectedFrontValue / this.props.oppositeSelectedRearValue;
			var selectedRatioPerTooth = 1 / this.props.oppositeSelectedFrontValue;
		}

		var ratioCollection = this.props.sizeOfGearsFront.map(function(size, index) {
			let ratios = [];
			if (index < numberOfGearsFront) {
				for (let i = 0; i < gears.length; i++) {
					if (i < numberOfGearsRear) {
						if (showRatios === true) {
							var ratio = size / gears[i];
						} else {
							var ratio = size / gears[i] * tireSize;
						}
						if (ratio >= smallestRatioOnOtherSide && ratio <= largestRatioOnOtherSide && highlight === true) {
							ratios[i] = <td key={i} className="shared-ratio">{ratio.toFixed(2)}</td>
						} else {
							ratios[i] = <td key={i}>{ratio.toFixed(2)}</td>
						}
						if (showRatios === true && oppositeRatio > 0) {
							if (Math.abs(ratio - oppositeRatio) < 2 * selectedRatioPerTooth) {
									ratios[i] = <td key={i} className={classes[similarCount]}>{ratio.toFixed(2)}</td>
									similarCount++;
								}
							} else if (oppositeRatio > 0) {
								if (Math.abs(ratio - (oppositeRatio * oppositeTireSize)) < 2 * selectedRatioPerTooth * oppositeTireSize) {
									ratios[i] = <td key={i} className={classes[similarCount]}>{ratio.toFixed(2)}</td>
									similarCount++;
								}
							}
						if (side === "Left") {
							if (showRatios === true && ratio === selectedRatio) {
								ratios[i] = <td key={i} className="selected-ratio">{ratio.toFixed(2)}</td>
							} else if (ratio === selectedRatio * tireSize) {
								ratios[i] = <td key={i} className="selected-ratio">{ratio.toFixed(2)}</td>
							}
							
						}
					}	
				};
				return <tr key={index}><th>{rowLabels[index]}</th>{ratios}</tr>
			}
		});
		return ratioCollection;
	},
	calculateAndDisplayColumnHeadings: function () {
		const numberOfGearsRear = this.props.numberOfGearsRear;
		const showRatios = this.props.showRatios;
		let headings = [];

		headings[0] = showRatios ? <th key = {0}>Ratios</th> : <th key = {0}>Gear Inches</th>;
		for (let i = 1; i <= numberOfGearsRear; i++) {
			headings[i] = <th key={i}>{i}</th>
		}
		return headings;
	},
	render: function () {		
		return (
			<div className="ratio-chart">
				<Table bordered condensed responsive>
					<tbody>
						<tr>{this.calculateAndDisplayColumnHeadings()}</tr>
						{this.calculateAndDisplayRatios()}
					</tbody>
				</Table>
				<Form inline>
					<h4>
					<Label>Highlight range of other side:</Label>
					<Label className="highlight-radio-label">On</Label>
					<Radio name="highlight"
						   value={true}
						   defaultChecked={true}
						   onClick={this.handleClick}>
					</Radio>
					<Label className="highlight-radio-label">Off</Label>
					<Radio name="highlight"
						   value={false}
						   defaultChecked={false}
						   onClick={this.handleClick}>
					</Radio>
					</h4>		
				</Form>
				<h4>
					<Form inline>
						<Label className="ratio-button-label">Show Gear Ratios</Label>
						<Radio name="show-ratios" 
							   value={true} 
							   checked={this.props.showRatios ? true : false}
							   onChange={this.handleClick}>
						</Radio>
					
						<Label className="ratio-button-label">Show Gear Inches</Label>
						<Radio name="show-ratios" 
							   value={false} 
							   checked={this.props.showRatios ? false : true}
							   onChange={this.handleClick}>
						</Radio>
					</Form>
				</h4>
			</div>
			)
	}
});

module.exports = RatioChart;