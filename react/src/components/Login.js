import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../actions/Login';
import { connect } from 'react-redux';


const styles = {
	textDecoration: "none",
}

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			open: false,
			message: "",
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		console.log(this.state)
		this.props.signin(this.state.email, this.state.password);
		if (!this.props.isLoggedIn){
			this.setState({open: true})
		}
	}
	render() {
		if (this.props.isLoggedIn) {
			return (<Redirect to="/profile" />);
		}
		return (
			<div className="App-form">
				<h2>Log in to your account</h2>
				<Paper zDepth={1}>
					<TextField hintText="Email" fullWidth={true} underlineShow={false} onChange={(event,newValue) => this.setState({email:newValue})}/>
				    <Divider />
				    <TextField type="password" fullWidth={true} hintText="Password" underlineShow={false} onChange={(event,newValue) => this.setState({password:newValue})}/>
				    <Divider />
			    </Paper>
		        <Link to="/signup" style={styles}>Not a member? Sign up</Link>
		        <br/>
		        <RaisedButton label="Submit" secondary={true} onClick={this.handleClick}/>
		        <Snackbar
		          open={this.state.open}
		          message="Login unsuccessful"
		          autoHideDuration={4000}
		        />
	         </div>
		);
	}
}

function mapDispatchToProps (dispatch) {
  return {
    signin: (username, password) => { dispatch(login(username, password)) },
  }
}


function mapStateToProps(state) {
	return{
		isLoggedIn: state.User.isLoggedIn
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);