var React = require('react');
var GearSelectionForm = require('../components/GearSelectionForm');

var Front = React.createClass({
	defaultProps: {
		defaultGearNumbers: [1, 2, 3],
		similarRatioClasses: ["similar-ratio1", "similar-ratio2", "similar-ratio3", "similar-ratio4"]
	},
	handleClick: function (e) {
		var side = this.props.side;
		var position = this.props.position;
		if (side === "Left") {
			if (e.target === this.props.selectedGearFront) {
				e.target.classList.toggle("selectedGear");
				var selected = null;
				this.props.handleSelectedGearChange(side, position, selected);
			} else if (this.props.selectedGearFront === null) {
				e.target.classList.toggle("selectedGear");
				var selected = e.target;
				this.props.handleSelectedGearChange(side, position, selected);
			} else {
				this.props.selectedGearFront.classList.toggle("selectedGear");
				e.target.classList.toggle("selectedGear");
				var selected = e.target;
				this.props.handleSelectedGearChange(side, position, selected);
			}
		}
	},
	render: function() {
		var HEIGHTMODIFIER = 3;
		var numberOfGears = this.props.currentNumberOfGears;
		var gearsToHighlight = this.props.gearsToHighlight;
		var side = this.props.side;
		var classes = this.defaultProps.similarRatioClasses;

		var gears = this.props.sizeOfGears.map(function(size, index) {
			if(index < numberOfGears) {
				if (side === "Right" && gearsToHighlight.length > 0) {
					for (var i = 0; i < gearsToHighlight.length; i++) {
						if (index === gearsToHighlight[i][0]) {
							return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className={"gear " + classes[i]} onClick={this.handleClick}>{size}</li>
						} 
					}
					return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className="gear" onClick={this.handleClick}>{size}</li>
				} else {
					return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className={side==="Left" ? "gear pointer-on-hover" : "gear"} onClick={this.handleClick}>{size}</li>
				}	
			}	
		}, this);
		
		return (
			<div className="front-container">
				<GearSelectionForm 
					radioChange={this.props.handleRadioChange} 
					textChange={this.props.handleTextChange} 
					number={this.props.currentNumberOfGears} 
					sizes={this.props.sizeOfGears}
					defaultGears={this.defaultProps.defaultGearNumbers}
					position={this.props.position}
					side={this.props.side}
					selectedGear = {this.props.selectedGearFront}
					selectedGearInput = {this.props.selectedGearInput} />
				<ul className="gears text-center">
					{gears}
				</ul>
			</div>
			);
	} 
});

module.exports = Front;