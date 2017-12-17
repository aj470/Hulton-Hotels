import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { logout } from '../actions/Login';
import { fetchResv } from '../actions/User';
import { postReview } from '../actions/Review';
import { connect } from 'react-redux';
import Reviews from './Reviews';
import Reservations from './Reservations';


class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reservations: [],
			review: "",
			open: false,
			openService: false,
			value: 1,
			rating: 0
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.openDialogue = this.openDialogue.bind(this);
		this.openServiceDialogue = this.openServiceDialogue.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleValue = this.handleValue.bind(this);
		this.ratingChanged = this.ratingChanged.bind(this);
	}
	componentDidMount() {
		this.setState(function() {
			this.props.fetchResv(this.props.cid)
			return {
				reservations: this.props.reservations
			}
		})
	}
	handleClick(e) {
		this.props.logout();
	}
	openDialogue(e) {
		this.setState({open: !this.state.open})
	}
	openServiceDialogue(e) {
		this.setState({openService: !this.state.openService})
	}
	handleChange(e) {
		console.log([e.target.id])
		this.setState({ [e.target.id] : e.target.value });
	}
	handleValue = (event, index, value) => this.setState({value});
	ratingChanged = (rating) =>  this.setState({rating});
	handleSubmit(e) {
		if (this.state.review === "") {
			alert("review cannot be null");
			this.setState({ open:false });
		} else {
			console.log("review will be submitted", this.state.review, this.state.value, this.state.rating);
			// call action
			this.props.postReview(this.state.value, this.state.rating, this.state.review)
			this.setState({ open:false, openService:false });
		}
	}
	render() {
		if (!this.props.isLoggedIn) {
			return (<Redirect to="/login" />);
		}
		const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        onClick={this.openDialogue}
	      />,
	      <FlatButton
	        label="Submit"
	        primary={true}
	        onClick={this.handleSubmit}
	      />,
	    ];
		return (
			<div className="App">
				<h2>Hi! Welcome back to hulton hotels</h2>
				<RaisedButton label="Logout" type="submit" secondary={true} onClick={this.handleClick} />
				<h4>Your reservations:</h4>
				<Reservations 
					reservations={this.props.reservations} 
					handleChange={this.handleChange}
					handleValue={this.handleValue}
					ratingChanged={this.ratingChanged}
					openDialogue={this.openDialogue}
					actions={actions}
					open={this.state.open}
					openService={this.state.openService}
					review={this.state.review}
					value={this.state.value}
					rating={this.state.rating}/>
				<br />
				<h4>Your reviews</h4>
				<Reviews />
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		logout: () => {dispatch(logout())},
		fetchResv: (cid) => {dispatch(fetchResv(cid))},
		postReview: (type, rating, review) => {dispatch(postReview(type, rating, review))}
	};
}

function mapStateToProps(state) {
	return{
		isLoggedIn: state.User.isLoggedIn,
		name: state.User.name,
		cid: state.User.cid,
		reservations: state.User.reservations
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);