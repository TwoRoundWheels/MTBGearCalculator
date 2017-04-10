var React = require('react');
var Front = require('../components/Front');
var Rear  = require('../components/Rear');
var RatioChart = require('../components/RatioChart');
var Col = require('react-bootstrap').Col;



var LeftContainer = React.createClass({
	propTypes: {
		sizeOfGearsFront: React.PropTypes.arrayOf(React.PropTypes.number),
		currentNumberOfGearsFront: React.PropTypes.number,
		sizeOfGearsRear: React.PropTypes.arrayOf(React.PropTypes.number),
		currentNumberOfGearsRear: React.PropTypes.number,
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
		selectedFrontValue: React.PropTypes.number,
		selectedRearValue: React.PropTypes.number,
		selectedGearInputFront: React.PropTypes.number,
		selectedGearInputRear: React.PropTypes.number
	},
	render: function () {
		return (
		<Col xs={6} sm={6} md={6} lg={6}>
			<div className="left-container">
				<Front sizeOfGears = {this.props.sizeOfGearsFront}
					   currentNumberOfGears = {this.props.currentNumberOfGearsFront}
					   handleRadioChange = {this.props.handleRadioChange}
					   handleTextChange = {this.props.handleTextChange}
					   position = "Front"
					   side = "Left"
					   selectedGearFront = {this.props.selectedGearFront}
					   handleSelectedGearChange = {this.props.handleSelectedGearChange}
					   selectedGearInput = {this.props.selectedGearInputFront} />

				<Rear sizeOfGears = {this.props.sizeOfGearsRear}
				      currentNumberOfGears = {this.props.currentNumberOfGearsRear}
				      handleRadioChange = {this.props.handleRadioChange}
				      handleTextChange = {this.props.handleTextChange}
				      position = "Rear"
				      side = "Left"
				      selectedGearRear = {this.props.selectedGearRear}
				      handleSelectedGearChange = {this.props.handleSelectedGearChange}
				      tireSize = {this.props.tireSize}
				      handleTireSizeChange = {this.props.handleTireSizeChange}
				      selectedGearInput = {this.props.selectedGearInputRear} />

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
					   		side = "Left"
					   		selectedFrontValue = {this.props.selectedFrontValue}
					   		selectedRearValue = {this.props.selectedRearValue} />

			</div>
		</Col>
		)
	}
});

module.exports = LeftContainer;