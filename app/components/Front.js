var React = require('react');
var GearSelectionForm = require('../components/GearSelectionForm');
var Collapse = require('react-bootstrap').Collapse;
var Button = require('react-bootstrap').Button;

var Front = React.createClass({
	propTypes: {
		sizeOfGears: React.PropTypes.arrayOf(React.PropTypes.number),
		currentNumberOfGears: React.PropTypes.number,
		handleRadioChange: React.PropTypes.func,
		handleTextChange: React.PropTypes.func,
		position: React.PropTypes.string,
		side: React.PropTypes.string,
		selectedGearFront: React.PropTypes.object,
		handleSelectedGearChange: React.PropTypes.func,
		selectedGearInput: React.PropTypes.number
	},
	defaultProps: {
		defaultGearNumbers: [1, 2, 3],
		similarRatioClasses: ['similar-ratio1', 'similar-ratio2', 'similar-ratio3', 'similar-ratio4', 'similar-ratio5'],
		similarRatioColors: ['rgba(93, 255, 60, .9)', 'rgba(255, 255, 0, .9)', 'rgba(128, 50, 123, .9)', 'rgba(255, 165, 0, .5)', 'rgba(255, 0, 0, .9)']
	},
	handleClick: function (e) {
		const side = this.props.side;
		const position = this.props.position;
		if (side === "Left") {
			if (e.target === this.props.selectedGearFront) {
				e.target.classList.toggle("selectedGear");
				let selected = null;
				this.props.handleSelectedGearChange(side, position, selected);
			} else if (this.props.selectedGearFront === null) {
				e.target.classList.toggle("selectedGear");
				let selected = e.target;
				this.props.handleSelectedGearChange(side, position, selected);
			} else {
				this.props.selectedGearFront.classList.toggle("selectedGear");
				e.target.classList.toggle("selectedGear");
				let selected = e.target;
				this.props.handleSelectedGearChange(side, position, selected);
			}
		}
	},
	calculateAndDisplayGears: function () {
		const HEIGHTMODIFIER = 3;
		const numberOfGears = this.props.currentNumberOfGears;
		const gearsToHighlight = this.props.gearsToHighlight;
		const side = this.props.side;
		const classes = this.defaultProps.similarRatioClasses;
		const colors = this.defaultProps.similarRatioColors;
		var totalCount = 0;
		var gears = this.props.sizeOfGears.map(function(size, index) {
			if(index < numberOfGears) {
				if (side === "Right" && gearsToHighlight.length > 0) {
					let count = 0;
					for (let i = 0; i < gearsToHighlight.length; i++) {
						if (index === gearsToHighlight[i][0]) {
							count += 1;
						} 	
					}
					totalCount += count;
					if (count === 0) {
						return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className="gear" onClick={this.handleClick}>{size}</li>
					} else if (count === 1) {
						return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className={"gear " + classes[totalCount - 1]} onClick={this.handleClick}>{size}</li>	
					} else {
						colorIndex = 0;
						gradientString = "linear-gradient(180deg "
						for (let i = 0; i < count; i++) {
							colorIndex += 1;
							gradientString += ", " + colors[totalCount - colorIndex];
						}
						gradientString += ")"
						return <li key={index} style={{height: size * HEIGHTMODIFIER, background: gradientString, color: "black"}} value={size} className={"gear "} onClick={this.handleClick}>{size}</li>
					}	
				} else {
					return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className={side==="Left" ? "gear pointer-on-hover" : "gear"} onClick={this.handleClick}>{size}</li>
				}	
			}	
		}, this);
		return gears;
	},
	render: function () {
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
					{this.calculateAndDisplayGears()}
				</ul>
			</div>
			);
	} 
});

module.exports = Front;