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
		if (side == "Left" && position == "Front") {
			var tempArray = this.state.left.sizeOfGearsFront.slice();
			tempArray[index] = value;
			var newState = Update(this.state.left, {sizeOfGearsFront: {$set: tempArray}});
			this.setState({left: newState});
		} else {
			console.log("Something Else Happened.");
		}
		// OLD WAY
		// var tempArray = this.state.sizeOfGearsFront.slice();
		// tempArray[e.target.name] = e.target.value;
		// this.setState({sizeOfGearsFront: tempArray});
	},
	handleRadioChange: function (value, side, position) {
		if (side == "Left" && position == "Front") {
			var newState = Update(this.state.left, {currentNumberOfGearsFront: {$set: value}});
			this.setState({left: newState});
		} else {
			console.log("Something Else happened in the radio")
		}
		// OLD WAY
		// var value = e.target.value;
		// this.setState({currentNumberOfGearsFront: value});
	},
	handleTextChangeRear: function (e) {
		//Slice to tempArray to create a new copy, rather than a reference, to avoid modifying state directly.
		var tempArray = this.state.sizeOfGearsRear.slice();
		tempArray[e.target.name] = e.target.value;
		this.setState({sizeOfGearsRear: tempArray});
	},
	handleRadioChangeRear: function (e) {
		var value = e.target.value;
		this.setState({currentNumberOfGearsRear: value});
	},
	render: function () {
		return (
		<div>	
			<LeftContainer sizeOfGearsFront = {this.state.left.sizeOfGearsFront}
				   currentNumberOfGearsFront = {this.state.left.currentNumberOfGearsFront}
				   sizeOfGearsRear = {this.state.left.sizeOfGearsRear}
				   currentNumberOfGearsRear = {this.state.left.currentNumberOfGearsRear}
				   handleRadioChange = {this.handleRadioChange}
				   handleTextChange = {this.handleTextChange} />
			<RightContainer />
		</div>
		);
	}
});

module.exports = App;