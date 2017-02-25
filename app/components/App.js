var React = require('react');
var LeftContainer = require('../components/LeftContainer');
var RightContainer = require('../components/RightContainer');
var Update = require('React-addons-update');

var h1Style = {
	color: "red"
}

var App = React.createClass({
	getInitialState: function () {
		return (
				{
				left:  {sizeOfGearsFront: [22, 32, 44],
						currentNumberOfGearsFront: 3,
						sizeOfGearsRear: [50, 42, 36, 32, 28, 24, 21, 18, 16, 14, 12, 10],
						currentNumberOfGearsRear: 12},

				right: {sizeOfGearsFront: [22, 32, 44],
						currentNumberOfGearsFront: 3,
						sizeOfGearsRear: [50, 42, 36, 32, 28, 24, 21, 18, 16, 14, 12, 10],
						currentNumberOfGearsRear: 12}
				}
		);
	},
	handleTextChange: function (value, index, side, position) {
		//Slice to tempArray to create a new copy, rather than a reference, to avoid modifying state directly.
		//Use Update from react-addons-update to update properties, then use setState.  Using setState 
		//alone would throw an error updating nested objects, or would erase the other object properties
		//when using setState({left {sizeOfGears: tempArray}}).
		if (side === "Left" && position === "Front") {
			var tempArray = this.state.left.sizeOfGearsFront.slice();
			tempArray[index] = value;
			var newState = Update(this.state.left, {sizeOfGearsFront: {$set: tempArray}});
			this.setState({left: newState});
		} else if (side === "Left" && position === "Rear") {
			var tempArray = this.state.left.sizeOfGearsRear.slice();
			tempArray[index] = value;
			var newState = Update(this.state.left, {sizeOfGearsRear: {$set: tempArray}});
			this.setState({left: newState});
		} else if (side === "Right" && position === "Front") {
			var tempArray = this.state.right.sizeOfGearsFront.slice();
			tempArray[index] = value;
			var newState = Update(this.state.right, {sizeOfGearsFront: {$set: tempArray}});
			this.setState({right: newState});
		} else if (side === "Right" && position === "Rear") {
			var tempArray = this.state.right.sizeOfGearsRear.slice();
			tempArray[index] = value;
			var newState = Update(this.state.right, {sizeOfGearsRear: {$set: tempArray}});
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
			var newState = Update(this.state.left, {currentNumberOfGearsFront: {$set: value}});
			this.setState({left: newState});
		} else if (side === "Left" && position === "Rear") {
			var newState = Update(this.state.left, {currentNumberOfGearsRear: {$set: value}});
			this.setState({left: newState});
		} else if (side === "Right" && position === "Front") {
			var newState = Update(this.state.right, {currentNumberOfGearsFront: {$set: value}});
			this.setState({right: newState});
		} else if (side === "Right" && position === "Rear") {
			var newState = Update(this.state.right, {currentNumberOfGearsRear: {$set: value}});
			this.setState({right: newState});
		} else {
			console.warn("Failed to Update State.")
		}
	},
	render: function () {
		return (
		<div>	
			<LeftContainer sizeOfGearsFront = {this.state.left.sizeOfGearsFront}
				   currentNumberOfGearsFront = {this.state.left.currentNumberOfGearsFront}
				   sizeOfGearsRear = {this.state.left.sizeOfGearsRear}
				   currentNumberOfGearsRear = {this.state.left.currentNumberOfGearsRear}
				   handleRadioChange = {this.handleRadioChange}
				   handleTextChange = {this.handleTextChange} 
				   sizeOfGearsOnOppositeFront = {this.state.right.sizeOfGearsFront}
				   sizeOfGearsOnOppositeRear = {this.state.right.sizeOfGearsRear} 
				   currentNumberOfGearsOppositeFront = {this.state.right.currentNumberOfGearsFront}
				   currentNumberOfGearsOppositeRear = {this.state.right.currentNumberOfGearsRear} />
			
			<RightContainer sizeOfGearsFront = {this.state.right.sizeOfGearsFront}
				   currentNumberOfGearsFront = {this.state.right.currentNumberOfGearsFront}
				   sizeOfGearsRear = {this.state.right.sizeOfGearsRear}
				   currentNumberOfGearsRear = {this.state.right.currentNumberOfGearsRear}
				   handleRadioChange = {this.handleRadioChange}
				   handleTextChange = {this.handleTextChange} 
				   sizeOfGearsOnOppositeFront = {this.state.left.sizeOfGearsFront}
				   sizeOfGearsOnOppositeRear = {this.state.left.sizeOfGearsRear}
				   currentNumberOfGearsOppositeFront = {this.state.left.currentNumberOfGearsFront}
				   currentNumberOfGearsOppositeRear = {this.state.left.currentNumberOfGearsRear}/>
		</div>
		);
	}
});

module.exports = App;