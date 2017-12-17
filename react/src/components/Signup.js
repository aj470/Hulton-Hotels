import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { register } from '../actions/Login';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


const style = {
  marginLeft: 20,
};

const styles = {
	textDecoration: "none",
}

class Signup extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			address: "",
			phone: "",
			errorPhone: "",
			errorEmail: "",
			open: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
	}
	handleChange(e) {
    	if (e.target.value.match(/^.{10}$/)) {
	      this.setState({ errorPhone: "", phone: e.target.value });
	    } else {
	      this.setState({ errorPhone: "should be 10 digits with no spaces", phone: "" });
	    }
  	}
  	handleEmail(e) {
  		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		if (regex.test(e.target.value)) {
  			this.setState({ errorEmail: "", email: e.target.value})
  		} else {
  			this.setState({ errorEmail: "Invalid email format", email: ""})
  		}
  	}
	handleClick(e) {
		console.log(this.state)
		this.props.register(this.state.name, this.state.email, this.state.password, this.state.address, this.state.phone);
		if (!this.state.isLoggedIn) {
			this.setState({open: true})
		}
	}

	render() {
		if (this.props.signedUp) {
			return (<Redirect to="/login" />);
		}
		return (
			<div className="App-form">
				<h2> Sign up form </h2>
				<Paper zDepth={1}>
				    <TextField hintText="Name" style={style} underlineShow={false} onChange={(event,newValue) => this.setState({name:newValue})}/>
				    <Divider />
				    <TextField hintText="Email" style={style} underlineShow={false} errorText={this.state.errorEmail} onChange={this.handleEmail}/>
				    <Divider />
				    <TextField type="password" hintText="Password" style={style} underlineShow={false} onChange={(event,newValue) => this.setState({password:newValue})}/>
				    <Divider />
				    <TextField hintText="Address" style={style} underlineShow={false} onChange={(event,newValue) => this.setState({address:newValue})}/>
				    <Divider />
				    <TextField hintText="Phone" style={style} underlineShow={false} errorText={this.state.errorPhone} onChange={this.handleChange}/>
				</Paper>
				<Link to="/login" style={styles}> Already have an account? Log in </Link>
				<br/>
		        <RaisedButton label="Submit" secondary={true} onClick={(event) => this.handleClick(event)}/>
		        <Snackbar
		          open={this.state.open}
		          message="Sign up unsuccessful"
		          autoHideDuration={4000}
		          onRequestClose={this.handleRequestClose}
		        />
	         </div>
		);
	}
}

function mapDispatchToProps (dispatch) {
  return {
    register: (name, email, password, address, phone) => { dispatch(register(name, email, password, address, phone)) },
  }
}

function mapStateToProps(state) {
	return{
		isLoggedIn: state.User.isLoggedIn,
		signedUp: state.User.signedUp
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);