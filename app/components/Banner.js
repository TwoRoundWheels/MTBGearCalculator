var React = require('react');
var Col = require('react-bootstrap').Col;

var Banner = React.createClass({
	render: function () {
		return(
			<Col xsOffset={2} smOffset={3} mdOffset={3} lgOffset={3} xs={8} sm={6} md={6} lg={6} className="banner">
				<h1>MTB Gear Calculator</h1>
			</Col> 
			);
	}
});

module.exports = Banner;