import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { getReview } from '../actions/Review';
import { connect } from 'react-redux';


const styles = {
	width: "40%",
	listStyle: "none"
}

function Review (props) {
	if (props.reviews.length === 0) {
		return (<p>No reviews</p>);
	}
	return (
		<ul className="popular-list">
			{props.reviews.map(function (review, index) {
				return(
					<li key={index} style={styles}>
						<Card>
							<CardHeader
						      title={"Review type: "+review.Type}
						      subtitle={"Review rating: "+review.rating}
						      actAsExpander={true}
						      showExpandableButton={true} />
						    <CardText expandable={true}>
								<p>{review.textComment}</p>
						    </CardText>
						</Card>
					</li>
				);
			})}
		</ul>
	)
}

Review.PropTypes = {
	reviews: PropTypes.array.isRequired
}


class Reviews extends Component {
	componentDidMount() {
		this.props.getReview()
	}
	render() {
		return (
			<Review reviews={this.props.reviews}/>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getReview: () => {dispatch(getReview())}
	};
}

function mapStateToProps(state) {
	return{
		isLoggedIn: state.User.isLoggedIn,
		name: state.User.name,
		cid: state.User.cid,
		reviews: state.Review.reviews
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);