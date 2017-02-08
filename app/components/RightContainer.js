var React = require('react');

var containerStyle = {
	backgroundColor: 'yellow',
	width: '50%',
	right: 0,
	position: 'absolute'
};

var RightContainer = React.createClass({
	render: function () {
		return (
			<div style={containerStyle}>
				<h1>Hola</h1>
			</div>
			)
	}
});

module.exports = RightContainer;