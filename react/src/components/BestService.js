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

export default function BestService (props) {
	if (!props.service) {
		return null;
	}
	console.log(props)
	return (
		<ul className="popular-list App">
			<h4>Best service</h4>
			{props.service.map(function (serv, index) {
				return(
					<li key={serv.HotelID} style={styles}>
						<Card>
							<CardHeader
						      title={"Rating: "+serv.Rating}
						      actAsExpander={true}
						      showExpandableButton={true} />
						    <CardText expandable={true}>
						    	<p>{"Description: "+serv.sType+", Hotel #: "+serv.HotelID}</p>
						    </CardText>
						</Card>
					</li>
					);
			})}
		</ul>
	)
}

BestService.propTypes = {
	service: PropTypes.array.isRequired,
}