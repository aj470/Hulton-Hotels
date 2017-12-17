import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import ReactStars from 'react-stars';
import { connect } from 'react-redux';
import { fetchFood, fetchService, addFood, addService } from '../actions/User';

const styles = {
	width: "40%",
	listStyle: "none"
}
const checkbox = {
    marginBottom: 16,
}

function ShowBreakfast (props) {
	if (props.breakfast.length === 0) {
		return (<p>No breakfast</p>);
	} else {
		return (
			<ul className="extras">
				{props.breakfast.map(function (bfast, index) {
					return(
						<li key={index}>
							<Card>
						    { bfast.bType==="American" ? <Checkbox id="american" checked={props.type.american} onCheck={(e) => props.updateCheck(e, bfast.HotelID, "American")} style={checkbox} /> : null }
						    { bfast.bType==="Continental" ? <Checkbox id="continental" checked={props.type.continental} onCheck={(e) => props.updateCheck(e, bfast.HotelID, "Continental")} style={checkbox} /> : null }
						    { bfast.bType==="French" ? <Checkbox id="french" checked={props.type.french} onCheck={(e) => props.updateCheck(e, bfast.HotelID, "French")} style={checkbox} /> : null }
							<CardHeader
						      title={"Breakfast type: "+bfast.bType+", price: "+bfast.bPrice}
						      actAsExpander={false}
						      showExpandableButton={false} />
						    </Card>
						</li>
					);
				})}
				{props.service.map(function (service, index) {
					return(
						<li key={index+props.breakfast.length}>
							<Card>
						    { service.sType==="Airport Pick-up/Drop" ? <Checkbox id="airport" checked={props.type.airport} onCheck={(e) => props.updateCheck(e, service.HotelID, "Airport pickup")} style={checkbox} /> : null }
						    { service.sType==="Laundry" ? <Checkbox id="laundry" checked={props.type.laundry} onCheck={(e) => props.updateCheck(e, service.HotelID, "Laundry")} style={checkbox} /> : null }
						    { service.sType==="Parking" ? <Checkbox id="parking" checked={props.type.parking} onCheck={(e) => props.updateCheck(e, service.HotelID, "Parking")} style={checkbox} /> : null }
							<CardHeader
						      title={"Service type: "+service.sType+", price: "+service.sCost}
						      actAsExpander={false}
						      showExpandableButton={false} />
						    </Card>
						</li>
					);
				})}
			</ul>
		)
	}	
}

function Show (props) {
	if (props.state.reservations.length === 0) {
			return (<p>No reservations</p>);
		}
	return (
		<ul className="popular-list">
			{props.state.reservations.map(function (resv, index) {
				return(
					<li key={index} style={styles} onClick={props.updateSelection.bind(null, resv.Invoice_no)}>
						<Card>
							<CardHeader
						      title={"Invoice #: "+resv.Invoice_no}
						      subtitle={"Reservation made on: "+dateFormat(resv.Res_date, "dddd, mmmm dS, yyyy")}
						      actAsExpander={true}
						      showExpandableButton={true} />
						    <CardText expandable={true}>
								<p>{"Customer ID: "+resv.CID}</p>
								<p>{"Credit Card details: "+resv.C_num}</p>
								<p>{"Grand total: "+resv.Total_amt}</p>
								<RaisedButton label="Add review" type="submit" onClick={props.state.openDialogue} secondary={true} fullWidth={true}/>
								<RaisedButton label="Add Breakfast/Service" type="submit" onClick={props.getServices.bind(null, resv.Invoice_no)} secondary={true} fullWidth={true}/>
								<Dialog
							      title="Write a review"
							      actions={props.state.actions}
							      modal={true}
							      open={props.state.open}
							    >
							    <SelectField
						          floatingLabelText="Review type"
						          id="value"
						          value={props.state.value}
						          onChange={props.state.handleValue}
						        >
						          <MenuItem id="value" value={1} primaryText="Room" />
						          <MenuItem id="value" value={2} primaryText="Service" />
						          <MenuItem id="value" value={3} primaryText="Breakfast" />
						        </SelectField>
						        <ReactStars count={5} value={props.state.rating} onChange={props.state.ratingChanged} size={24} color2={'#ffd700'} />
						        <br />
							    <TextField id="review" fullWidth={true} value={props.state.review} onChange={props.state.handleChange} multiLine={true} />
							    </Dialog>
							    <Dialog
							      title="Order something, treat yourself!"
							      actions={props.serviceActions}
							      modal={true}
							      open={props.openService}
							      autoDetectWindowHeight={true}
								  autoScrollBodyContent={true}
								  repositionOnUpdate={true}
							    >
							    <ShowBreakfast breakfast={props.breakfast} service={props.service} type={props.type} updateCheck={props.updateCheck} hotelID={resv.hotelID}/>
							    </Dialog>
						    </CardText>
						</Card>
					</li>
					);
			})}
		</ul>
	)
}


class Reservations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openService: false,
			breakfast: [],
			service: [],
			american: false,
			continental: false,
			french: false,
			airport: false,
			laundry: false,
			parking: false,
			checked: false,
			Invoice_no: null,
			hotelID: null,
			openSnackbar: false
		}
		this.getServices = this.getServices.bind(this);
		this.updateCheck = this.updateCheck.bind(this);
		this.openServiceDialogue = this.openServiceDialogue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateSelection = this.updateSelection.bind(this);
	}
	getServices(value){
		this.openServiceDialogue();
		this.props.fetchFood(value);
		this.props.fetchService(value);
	}
	updateCheck(e, hotelID, type) {
		const value = e.target.value
		const id = e.target.id
		console.log(id, value, hotelID, type);
		this.setState(function() {
			return { [id]: !this.state[id], hotelID: hotelID }
		})
	}
	openServiceDialogue(e) {
		this.setState({openService: !this.state.openService})
	}
	updateSelection(val){
		this.setState({ Invoice_no: val });
	}
	handleSubmit(e) {
		var requestFood = []
		var requestService = []
		if (this.state.american) {
			console.log('you will be charged for american breakfast')
			requestFood.push({Invoice_no: this.state.Invoice_no, bType: "American", bPrice: this.props.breakfast[0].bPrice, HotelID: this.state.hotelID, Times_req: 1})
		}
		if (this.state.continental) {
			console.log('you will be charged for continental breakfast')
			requestFood.push({Invoice_no: this.state.Invoice_no, bType: "Continental", bPrice: this.props.breakfast[1].bPrice, HotelID: this.state.hotelID, Times_req: 1})
		}
		if (this.state.french) {
			console.log('you will be charged for french breakfast')
			requestFood.push({Invoice_no: this.state.Invoice_no, bType: "French", bPrice: this.props.breakfast[2].bPrice, HotelID: this.state.hotelID, Times_req: 1})
		}
		if (this.state.airport) {
			console.log('you will be charged for airport pickup service')
			requestService.push({Invoice_no: this.state.Invoice_no, sType: "Airport Pick-up/Drop", sCost: this.props.service[0].sCost, HotelID: this.state.hotelID, Times_req: 1})
		}
		if (this.state.laundry) {
			console.log('you will be charged for laundry service')
			requestService.push({Invoice_no: this.state.Invoice_no, sType: "Laundry", sCost: this.props.service[1].sCost, HotelID: this.state.hotelID, Times_req: 1})
		}
		if (this.state.parking) {
			console.log('you will be charged for parking service')
			requestService.push({Invoice_no: this.state.Invoice_no, sType: "Parking", sCost: this.props.service[2].sCost, HotelID: this.state.hotelID, Times_req: 1})
		}

		this.props.addFood(requestFood);
		this.props.addService(requestService);
		this.setState({openService: !this.state.openService})
		if (this.props.error !== "") {
			this.setState({openSnackbar: true});
		} 
	}
	componentWillMount() {
		this.setState(function() {
			return {
				breakfast: this.props.breakfast
			}
		});
	}
	render() {
	    const serviceActions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onClick={this.openServiceDialogue}/>,
	      <FlatButton
	        label="Submit"
	        primary={true}
	        onClick={this.handleSubmit}/>,
	    ];
		return (
			<div>
				<Show 
					state={this.props} 
					breakfast={this.props.breakfast} 
					service={this.props.service}
					getServices={this.getServices} 
					type={this.state} 
					updateCheck={this.updateCheck}
					updateSelection={this.updateSelection}
					openService={this.state.openService}
					serviceActions={serviceActions}/>
				<Snackbar
			          open={this.state.openSnackbar}
			          message="Error making request"
			          autoHideDuration={4000}
			          onRequestClose={this.handleRequestClose}/>
		    </div>
		);	
	}
}

Show.propTypes = {
	state: PropTypes.shape({
		reservations: PropTypes.array.isRequired,
		handleChange: PropTypes.func.isRequired,
		handleValue: PropTypes.func.isRequired,
		openDialogue: PropTypes.func.isRequired,
		ratingChanged: PropTypes.func.isRequired,
		actions: PropTypes.array.isRequired,
		value: PropTypes.number.isRequired,
		review: PropTypes.string.isRequired,
		open: PropTypes.bool.isRequired,
		rating: PropTypes.number.isRequired
	})
}


function mapDispatchToProps(dispatch) {
	return {
		fetchFood: (invoice) => {dispatch(fetchFood(invoice))},
		fetchService: (invoice) => {dispatch(fetchService(invoice))},
		addFood: (request) => {dispatch(addFood(request))},
		addService: (request) => {dispatch(addService(request))}
	};
}

function mapStateToProps(state) {
	return{
		reservations: state.User.reservations,
		breakfast: state.User.breakfast,
		service: state.User.service,
		error: state.User.error
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Reservations);