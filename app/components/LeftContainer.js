var React = require('react');
var Front = require('../components/Front');
var Rear  = require('../components/Rear');


var LeftContainer = React.createClass({
	render: function () {
		return (
		<div className="left-container">
			<Front />
			<Rear />
		</div>
		)
	}
});

module.exports = LeftContainer;