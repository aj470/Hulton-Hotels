import React, { Component } from 'react';
import { DateRangePicker, isInclusivelyAfterDay } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { bestRoom, bestBreakfast, bestService, bestCustomer } from '../actions/Best';
import BestType from './BestType';
import BestFood from './BestFood';
import BestService from './BestService';
import BestCustomer from './BestCustomer';


class TopPicks extends Component {
	constructor(props) {
		super(props);
		this.state ={
			startDate: null,
			endDate: null,
			focusedInput: null,
			bestRoom: null,
			bestCustomers: null,
			bestFood: null,
			bestService: null
		}
		this.findBest = this.findBest.bind(this);
	}
	findBest() {
  		if (!this.state.endDate || !this.state.startDate) {
  			alert("must enter a start and end date");
  		} else {
  			// find best of everything
  			this.setState(function() {
  				this.props.bestRoom(this.state.startDate.toISOString(), this.state.endDate.toISOString());
  				this.props.bestFood(this.state.startDate.toISOString(), this.state.endDate.toISOString());
  				this.props.bestServ(this.state.startDate.toISOString(), this.state.endDate.toISOString());
  				this.props.bestCust(this.state.startDate.toISOString(), this.state.endDate.toISOString());
  				return {
  					bestRoom: this.props.bestType,
  					bestFood: this.props.bestBreakfast,
  					bestService: this.props.bestService,
  					bestCustomers: this.props.bestCustomers
  				}
  			});
  		}
  	}
	render() {
		const today = moment();
		return (
			<div className="App">
				<h2>Hulton analytics</h2>
				<DateRangePicker
				  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
				  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
				  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
				  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
				  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
				  isOutsideRange={(day) => isInclusivelyAfterDay(day, today)} // PropTypes.func.isRequired (for allowing selection of past dates)
				/>
				<br />
				<RaisedButton label="Search" secondary={true} onClick={this.findBest} />
				<h4>Best of everything awards</h4>
				<BestType roomType={this.state.bestRoom} />
				<BestFood food={this.state.bestFood} />
				<BestService service={this.state.bestService} />
				<BestCustomer customer={this.state.bestCustomers} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		bestService: state.Best.bestService,
		bestBreakfast: state.Best.bestBreakfast,
		bestCustomers: state.Best.bestCustomers,
		bestType: state.Best.bestType
	}
}

function mapDispatchToProps(dispatch) {
	return {
		bestFood: (startDate, endDate) => { dispatch(bestBreakfast(startDate, endDate)) },
		bestRoom: (startDate, endDate) => { dispatch(bestRoom(startDate, endDate)) },
		bestServ: (startDate, endDate) => { dispatch(bestService(startDate, endDate)) },
		bestCust: (startDate, endDate) => { dispatch(bestCustomer(startDate, endDate)) },
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(TopPicks);