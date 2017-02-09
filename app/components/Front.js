var React = require('react');
var GearSelectionForm = require('../components/GearSelectionForm');

var Front = React.createClass({
	getInitialState: function () {
		return {
			sizeOfGears: [22, 32, 44],
			numberOfGears: 3
		};
	},
	handleTextChange: function (e) {
		//Slice tempArray to create a new copy, rather than a reference, to avoid modifying state directly.
		var tempArray = this.state.sizeOfGears.slice();
		tempArray[e.target.name] = e.target.value;
		this.setState({sizeOfGears: tempArray});
	},
	handleRadioChange: function (e) {
		var value = e.target.value;
		this.setState({numberOfGears: value});
	},
	render: function() {
		var HEIGHTMODIFIER = 5;
		numberOfGears = this.state.numberOfGears;
		var gears = this.state.sizeOfGears.map(function(size, index) {
			if(index + 1 <= numberOfGears) {
				return <li key={index} style={{height: size * HEIGHTMODIFIER}}className="gear">{size}</li>
			}
			
		});	
		return (
			<div>
				<GearSelectionForm radioChange={this.handleRadioChange} textChange={this.handleTextChange} number={this.state.numberOfGears} sizes={this.state.sizeOfGears}/>
				<ul className="gears">
					{gears}
				</ul>
			</div>
			);
	} 
});

module.exports = Front;