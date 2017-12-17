import React, { Component } from 'react';
import Search from './Search';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}

	render() {
		if (!this.props.isLoggedIn) {
			return (<Redirect to="/login" />);
		}
		return (
			<div className="App">
				<h2>Welcome to Hulton Hotels</h2>
				<Search />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return{
		isLoggedIn: state.User.isLoggedIn
	};
}

export default connect(mapStateToProps)(Home);