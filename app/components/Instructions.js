var React = require('react');
var Button = require('react-bootstrap').Button;
var Collapse = require('react-bootstrap').Collapse;
var Well = require('react-bootstrap').Well;
var Glyph = require('react-bootstrap').Glyphicon;

var Instructions = React.createClass({
	getInitialState: function () {
		return {};
	},
	toggleClass: function (e) {
		e.target.child.classList.toggle("glyphicon-chevron-down");
	},
	render: function () {
		return (
		<div className="text-center">
        	<Button className="instructions-btn" onClick={ () => this.setState({open: !this.state.open})}>
          		Instructions <Glyph glyph={this.state.open ? "arrow-up" : "arrow-down"} />
        	</Button>
	        <Collapse in={this.state.open}>
	         	<div >
					<Well className="instructions-text text-left">
						<ul>
							<li>Select the number of gears front and rear and fill in the sizes (number of teeth) for each.
							 The chart at the bottom of the page will display the calculated ratios.  
						 	 Set up the left and right side differently if you would like to compare two different gear configurations.
							</li>
							<li>Displaying gear ratios and gear inches can be toggled at the bottom of the page.  Gear inches is 
							 a calculation of the gear ratio multiplied by the tire size.  This can be used to compare the ratios
							 between two different tire sizes.
							</li>
							<li>Have that perfect gear you like climbing the local hill in? By clicking that combination on the left side 
							  similar combinations will be highlighted on the right side and in the chart. Ratios are highlighted as similar
							  if they are less than 2 teeth from the selected combination -i.e., less than a typical rear cassette shift.  
							</li>
						</ul>
					</Well>
	         	</div>
	        </Collapse>
        </div>
		)
		
	}
})

module.exports = Instructions;