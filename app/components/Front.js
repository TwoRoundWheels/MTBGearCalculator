var React = require('react');

var ulStyle = {
	display: 'block',
	position: 'relative'
}

var liStyle = {
	height: 50,
	width: 5,
	backgroundColor: 'grey',
	display: 'inline-block',
	margin: 3
}

var Front = React.createClass({
	getInitialState: function () {
		return {sizeOfGears: [22, 32, 44]};
	},
	render: function() {
		var gearVisualisation = this.state.sizeOfGears.map(function(size, index) {
			liStyle.height = size * 5;
			return <li key={index} style={liStyle}>{size}</li>
		});	
		return (
			<ul style={ulStyle}>
				{gearVisualisation}
			</ul>
			);
	} 
});

module.exports = Front;