var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Front = require('../components/Front');
var Rear  = require('../components/Rear');
var RatioChart = require('../components/RatioChart');
var Col = ReactBootstrap.Col;


var RightContainer = React.createClass({
	calculateGearsToHighlight: function() {
		var leftFront = this.props.oppositeSelectedFrontValue;
		var leftRear = this.props.oppositeSelectedRearValue;
		var sizeOfGearsFront =  this.props.sizeOfGearsFront;
		var sizeOfGearsRear =  this.props.sizeOfGearsRear;
		var tireSize = this.props.tireSize;
		var oppositeTireSize = this.props.oppositeTireSize;
		var gearsToHighlight = [];
		var ratio = null;
		var leftRatio = this.props.showRatios ? leftFront / leftRear : leftFront / leftRear * oppositeTireSize;
		var limitValue = this.props.showRatios ? .1 : 1;
		
		for (i = 0; i < this.props.currentNumberOfGearsFront; i++) {
			for(j = 0; j < this.props.currentNumberOfGearsRear; j++) {
				if (this.props.showRatios === true) {
					ratio = sizeOfGearsFront[i] / sizeOfGearsRear[j];

				} else {
					ratio = sizeOfGearsFront[i] / sizeOfGearsRear[j] * tireSize;
				}
				if (Math.abs(ratio - leftRatio) < limitValue) {
					gearsToHighlight.push([i, j]);
				} 
			}
		}
		return gearsToHighlight;
	},
	render: function () {
		return (
		<Col sm={6} md={6} lg={6}>
		<div className="right-container">
			<Front sizeOfGears = {this.props.sizeOfGearsFront}
				   currentNumberOfGears = {this.props.currentNumberOfGearsFront}
				   handleRadioChange = {this.props.handleRadioChange}
				   handleTextChange = {this.props.handleTextChange}
				   position = "Front"
				   side = "Right"
				   selectedGearFront = {this.props.selectedGearFront}
				   handleSelectedGearChange = {this.props.handleSelectedGearChange}
				   gearsToHighlight = {this.calculateGearsToHighlight()} />
			<Rear sizeOfGears = {this.props.sizeOfGearsRear}
			      currentNumberOfGears = {this.props.currentNumberOfGearsRear}
			      handleRadioChange = {this.props.handleRadioChange}
			      handleTextChange = {this.props.handleTextChange}
			      position = "Rear"
			      side = "Right"
			      selectedGearRear = {this.props.selectedGearRear}
			      handleSelectedGearChange = {this.props.handleSelectedGearChange}
			      tireSize = {this.props.tireSize}
			      handleTireSizeChange = {this.props.handleTireSizeChange} 
			      gearsToHighlight = {this.calculateGearsToHighlight()} />

			<RatioChart numberOfGearsFront = {this.props.currentNumberOfGearsFront}
						numberOfGearsRear = {this.props.currentNumberOfGearsRear}
						sizeOfGearsFront = {this.props.sizeOfGearsFront}
						sizeOfGearsRear = {this.props.sizeOfGearsRear} 
						sizeOfGearsOnOppositeFront = {this.props.sizeOfGearsOnOppositeFront}
				   		sizeOfGearsOnOppositeRear = {this.props.sizeOfGearsOnOppositeRear}
				   		currentNumberOfGearsOppositeFront = {this.props.currentNumberOfGearsOppositeFront}
				   		currentNumberOfGearsOppositeRear = {this.props.currentNumberOfGearsOppositeRear}
				   		tireSize = {this.props.tireSize}
				   		oppositeTireSize = {this.props.oppositeTireSize}
				   		showRatios = {this.props.showRatios}
				   		handleShowRatioChange = {this.props.handleShowRatioChange}
				   		side = "Right"
				   		oppositeSelectedFrontValue = {this.props.oppositeSelectedFrontValue}
				   		oppositeSelectedRearValue = {this.props.oppositeSelectedRearValue} />

		</div>
		</Col>
		)
	}
});

module.exports = RightContainer;