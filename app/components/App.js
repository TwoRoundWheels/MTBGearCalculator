var React = require('react');
var Banner = require('../components/Banner');
var LeftContainer = require('../components/LeftContainer');
var RightContainer = require('../components/RightContainer');
var Update = require('React-addons-update');
var Instructions = require('../components/Instructions');
var Row = require('react-bootstrap').Row;
var h1Style = {
	color: "red"
}

var App = React.createClass({
	defaultSizes: {
		"1": [32],
		"2": [26, 36],
		"3": [22, 32, 42],
		"7": [28, 24, 21, 18, 16, 14, 12],
		"8": [32, 28, 24, 21, 18, 15, 13, 11],
		"9": [36, 32, 30, 28, 26, 24, 22, 18, 16],
		"10": [36, 32, 30, 28, 26, 24, 22, 20, 18, 16],
		"11": [42, 36, 32, 28, 25, 22, 19, 17, 15, 13, 11],
		"12": [50, 42, 36, 32, 28, 24, 21, 18, 16, 14, 12, 10]
			
	},
	getInitialState: function () {
		return (
				{
				left:  {sizeOfGearsFront: [22, 32, 44],
						currentNumberOfGearsFront: 3,
						sizeOfGearsRear: [36, 32, 30, 28, 26, 24, 22, 18, 16],
						currentNumberOfGearsRear: 9,
						selectedGearFront: null,
						selectedGearRear: null,
						selectedGearFrontValue: null,
						selectedGearRearValue: null,
						selectedGearInputFront: null,
						selectedGearInputRear: null,
						tireSize: 26},

				right: {sizeOfGearsFront: [22, 32, 44],
						currentNumberOfGearsFront: 3,
						sizeOfGearsRear: [36, 32, 30, 28, 26, 24, 22, 18, 16],
						currentNumberOfGearsRear: 9,
						tireSize: 26},
				showRatios: true
				}
		);
	},
	handleTextChange: function (value, index, side, position, selected) {
		//Slice to tempArray to create a new copy, rather than a reference, to avoid modifying state directly.
		//Use Update from react-addons-update to update properties, then use setState.  Using setState 
		//alone would throw an error updating nested objects, or would erase the other object properties
		//when using setState({left {sizeOfGears: tempArray}}).
		if (side === "Left" && position === "Front") {
			let tempArray = this.state.left.sizeOfGearsFront.slice();
			tempArray[index] = value;
			if (selected === true) {
				let newState = Update(this.state.left, {sizeOfGearsFront: {$set: tempArray},
											            selectedGearFrontValue: {$set: value}});
			 	this.setState({left: newState});
			} else {
				let newState = Update(this.state.left, {sizeOfGearsFront: {$set: tempArray}});
			 	this.setState({left: newState});
			}
		} else if (side === "Left" && position === "Rear") {
			let tempArray = this.state.left.sizeOfGearsRear.slice();
			tempArray[index] = value;
			if (selected === true) {
				let newState = Update(this.state.left, {sizeOfGearsRear: {$set: tempArray},
											            selectedGearRearValue: {$set: value}});
			 	this.setState({left: newState});
			} else {
				let newState = Update(this.state.left, {sizeOfGearsRear: {$set: tempArray}});
				this.setState({left: newState});
			}
		} else if (side === "Right" && position === "Front") {
			let tempArray = this.state.right.sizeOfGearsFront.slice();
			tempArray[index] = value;
			let newState = Update(this.state.right, {sizeOfGearsFront: {$set: tempArray}});
			this.setState({right: newState});
		} else if (side === "Right" && position === "Rear") {
			let tempArray = this.state.right.sizeOfGearsRear.slice();
			tempArray[index] = value;
			let newState = Update(this.state.right, {sizeOfGearsRear: {$set: tempArray}});
			this.setState({right: newState});
		} else {
			console.warn("Failed to Update State.");
		}
	},
	handleRadioChange: function (value, side, position) {
		//Use Update from react-addons-update to update properties, then use setState.  Using setState 
		//alone would throw an error updating nested objects, or would erase the other object properties
		//when using setState({left {sizeOfGears: tempArray}}).
		if (side === "Left" && position === "Front") {
			let newState = Update(this.state.left, {currentNumberOfGearsFront: {$set: value},
													sizeOfGearsFront: {$set: this.defaultSizes[value]}});
			this.setState({left: newState});
		} else if (side === "Left" && position === "Rear") {
			let newState = Update(this.state.left, {currentNumberOfGearsRear: {$set: value},
													sizeOfGearsRear: {$set: this.defaultSizes[value]}});
			this.setState({left: newState});
		} else if (side === "Right" && position === "Front") {
			let newState = Update(this.state.right, {currentNumberOfGearsFront: {$set: value},
													sizeOfGearsFront: {$set: this.defaultSizes[value]}});
			this.setState({right: newState});
		} else if (side === "Right" && position === "Rear") {
			let newState = Update(this.state.right, {currentNumberOfGearsRear: {$set: value},
													sizeOfGearsRear: {$set: this.defaultSizes[value]}});
			this.setState({right: newState});
		} else {
			console.warn("Failed to Update State.");
		}
	},
	handleSelectedGearChange: function (side, position, selected) {
		let value = selected != null ? selected.value : null
		if (side === "Left" && position === "Front") {
			let selectedInput = value != null ? this.state.left.sizeOfGearsFront.indexOf(value) : null;
			let newState = Update(this.state.left, {selectedGearFront: {$set: selected}, 
													selectedGearFrontValue: {$set: value},
													selectedGearInputFront: {$set: selectedInput}});
			this.setState({left: newState});
		} else if (side === "Left" && position ==="Rear") {
			let selectedInput = value != null ? this.state.left.sizeOfGearsRear.indexOf(value) : null;
			let newState = Update(this.state.left, {selectedGearRear: {$set: selected},
													selectedGearRearValue: {$set: value},
													selectedGearInputRear: {$set: selectedInput}});
			this.setState({left: newState});
		} else {
			console.warn("Failed to Update State of Selected Gear.");
		}
	},
	handleTireSizeChange: function (side, value) {
		if (side === "Left") {
			let newState = Update(this.state.left, {tireSize: {$set: value}});
			this.setState({left: newState});
		} else if (side === "Right") {
			let newState = Update(this.state.right, {tireSize: {$set: value}});
			this.setState({right: newState});
		} else {
			console.warn("Failed to Update State of Tire Size.");
		}
	},
	handleShowRatioChange: function (value) {
		this.setState({showRatios: value});
	},
	render: function () {
		return (
		<div>
			<Row>
				<Banner />
			</Row>
			<Row>
				<Instructions />
			</Row>
			<Row>		
				<LeftContainer sizeOfGearsFront = {this.state.left.sizeOfGearsFront}
					   currentNumberOfGearsFront = {this.state.left.currentNumberOfGearsFront}
					   sizeOfGearsRear = {this.state.left.sizeOfGearsRear}
					   currentNumberOfGearsRear = {this.state.left.currentNumberOfGearsRear}
					   handleRadioChange = {this.handleRadioChange}
					   handleTextChange = {this.handleTextChange} 
					   sizeOfGearsOnOppositeFront = {this.state.right.sizeOfGearsFront}
					   sizeOfGearsOnOppositeRear = {this.state.right.sizeOfGearsRear} 
					   currentNumberOfGearsOppositeFront = {this.state.right.currentNumberOfGearsFront}
					   currentNumberOfGearsOppositeRear = {this.state.right.currentNumberOfGearsRear} 
					   selectedGearFront = {this.state.left.selectedGearFront} 
					   selectedGearRear = {this.state.left.selectedGearRear}
					   handleSelectedGearChange = {this.handleSelectedGearChange}
					   tireSize = {this.state.left.tireSize}
					   oppositeTireSize = {this.state.right.tireSize}
					   handleTireSizeChange = {this.handleTireSizeChange} 
					   showRatios = {this.state.showRatios}
					   handleShowRatioChange = {this.handleShowRatioChange}
					   selectedFrontValue = {this.state.left.selectedGearFrontValue}
					   selectedRearValue = {this.state.left.selectedGearRearValue}
					   selectedGearInputFront = {this.state.left.selectedGearInputFront}
					   selectedGearInputRear = {this.state.left.selectedGearInputRear} />
				
				<RightContainer sizeOfGearsFront = {this.state.right.sizeOfGearsFront}
					   currentNumberOfGearsFront = {this.state.right.currentNumberOfGearsFront}
					   sizeOfGearsRear = {this.state.right.sizeOfGearsRear}
					   currentNumberOfGearsRear = {this.state.right.currentNumberOfGearsRear}
					   handleRadioChange = {this.handleRadioChange}
					   handleTextChange = {this.handleTextChange} 
					   sizeOfGearsOnOppositeFront = {this.state.left.sizeOfGearsFront}
					   sizeOfGearsOnOppositeRear = {this.state.left.sizeOfGearsRear}
					   currentNumberOfGearsOppositeFront = {this.state.left.currentNumberOfGearsFront}
					   currentNumberOfGearsOppositeRear = {this.state.left.currentNumberOfGearsRear}
					   selectedGearFront = {this.state.right.selectedGearFront} 
					   selectedGearRear = {this.state.right.selectedGearRear}
					   handleSelectedGearChange = {this.handleSelectedGearChange}
					   tireSize = {this.state.right.tireSize}
					   oppositeTireSize = {this.state.left.tireSize}
					   handleTireSizeChange = {this.handleTireSizeChange}
					   showRatios = {this.state.showRatios}
					   handleShowRatioChange = {this.handleShowRatioChange}
					   oppositeSelectedFrontValue = {this.state.left.selectedGearFrontValue}
					   oppositeSelectedRearValue = {this.state.left.selectedGearRearValue} />
				</Row>
		</div>
		);
	}
});

module.exports = App;