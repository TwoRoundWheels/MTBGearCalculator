var React = require('react');
var GearSelectionForm = require('../components/GearSelectionForm');

var Front = React.createClass({
	defaultProps: {
		defaultGearNumbers: [1, 2, 3]
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
				<GearSelectionForm 
					radioChange={this.props.handleRadioChange} 
					textChange={this.props.handleTextChange} 
					number={this.props.currentNumberOfGears} 
					sizes={this.props.sizeOfGears}
					defaultGears={this.defaultProps.defaultGearNumbers}/>
				<ul className="gears">
					{gears}
				</ul>
			</div>
			);
	} 
});

module.exports = Front;