var React = require('react');
var LeftContainer = require('../components/LeftContainer');
var RightContainer = require('../components/RightContainer');

var h1Style = {
	color: "red"
}

var App = React.createClass({
	render: function () {
		return (
		<div>	
			<LeftContainer />
			<RightContainer />
		</div>
		);
	}
});

module.exports = App;