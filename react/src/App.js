import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Reserve from './components/Reserve';
import TopPicks from './components/TopPicks';
import Signup from './components/Signup';

const styles = {
  margin: "0 auto"
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
        	<div style={styles}>
		        <Navbar />
  			    <Route exact path="/" component={Home}/>
            <Route exact path="/profile" component={Profile}/>
		        <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/logout" component={Home}/>
            <Route path="/reserve" component={Reserve}/>
            <Route path="/analytics" component={TopPicks}/>
	        </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
