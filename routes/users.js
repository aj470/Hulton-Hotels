var express = require('express');
var app = express();
var db = require('../db/conn');

/* GET users listing. */
app.get('/reservations', isLoggedIn, function(req, res, next) {
	db.query('SELECT * FROM Reservation WHERE cid = ?',req.user.CID, function (error, results, fields) {
	    if (error) {
			console.log("error ocurred",error);
			return res.status(400).send('an error occurred when retrieving results');
	    } else {
	    	console.log(results, req.user.CID)
			if(results.length > 0){
	        	return res.status(200).send(results);
	      	}
	      return res.status(200).send(results);
	    }
	});
});

app.post('/reservations/breakfast', isLoggedIn, function(req, res, next) {
	db.query('SELECT Breakfast.bType, Breakfast.bPrice, Breakfast.HotelID \
				FROM Breakfast, Reserves \
				WHERE Breakfast.HotelID = Reserves.HotelID \
				AND Reserves.Invoice_no = ?',[req.body.Invoice_no], function (error, results, fields) {
	    if (error) {
			console.log("error ocurred",error);
			return res.status(400).send('an error occurred when retrieving results');
	    } else {
	    	console.log("results: ",results, req.user.CID, req.body.Invoice_no)
			if(results.length > 0){
	        	return res.status(200).send(results);
	      	}
	      return res.status(200).send(results);
	    }
	});
});


app.post('/reservations/service', isLoggedIn, function(req, res, next) {
	db.query('SELECT Service.sType, Service.sCost, Service.HotelID \
				FROM Service, Reserves \
				WHERE Service.HotelID = Reserves.HotelID \
				AND Reserves.Invoice_no = ?',[req.body.Invoice_no], function (error, results, fields) {
	    if (error) {
			console.log("error ocurred",error);
			return res.status(400).send('an error occurred when retrieving results');
	    } else {
	    	console.log("results: ",results, req.user.CID, req.body.Invoice_no)
			if(results.length > 0){
	        	return res.status(200).send(results);
	      	}
	      return res.status(200).send(results);
	    }
	});
});


app.get('/review', isLoggedIn, function(req, res, next) {
	db.query('select Review.Type, Review.rating, Review.textComment \
		FROM Review, Writes where Review.ReviewID = Writes.ReviewID and Writes.CID = ?', 
		req.user.CID, function (error, results, fields) {
	    if (error) {
			console.log("error ocurred",error);
			return res.status(400).send('an error occurred when retrieving results');
	    } else {
	    	console.log(results, req.user.CID)
			if(results.length > 0){
	        	return res.status(200).send(results);
	      	}
	      return res.status(200).send(results);
	    }
	});
});

app.post('/review', isLoggedIn, function(req, res, next) {
	console.log(req.body)
	req.check({rating: {notEmpty: true}, type: {notEmpty: true },
                textComment: {notEmpty: true}});
	req.getValidationResult()
	.then(function(errors) {
		if (!errors.isEmpty()) {
	      console.log("validation errors");
	      return res.status(400).send('Bad Request');
	    } else {
	    	var type = "";
	    	switch(req.body.type){
	    		case 1:
	    			type = "Room"
	    			break;
	    		case 2:
	    			type = "Service"
	    			break;
	    		case 3:
	    			type = "Breakfast"
	    			break;
	    		default:
	    			//return error
	    			return res.status(400).send('review type not defined');
	    	}
	    	var today = new Date();
			var uuid = Math.round((new Date()).getTime() / 1000);
	    	const review = {
				type: type,
				rating: req.body.rating,
				textComment: req.body.textComment,
				ReviewID: uuid
			}
	    	db.query('INSERT into Review SET ?', review, function (error, results, fields) {
	    		if (error) {
               	 	console.log("error occurred",error);
	                return res.status(400).send('Error occurred in review');
	            }else{
	            	var row = {
	            		ReviewID: review.ReviewID,
	            		CID: req.user.CID
	            	}
	            	db.query('INSERT into Writes SET ?', row, function (error, results, fields) {
			    		if (error) {
		               	 	console.log("error occurred",error);
			                return res.status(400).send('Error occurred in writes');
			            }else{
			            	return res.status(200).send(review);
			            }
	            	});
	            }
	    	});
	    }
	});
});

function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		console.log(req.user);
		return next();
	}
	// if they aren't redirect them to the home page
	return res.status(401).send('Unauthorized access. Please sign in');
}

module.exports = app;
