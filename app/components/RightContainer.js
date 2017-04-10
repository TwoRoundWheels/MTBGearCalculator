var React = require('react');
var Front = require('../components/Front');
var Rear  = require('../components/Rear');
var RatioChart = require('../components/RatioChart');
var Col = require('react-bootstrap').Col;


var RightContainer = React.createClass({
	propTypes: {
		sizeOfGearsFront: React.PropTypes.arrayOf(React.PropTypes.number),
		currentNumberOfGearsFront: React.PropTypes.number,
		sizeOfGearsRear: React.PropTypes.arrayOf(React.PropTypes.number),
		currentNumberOfGearsRear : React.PropTypes.number,
		handleRadioChange: React.PropTypes.func,
		handleTextChange: React.PropTypes.func,
	    sizeOfGearsOnOppositeFront: React.PropTypes.arrayOf(React.PropTypes.number),
	    sizeOfGearsOnOppositeRear: React.PropTypes.arrayOf(React.PropTypes.number),
	    currentNumberOfGearsOppositeFront: React.PropTypes.number,
	    currentNumberOfGearsOppositeRear: React.PropTypes.number,
	    selectedGearFront: React.PropTypes.object,
	    selectedGearRear: React.PropTypes.object,
	    handleSelectedGearChange: React.PropTypes.func,
	    tireSize: React.PropTypes.number,
	    oppositeTireSize: React.PropTypes.number,
	    handleTireSizeChange: React.PropTypes.func,
	    showRatios: React.PropTypes.bool,
	    handleShowRatioChange: React.PropTypes.func,
	    oppositeSelectedFrontValue: React.PropTypes.number,
	    oppositeSelectedRearValue: React.PropTypes.number
	},
	calculateGearsToHighlight: function() {
		const leftFront = this.props.oppositeSelectedFrontValue;
		const leftRear = this.props.oppositeSelectedRearValue;
		let gearsToHighlight = [];
		if (leftFront != null && leftRear != null) {
			const sizeOfGearsFront =  this.props.sizeOfGearsFront;
			const sizeOfGearsRear =  this.props.sizeOfGearsRear;
			const tireSize = this.props.tireSize;
			const oppositeTireSize = this.props.oppositeTireSize;
			const leftRatio = this.props.showRatios ? leftFront / leftRear : leftFront / leftRear * oppositeTireSize;
			const selectedRatioPerTooth = 1 / leftFront;
			const limitValue = this.props.showRatios ? 2 * selectedRatioPerTooth : 2 * selectedRatioPerTooth * oppositeTireSize;
			let ratio = null;
			
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
		} else {
			return gearsToHighlight;
		}
	},
	render: function () {
		return (
		<Col xs={6} sm={6} md={6} lg={6}>
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