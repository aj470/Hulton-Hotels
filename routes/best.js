var express = require('express');
var app = express();
var db = require('../db/conn');

/* GET best room listing. */
app.get('/room/:startDate&:endDate', function(req, res, next) {
	if (req.params.startDate && req.params.endDate){
		db.query(' SELECT MAX(Review.rating) as Rating, h.HotelID, l.Street,l.City,l.State,l.Country, l.Zip,Room.Room_no, Room.Price, Room.Description, Room.Type, Room.Discount \
					FROM Hotel h, Location l, Room, Evaluates, Review, Reserves \
					WHERE h.HotelID = l.HotelID and h.HotelID = Room.HotelID \
					AND Review.ReviewID = Evaluates.ReviewID \
					and Reserves.HotelID = Evaluates.HotelID\
					and Evaluates.HotelID = h.HotelID \
					AND Evaluates.HotelID = Room.HotelID \
					and Evaluates.Room_no = Room.Room_no \
					and Reserves.In_Date >= ?  and Reserves.Out_Date <= ? \
					group by Room.HotelID',[req.params.startDate, req.params.endDate], function (error, results, fields) {
		    if (error) {
				console.log("error ocurred",error);
				return res.send(400).send('an error occurred when retrieving results');
		    } else {
		    	console.log(results)
				if(results.length > 0){
					if (results[0].Rating == null) {
						return res.status(200).send([]);
					}
		        	return res.status(200).send(results);
		      	}
		      return res.status(200).send([]);
		    }
		});
	} else {
		return res.status(400).send("Empty fields");
	}
});

/* GET best breakfast listing. */
app.get('/breakfast/:startDate&:endDate', function(req, res, next) {
	if (req.params.startDate && req.params.endDate){
		db.query('select MAX(Review.rating) as Rating, Asseses.bType, Asseses.HotelID \
					from Review, Asseses, Room, Reserves \
					where Review.Type = "Breakfast" and Review.ReviewID = Asseses.ReviewID \
					AND Asseses.HotelID = Reserves.HotelID \
					and Reserves.In_Date >= ? and Reserves.Out_Date <= ?',
					[req.params.startDate, req.params.endDate], function (error, results, fields) {
		    if (error) {
				console.log("error ocurred",error);
				return res.send(400).send('an error occurred when retrieving results');
		    } else {
		    	console.log(results)
				if(results.length > 0){
					if (results[0].Rating == null) {
						return res.status(200).send([]);
					}
		        	return res.status(200).send(results);
		      	}
		      return res.status(200).send([]);
		    }
		});
	} else {
		return res.status(400).send("Empty fields");
	}
});

/* GET best service listing. */
app.get('/service/:startDate&:endDate', function(req, res, next) {
	if (req.params.startDate && req.params.endDate){
		db.query('select MAX(Review.rating) as Rating, Rates.sType, Rates.HotelID \
					from Review, Rates, Room, Reserves \
					where Review.Type = "Service" and Review.ReviewID = Rates.ReviewID \
					AND Rates.HotelID = Reserves.HotelID \
					and Reserves.In_Date >= ? and Reserves.Out_Date <= ?',
					[req.params.startDate, req.params.endDate], function (error, results, fields) {
		    if (error) {
				console.log("error ocurred",error);
				return res.send(400).send('an error occurred when retrieving results');
		    } else {
		    	console.log(results)
				if(results.length > 0){
					if (results[0].Rating == null) {
						return res.status(200).send([]);
					}
		        	return res.status(200).send(results);
		      	}
		      return res.status(200).send([]);
		    }
		});
	} else {
		return res.status(400).send("Empty fields");
	}
});

/* GET best customers listing. */
app.get('/customers/:startDate&:endDate', function(req, res, next) {
	if (req.params.startDate && req.params.endDate){
		db.query('select Customer.CID, Customer.Name, Reservation.Total_amt \
					from Reservation, Customer, Reserves \
					where Customer.CID = Reservation.CID and Reservation.Invoice_no = Reserves.Invoice_no \
					and Reserves.In_Date >= ? and Reserves.Out_Date <= ? \
					order by Reservation.Total_amt desc limit 5', 
					[req.params.startDate, req.params.endDate], function (error, results, fields) {
		    if (error) {
				console.log("error ocurred",error);
				return res.send(400).send('an error occurred when retrieving results');
		    } else {
		    	console.log(results)
				if(results.length > 0){
					if (results[0].CID == null) {
						return res.status(200).send([]);
					}
		        	return res.status(200).send(results);
		      	}
		      return res.status(200).send([]);
		    }
		});
	} else {
		return res.status(400).send("Empty fields");
	}
});




module.exports = app;