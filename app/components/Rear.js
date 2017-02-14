var React = require('react');
var GearSelectionForm = require('../components/GearSelectionForm');

var Rear = React.createClass({
	defaultProps: {
		defaultGearNumbers: [1, 7, 8, 9, 10, 11, 12]
	},
	render: function() {
		var HEIGHTMODIFIER = 5;
		var numberOfGears = this.props.currentNumberOfGears;
		var gears = this.props.sizeOfGears.map(function(size, index) {
			if(index < numberOfGears) {
				return <li key={index} style={{height: size * HEIGHTMODIFIER}} className="gear">{size}</li>
			}
			
		});	
		return (
			<div>
				<ul className="gears">
					{gears}
				</ul>
				<GearSelectionForm 
					radioChange={this.props.handleRadioChange} 
					textChange={this.props.handleTextChange} 
					number={this.props.currentNumberOfGears} 
					sizes={this.props.sizeOfGears}
					defaultGears={this.defaultProps.defaultGearNumbers}/>
			</div>
			);
	} 
});

module.exports = Rear;