var express = require('express');
var app = express();
var db = require('../db/conn');

/* GET users listing. */
app.get('/zip/:zip', function(req, res, next) {
	console.log("params are ", req.params.zip)
	db.query('SELECT * FROM Hotel h, Location l WHERE h.HotelID = l.HotelID AND l.zip = ?', req.params.zip, function (error, results, fields) {
	    if (error) {
			console.log("error ocurred",error);
			return res.send(400).send('an error occurred when retrieving results');
	    } else {
			if(results.length > 0){
	        	return res.status(200).send(results);
	      	}
	      return res.status(200).send(results);
	    }
	});
});

app.get('/name/:startDate&:endDate/:city/:country?', function(req, res, next) {
	console.log(req.params)
	if (req.params.country != null) {
		console.log('we are here')
		db.query('SELECT h.HotelID, l.Street,l.City,l.State,l.Country, l.Zip, Room.Room_no, Room.Price, Room.Description, Room.Type, Room.Discount \
			FROM Hotel h, Location l, Room \
			WHERE h.HotelID = l.HotelID and h.HotelID = Room.HotelID \
			AND (l.city = ?  and l.country = ?) \
			AND Room.Room_no NOT IN \
				(Select Reserves.Room_no \
				from Reserves, Hotel \
				where Reserves.In_Date <= ? and Reserves.Out_Date >= ? \
				and Reserves.HotelID = Hotel.HotelID)',
			 [req.params.city, req.params.country, req.params.startDate, req.params.endDate], 
			 function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				return res.send(400).send('an error occurred when retrieving results');
			}
			if (results.length > 0) {
				// assign results from this query
				console.log("lenth of results ", results.length)
				return res.status(200).send(results);
			}
			return res.status(200).send(results);
		});
	} else {
		db.query('SELECT h.HotelID, l.Street,l.City,l.State,l.Country, l.Zip,Room.Room_no, Room.Price, Room.Description, Room.Type, Room.Discount \
			FROM Hotel h, Location l, Room \
			WHERE h.HotelID = l.HotelID and h.HotelID = Room.HotelID \
			AND (l.city = ?) \
			AND Room.Room_no NOT IN \
				(Select Reserves.Room_no \
				from Reserves, Hotel \
				where Reserves.In_Date <= ? and Reserves.Out_Date >= ? \
				and Reserves.HotelID = Hotel.HotelID)', 
			[req.params.city, req.params.startDate, req.params.endDate], 
			function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				return res.send(400).send('an error occurred when retrieving results');
			}
			if (results.length > 0) {
				// assign results from this query
				console.log("length of results: ",results.length)
				return res.status(200).send(results);
			}
			return res.status(200).send(results);
		});
	}
	return res.status(200);
});	

module.exports = app;