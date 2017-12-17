import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import dateFormat from 'dateformat';
import { reserve } from '../actions/Reserve';


const Months =[
	<MenuItem key={0} value="0" primaryText="Jan" />,
	<MenuItem key={1} value="1" primaryText="Feb" />,
	<MenuItem key={2} value="2" primaryText="Mar" />,
	<MenuItem key={3} value="3" primaryText="Apr" />,
	<MenuItem key={4} value="4" primaryText="May" />,
	<MenuItem key={5} value="5" primaryText="Jun" />,
	<MenuItem key={6} value="6" primaryText="Jul" />,
	<MenuItem key={7} value="7" primaryText="Aug" />,
	<MenuItem key={8} value="8" primaryText="Sep" />,
	<MenuItem key={9} value="9" primaryText="Oct" />,
	<MenuItem key={10} value="10" primaryText="Nov" />,
	<MenuItem key={11} value="11" primaryText="Dec" />
]

const Years = [
	<MenuItem key={2018} value="2018" primaryText="2018" />,
	<MenuItem key={2019} value="2019" primaryText="2019" />,
	<MenuItem key={2020} value="2020" primaryText="2020" />,
	<MenuItem key={2021} value="2021" primaryText="2021" />
]

const Type = [
	<MenuItem key={17} value="Credit" primaryText="Credit" />,
	<MenuItem key={18} value="Debit" primaryText="Debit" />
]

// subtitle={"Availability: "+dateFormat(this.props.hotel.SDate, "fullDate")+" to "+dateFormat(this.props.hotel.EDate, "fullDate")}
class Reserve extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cnum: "",
			address: "",
			name: "",
			cvv: "",
			type: "Credit",
			ExpMonth: 0,
			ExpYear: 2018,
			errorCard: "",
			errorCVV: "",
			open: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleNumericChange = this.handleNumericChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handleValue = this.handleValue.bind(this);
	}
	handleSubmit(e) {
		console.log(this.state);
		if (this.state.name !== "" && this.state.address !== "" && this.state.cnum !== "" && this.state.cvv !== ""){
			const start = dateFormat(this.props.startdate, "yyyy-mm-dd");
			const end = dateFormat(this.props.enddate, "yyyy-mm-dd");
			const expDate = dateFormat(new Date(this.state.ExpYear, this.state.ExpMonth,1), "yyyy-mm-dd")
			this.props.reserve(this.state, start, end, this.props.hotel, expDate)
		} else {
			alert('missing fields!!!');
		}
		this.props.openDialogue();
		
		if (this.props.error === "") {
			this.setState({open: true});
		}
	}
	handleAddressChange(e) {
      this.setState({ address: e.target.value });
  	}
  	handleValue = (event, index, value) => {
  		this.setState(function() {
  			if (value.match(/it/g)) {
  				console.log('new type', value)
  				return { type: value }
  			} else if (value.match(/20/g)) {
  				console.log('new year', value)
  				return { ExpYear: value }
  			} else {
  				console.log('new month', value)
  				return { ExpMonth: value }
  			}
  		});
  	};
	handleNumericChange(e) {
		const id = e.target.id;
		const value = e.target.value;

		this.setState(function() {
			if (value.match(/^[0-9]+$/)){
				if (id === 'errorCard' && value.match(/^.{16}$/)) {
					return { cnum: value, errorCard: '' }
				} else if (id === 'errorCVV' && value.match(/^.{3}$/)) {
					return { cvv: value, errorCVV: '' }
				} else {
					return { [id]: 'Invalid format'}
				}
			} else {
				return { [id]: 'Invalid format' }
			}
		});
  	}
	handleChange(e) {
    	if (e.target.value.match(/^[a-zA-Z\s,]*$/)) {
	      this.setState({ errorText: "", name: e.target.value });
	    } else {
	      this.setState({ errorText: 'Invalid format', name: "" });
	    }
  	}
	render() {
		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onClick={this.props.openDialogue} />,
	      <FlatButton
	        label="Submit"
	        secondary={true}
	        onClick={this.handleSubmit} />
	    ];
		return(
			<div>
				<Dialog
			      title="Make a reservation"
			      actions={actions}
			      modal={true}
			      open={this.props.open}
			    >
				    <Card>
						<CardHeader
					      title={"Hotel #: "+this.props.hotel.HotelID}
					      actAsExpander={true}
					      showExpandableButton={true} />
					    <CardText expandable={false}>
					    	<p>{"Room: "+this.props.hotel.Room_no+", Price: "+this.props.hotel.Price}</p>
					    	<p>{"Description: "+this.props.hotel.Description}</p>
							<p>{"Address: "+this.props.hotel.Street+", "+this.props.hotel.City+", "+this.props.hotel.State+" "+this.props.hotel.Zip}</p>

							<TextField id="errorCard" hintText="Credit Card" fullWidth={false} errorText={this.state.errorCard} onChange={this.handleNumericChange}/>
							<SelectField style={{ verticalAlign: 'bottom' }} floatingLabelText="Type" value={this.state.type} onChange={this.handleValue}>
					          	{Type}
					        </SelectField>
							<TextField hintText="Name on card" fullWidth={false} errorText= {this.state.errorText} onChange={this.handleChange}/>
							<TextField id="errorCVV" hintText="CVV" fullWidth={false} errorText= {this.state.errorCVV} onChange={this.handleNumericChange}/>
							<TextField hintText="Billing Address" fullWidth={true} onChange={this.handleAddressChange}/>
							
					        <br />
							<SelectField floatingLabelText="Month" value={this.state.ExpMonth} onChange={this.handleValue}>
					          {Months}
					        </SelectField>
					        <SelectField floatingLabelText="Year" value={this.state.ExpYear} onChange={this.handleValue}>
					          {Years}
					        </SelectField>
					    </CardText>
					</Card>
			    </Dialog>
		        <Snackbar
		          open={this.state.open}
		          message="Reservation made"
		          autoHideDuration={4000}/>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		reserve: (state, start, end, hotel, expDate) => {dispatch(reserve(state, start, end, hotel, expDate))},
	};
}

function mapStateToProps(state) {
	return{
		isLoggedIn: state.User.isLoggedIn,
		name: state.User.name,
		cid: state.User.cid,
		reservations: state.User.reservations,
		error: state.Search.error
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(Reserve);