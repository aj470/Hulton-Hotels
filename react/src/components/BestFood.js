import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';


const styles = {
	width: "60%",
	listStyle: "none",
	textAlign: "center",
	margin: "0 auto",
	marginBottom: "10px"
}

export default function BestFood (props) {
	if (!props.food) {
		return null;
	}
	console.log(props)
	return (
		<ul className="popular-list App">
			<h4>Best food</h4>
			{props.food.map(function (hotel, index) {
				return(
					<li key={hotel.Room_no} style={styles}>
						<Card>
							<CardHeader
						      title={"Rating: "+hotel.Rating}
						      actAsExpander={true}
						      showExpandableButton={true} />
						    <CardText expandable={true}>
						    	<p>{"Hotel #: "+hotel.HotelID+", Breakfast: "+hotel.bType}</p>
						    </CardText>
						</Card>
					</li>
					);
			})}
		</ul>
	)
}

BestFood.propTypes = {
	food: PropTypes.array.isRequired,
}