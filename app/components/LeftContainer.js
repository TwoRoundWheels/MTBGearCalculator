var React = require('react');
var Front = require('../components/Front');
var Rear  = require('../components/Rear');
var RatioChart = require('../components/RatioChart');


var LeftContainer = React.createClass({
	getInitialState: function () {
		return {
			sizeOfGearsFront: [22, 32, 44],
			currentNumberOfGearsFront: 3,
			sizeOfGearsRear: [50, 42, 36, 32, 28, 24, 21, 18, 16, 14, 12, 10],
			currentNumberOfGearsRear: 12
		};
	},
	handleTextChangeFront: function (e) {
		//Slice tempArray to create a new copy, rather than a reference, to avoid modifying state directly.
		console.log("FRONT RAN");
		var tempArray = this.state.sizeOfGearsFront.slice();
		tempArray[e.target.name] = e.target.value;
		this.setState({sizeOfGearsFront: tempArray});
	},
	handleRadioChangeFront: function (e) {
		var value = e.target.value;
		this.setState({currentNumberOfGearsFront: value});
	},
	handleTextChangeRear: function (e) {
		//Slice to tempArray to create a new copy, rather than a reference, to avoid modifying state directly.
		console.log("REAR RAN");
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
		<div className="left-container">
			<Front sizeOfGears = {this.state.sizeOfGearsFront}
				   currentNumberOfGears = {this.state.currentNumberOfGearsFront}
				   handleRadioChange = {this.handleRadioChangeFront}
				   handleTextChange = {this.handleTextChangeFront}/>

			<Rear sizeOfGears = {this.state.sizeOfGearsRear}
			      currentNumberOfGears = {this.state.currentNumberOfGearsRear}
			      handleRadioChange = {this.handleRadioChangeRear}
			      handleTextChange = {this.handleTextChangeRear}/>

			<RatioChart numberOfGearsFront = {this.state.currentNumberOfGearsFront}
						numberOfGearsRear = {this.state.currentNumberOfGearsRear}
						sizeOfGearsFront = {this.state.sizeOfGearsFront}
						sizeOfGearsRear = {this.state.sizeOfGearsRear}/>

		</div>
		)
	}
});

module.exports = LeftContainer;