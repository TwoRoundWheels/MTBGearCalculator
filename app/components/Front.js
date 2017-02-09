var React = require('react');
var GearSelectionForm = require('../components/GearSelectionForm');

var Front = React.createClass({
	getInitialState: function () {
		return {
			sizeOfGears: [22, 32, 44],
			numberOfGears: 3
		};
	},
	render: function() {
		var gears = this.state.sizeOfGears.map(function(size, index) {
			return <li key={index} style={{height: size * 5}}className="gear">{size}</li>
		});	
		return (
			<div>
				<GearSelectionForm number={this.state.numberOfGears} sizes={this.state.sizeOfGears}/>
				<ul className="gears">
					{gears}
				</ul>
			</div>
			);
	} 
});

module.exports = Front;