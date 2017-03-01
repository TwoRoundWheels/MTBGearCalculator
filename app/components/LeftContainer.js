var React = require('react');
var Front = require('../components/Front');
var Rear  = require('../components/Rear');
var RatioChart = require('../components/RatioChart');


var LeftContainer = React.createClass({
	render: function () {
		return (
		<div className="left-container">
			<Front sizeOfGears = {this.props.sizeOfGearsFront}
				   currentNumberOfGears = {this.props.currentNumberOfGearsFront}
				   handleRadioChange = {this.props.handleRadioChange}
				   handleTextChange = {this.props.handleTextChange}
				   position = "Front"
				   side = "Left"
				   selectedGearFront = {this.props.selectedGearFront}
				   handleSelectedGearChange = {this.props.handleSelectedGearChange} />

			<Rear sizeOfGears = {this.props.sizeOfGearsRear}
			      currentNumberOfGears = {this.props.currentNumberOfGearsRear}
			      handleRadioChange = {this.props.handleRadioChange}
			      handleTextChange = {this.props.handleTextChange}
			      position = "Rear"
			      side = "Left"
			      selectedGearRear = {this.props.selectedGearRear}
			      handleSelectedGearChange = {this.props.handleSelectedGearChange} />

			<RatioChart numberOfGearsFront = {this.props.currentNumberOfGearsFront}
						numberOfGearsRear = {this.props.currentNumberOfGearsRear}
						sizeOfGearsFront = {this.props.sizeOfGearsFront}
						sizeOfGearsRear = {this.props.sizeOfGearsRear} 
						sizeOfGearsOnOppositeFront = {this.props.sizeOfGearsOnOppositeFront}
				   		sizeOfGearsOnOppositeRear = {this.props.sizeOfGearsOnOppositeRear}
				   		currentNumberOfGearsOppositeFront = {this.props.currentNumberOfGearsOppositeFront}
				   		currentNumberOfGearsOppositeRear = {this.props.currentNumberOfGearsOppositeRear} />

		</div>
		)
	}
});

module.exports = LeftContainer;