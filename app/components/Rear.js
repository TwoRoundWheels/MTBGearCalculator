var React = require('react');
var GearSelectionForm = require('../components/GearSelectionForm');

var Rear = React.createClass({
	defaultProps: {
		defaultGearNumbers: [1, 7, 8, 9, 10, 11, 12]
	},
	handleClick: function (e) {
		var side = this.props.side;
		var position = this.props.position;
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
	},
	handleRadioChange: function (e) {
		var side = this.props.side;
		var value = e.target.value;
		this.props.handleTireSizeChange(side, value);
	},
	render: function() {
		var HEIGHTMODIFIER = 5;
		var TIREHEIGHTMODIFIER = 10;
		var numberOfGears = this.props.currentNumberOfGears;
		var gears = this.props.sizeOfGears.map(function(size, index) {
			if(index < numberOfGears) {
				return <li key={index} style={{height: size * HEIGHTMODIFIER}} className="gear" onClick={this.handleClick}>{size}</li>
			}	
		}, this);	
		return (
			<div>
				<ul className="gears">
					{gears}
				</ul>
				<div className="tire-container">
					<div className="tire" style={{height: this.props.tireSize * TIREHEIGHTMODIFIER}}>
						
					</div>
					<form className="tire-form" onChange={this.handleRadioChange} >
						<label>Tire Size: </label>
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
				</div>
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