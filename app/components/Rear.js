var React = require('react');
var Label = require('react-bootstrap').Label;
var Radio = require('react-bootstrap').Radio;
var GearSelectionForm = require('../components/GearSelectionForm');


var Rear = React.createClass({
	propTypes: {
		sizeOfGears: React.PropTypes.arrayOf(React.PropTypes.number),
		currentNumberOfGears: React.PropTypes.number,
		handleRadioChange: React.PropTypes.func,
		handleTextChange: React.PropTypes.func,
		position: React.PropTypes.string,
		side: React.PropTypes.string,
		selectedGearFront: React.PropTypes.object,
		handleSelectedGearChange: React.PropTypes.func,
		tireSize: React.PropTypes.number,
		handleTireSizeChange: React.PropTypes.func,
		selectedGearInput: React.PropTypes.number
	},
	defaultProps: {
		defaultGearNumbers: [1, 7, 8, 9, 10, 11, 12],
		similarRatioClasses: ["similar-ratio1", "similar-ratio2", "similar-ratio3", "similar-ratio4", "similar-ratio5"]
	},
	handleClick: function (e) {
		const side = this.props.side;
		const position = this.props.position;
		if (side === "Left") {
			if (e.target === this.props.selectedGearRear) {
				e.target.classList.toggle("selectedGear");
				let selected = null;
				this.props.handleSelectedGearChange(side, position, selected);
			} else if (this.props.selectedGearRear === null) {
				e.target.classList.toggle("selectedGear");
				let selected = e.target;
				this.props.handleSelectedGearChange(side, position, selected);
			} else {
				this.props.selectedGearRear.classList.toggle("selectedGear");
				e.target.classList.toggle("selectedGear");
				let selected = e.target;
				this.props.handleSelectedGearChange(side, position, selected);
			}
		}
	},
	handleRadioChange: function (e) {
		const side = this.props.side;
		const value = Number(e.target.value);
		this.props.handleTireSizeChange(side, value);
	},
	calculateAndDisplayGears: function () {
		const HEIGHTMODIFIER = 3;
		const gearsToHighlight = this.props.gearsToHighlight;
		const side = this.props.side;
		const numberOfGears = this.props.currentNumberOfGears;
		const classes = this.defaultProps.similarRatioClasses;

		var gears = this.props.sizeOfGears.map(function(size, index) {
			if (index < numberOfGears) {
				if (side === "Right" && gearsToHighlight.length > 0) {
					for (let i = 0; i < gearsToHighlight.length; i++) {
						if (index === gearsToHighlight[i][1]) {
							return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className={"gear " + classes[i]} onClick={this.handleClick}>{size}</li>
						} 
					}
					return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className="gear" onClick={this.handleClick}>{size}</li>
				} else {
					return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className={side==="Left" ? "gear pointer-on-hover" : "gear"} onClick={this.handleClick}>{size}</li>
				}	
			}
		}, this);
		return gears;	
	},
	render: function() {
		return (
			<div className="rear-container">
				<ul className="gears text-center">
					{this.calculateAndDisplayGears()}
				</ul>
				<form className="gear-selection-form pull-right" onChange={this.handleRadioChange} >
					<h4><Label>Tire Size: </Label></h4>
						<Radio inline 
							   name="tire-size" 
							   value={26} 
							   defaultChecked={true}>
						26
						</Radio>
						<Radio inline 
							   name="tire-size" 
							   value={27.5} 
							   defaultChecked={false}>
						27.5
						</Radio>
						<Radio inline 
							   name="tire-size" 
							   value={29} 
							   defaultChecked={false}>
						29
						</Radio>
				</form>
				<GearSelectionForm 
					radioChange={this.props.handleRadioChange} 
					textChange={this.props.handleTextChange} 
					number={this.props.currentNumberOfGears} 
					sizes={this.props.sizeOfGears}
					defaultGears={this.defaultProps.defaultGearNumbers}
					position={this.props.position}
					side={this.props.side}
					selectedGear={this.props.selectedGearRear}
					selectedGearInput = {this.props.selectedGearInput} />
			</div>
			);
	} 
});

module.exports = Rear;