var React = require('react');
var Front = require('../components/Front')


var LeftContainer = React.createClass({
	render: function () {
		return (
		<div className="left-container">
			<Front />
		</div>
		)
	}
});

module.exports = LeftContainer;