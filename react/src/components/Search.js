import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { searchZip, searchName } from '../actions/Search';
import { connect } from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';
import Reserve from './Reserve';

const styles = {
	width: "60%",
	listStyle: "none",
	textAlign: "center",
	margin: "0 auto",
	marginBottom: "10px"
}

const brStyle = {
	width: "50%",
}

function Results (props) {
	if (props.hotels.length === 0) {
		return (
			<div className="App">
				<h4>Your search results</h4>
				<p>No results</p>
			</div>
			);
	}
	return (
		<ul className="popular-list App">
			<h4>Your search results </h4>
			{props.hotels.map(function (hotel, index) {
				return(
					<li key={hotel.Room_no} style={styles}>
						<Card>
							<CardHeader
						      title={"Hotel #: "+hotel.HotelID}
						      subtitle={"Room: "+hotel.Room_no+", Price per night: "+hotel.Price*((100-hotel.Discount)/100)}
						      actAsExpander={true}
						      showExpandableButton={true} />
						    <CardText expandable={true}>
						    	<p>{"Description: "+hotel.Description}</p>
								<p>{"Address: "+hotel.Street+", "+hotel.City+", "+hotel.State+" "+hotel.Zip}</p>
								<RaisedButton label="Make Reservation" fullWidth={true} secondary={true} onClick={props.updateSelection.bind(null, hotel)}/>
						    </CardText>
						</Card>
					</li>
					);
			})}
		</ul>
	)
}

Results.propTypes = {
	hotels: PropTypes.array.isRequired,
	updateSelection: PropTypes.func.isRequired
}

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: null,
			endDate: null,
			focusedInput: null,
			value: '',
			errorText: "",
			hotels: [],
			selection: {},
			open: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.findHotels = this.findHotels.bind(this);
		this.openDialogue = this.openDialogue.bind(this);
		this.updateSelection = this.updateSelection.bind(this);
	}
	openDialogue() {
		this.setState({open: !this.state.open});
	}
	updateSelection(selection) {
		this.setState({selection: selection, open: true});
	}
	handleChange(e) {
    	if (e.target.value.match(/^[a-zA-Z\s,]*$/)) {
	      this.setState({ errorText: "", value: e.target.value });
	    } else if (e.target.value.match(/^[0-9]+$/)){
	    	this.setState({ errorText: "", value: e.target.value });
	    } else {
	      this.setState({ errorText: 'Invalid format: must be letters only or numbers only', value: "" });
	    }
  	}

  	findHotels() {
  		if (!this.state.endDate || !this.state.startDate) {
  			alert("must enter a start and end date");
  		} else if (!this.state.value) {
  			alert("must enter a Destination");
  		} else {
	  		// alert('hi'+this.state.value+"\n"+this.state.startDate+" "+this.state.endDate);
	  		this.setState(function() {
	  			// if number, searchZip
	  			if (!isNaN(parseFloat(this.state.value)) && isFinite(this.state.value)){
	  				this.props.searchZip(this.state.value);
	  			} else {
		  			// if string, searchName
		  			const start = new Date(this.state.startDate);
		  			const end = new Date(this.state.endDate);
		  			this.props.searchName(start.toISOString(), end.toISOString(), this.state.value);
	  			}
	  			return {
	  				hotels: this.props.hotels
	  			}
	  		})
  		}
  	}

	render() {
		return(
			<div>
				<p>Where do you want to go?</p>
				<TextField hintText="Destination city"
			        floatingLabelText="Destination"
			        name="Destination"
			        errorText= {this.state.errorText}
			        onChange={this.handleChange}
			      />
			    <br />
				<DateRangePicker
				  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
				  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
				  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
				  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
				  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
				/>
				<br />
				<RaisedButton label="Search" secondary={true} onClick={this.findHotels} />
				<br style={brStyle} />
				<Results hotels={this.props.hotels} openDialogue={this.openDialogue} updateSelection={this.updateSelection}/>
				<Reserve open={this.state.open} hotel={this.state.selection} openDialogue={this.openDialogue} startdate={this.state.startDate} enddate={this.state.endDate} />
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		searchZip: (zip) => {dispatch(searchZip(zip))},
		searchName: (start, end, value) => {dispatch(searchName(start, end, value))}
	};
}

function mapStateToProps(state) {
	return{
		hotels: state.Search.hotels
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);