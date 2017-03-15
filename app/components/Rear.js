var React = require('react');
var Label = require('react-bootstrap').Label;
var GearSelectionForm = require('../components/GearSelectionForm');

var Rear = React.createClass({
	defaultProps: {
		defaultGearNumbers: [1, 7, 8, 9, 10, 11, 12],
		similarRatioClasses: ["similar-ratio1", "similar-ratio2", "similar-ratio3", "similar-ratio4"]
	},
	handleClick: function (e) {
		var side = this.props.side;
		var position = this.props.position;
		if (side === "Left") {
			if (e.target === this.props.selectedGearRear) {
				e.target.classList.toggle("selectedGear");
				var selected = null;
				this.props.handleSelectedGearChange(side, position, selected);
			} else if (this.props.selectedGearRear === null) {
				e.target.classList.toggle("selectedGear");
				var selected = e.target;
				this.props.handleSelectedGearChange(side, position, selected);
			} else {
				this.props.selectedGearRear.classList.toggle("selectedGear");
				e.target.classList.toggle("selectedGear");
				var selected = e.target;
				this.props.handleSelectedGearChange(side, position, selected);
			}
		}
	},
	handleRadioChange: function (e) {
		var side = this.props.side;
		var value = Number(e.target.value);
		this.props.handleTireSizeChange(side, value);
	},
	render: function() {
		var HEIGHTMODIFIER = 5;
		// var TIREHEIGHTMODIFIER = 10;
		var gearsToHighlight = this.props.gearsToHighlight;
		var side = this.props.side;
		var numberOfGears = this.props.currentNumberOfGears;
		var classes = this.defaultProps.similarRatioClasses;
		var gears = this.props.sizeOfGears.map(function(size, index) {
			if (index < numberOfGears) {
				if (side === "Right" && gearsToHighlight.length > 0) {
					for (var i = 0; i < gearsToHighlight.length; i++) {
						if (index === gearsToHighlight[i][1]) {
							return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className={"gear " + classes[i]} onClick={this.handleClick}>{size}</li>
						} 
					}
					return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className="gear" onClick={this.handleClick}>{size}</li>
				} else {
					return <li key={index} style={{height: size * HEIGHTMODIFIER}} value={size} className="gear" onClick={this.handleClick}>{size}</li>
				}	
			}
		}, this);	
		return (
			<div className="rear-container">
				<ul className="gears text-center">
					{gears}
				</ul>
				<form className="gear-selection-form pull-right" onChange={this.handleRadioChange} >
					<h4><Label>Tire Size: </Label></h4>
						<label>26
							<input type="radio" name="tire-size" value={26} defaultChecked={true}/>
						</label>
						<label>27.5
							<input type="radio" name="tire-size" value={27.5} defaultChecked={false}/>
						</label>
						<label>29
							<input type="radio" name="tire-size" value={29} defaultChecked={false}/>
						</label>	
				</form>
				<GearSelectionForm 
					radioChange={this.props.handleRadioChange} 
					textChange={this.props.handleTextChange} 
					number={this.props.currentNumberOfGears} 
					sizes={this.props.sizeOfGears}
					defaultGears={this.defaultProps.defaultGearNumbers}
					position={this.props.position}
					side={this.props.side}/>
			</div>
			);
	} 
});

module.exports = Rear;