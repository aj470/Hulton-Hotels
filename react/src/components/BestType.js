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

export default function BestType (props) {
	if (!props.roomType) {
		return null
	}
	console.log(props);
	return (
		<ul className="popular-list App">
			<h4>Best room</h4>
			{props.roomType.map(function (hotel, index) {
				return(
					<li key={hotel.Room_no} style={styles}>
						<Card>
							<CardHeader
						      title={"Hotel #: "+hotel.HotelID+", Rating: "+hotel.Rating}
						      subtitle={"Room: "+hotel.Room_no+", Price: "+hotel.Price}
						      actAsExpander={true}
						      showExpandableButton={true} />
						    <CardText expandable={true}>
						    	<p>{"Description: "+hotel.Description}</p>
								<p>{"Address: "+hotel.Street+", "+hotel.City+", "+hotel.State+" "+hotel.Zip}</p>
						    </CardText>
						</Card>
					</li>
					);
			})}
		</ul>
	)
}

BestType.propTypes = {
	roomType: PropTypes.array.isRequired,
}

