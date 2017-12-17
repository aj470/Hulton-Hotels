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

export default function BestCustomer (props) {
	if (!props.customer) {
		return null;
	}
	console.log(props)
	return (
		<ul className="popular-list App">
			<h4>Best customer</h4>
			{props.customer.map(function (customer, index) {
				return(
					<li key={customer.Room_no} style={styles}>
						<Card>
							<CardHeader
						      title={"Customer name: "+customer.Name}
						      actAsExpander={true}
						      showExpandableButton={true} />
						    <CardText expandable={true}>
						    	<p>{"Total amount: "+customer.Total_amt}</p>
						    </CardText>
						</Card>
					</li>
					);
			})}
		</ul>
	)
}

BestCustomer.propTypes = {
	customer: PropTypes.array.isRequired,
}