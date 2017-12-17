import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = {
	textDecoration: "none",
}

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		}
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleToggle = () => this.setState({open: !this.state.open});
	handleClose = () => this.setState({open: false});
	
	render() {
		return (
			<div>
			<AppBar
			    title="Hulton Hotels"
			    iconClassNameRight="muidocs-icon-navigation-expand-more"
			    onLeftIconButtonTouchTap = { this.handleToggle } />
			<Drawer 
				docked={false}
				open={this.state.open} 
				onRequestChange={(open) => this.setState({open})} 
			  >
	          <Link to="/" style={styles}><MenuItem onClick={this.handleClose} >Search</MenuItem></Link>
	          <Divider/>
          	  <Link to="/analytics" style={styles}><MenuItem onClick={this.handleClose} >Analytics</MenuItem></Link>
	          <Divider/>
	          <Link to="/profile" style={styles}><MenuItem onClick={this.handleClose} >Profile</MenuItem></Link>
	        </Drawer>
	        </div>
		);
	}
}

function mapStateToProps(state) {
	return{
		isLoggedIn: state.User.isLoggedIn
	}
}

export default connect(mapStateToProps)(Navbar);