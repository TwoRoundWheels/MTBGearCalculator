var React = require('react');
var Front = require('../components/Front')

var containerStyle = {
	backgroundColor: 'red',
	width: '50%',
	left: 0,
	position: 'absolute'
};

var LeftContainer = React.createClass({
	render: function () {
		return (
		<div style={containerStyle}>
			<Front />
		</div>
		)
	}
});

module.exports = LeftContainer;