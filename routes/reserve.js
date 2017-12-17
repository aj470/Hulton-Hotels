var express = require('express');
var app = express();
var db = require('../db/conn');

/* GET users listing. */
app.post('/card', isLoggedIn, function(req, res, next) {
	console.log('hi from the add card route', req.body.exp)
	req.check({cnum: {notEmpty: true}, address: {notEmpty: true },
                cvv: {notEmpty: true}, name: {notEmpty: true},
            	type: {notEmpty: true}, exp: {notEmpty: true}});
	req.getValidationResult()
	.then(function(errors) {
		if (!errors.isEmpty()) {
	      console.log("validation errors");
	      return res.status(400).send('Bad Request');
	    }
		db.query('SELECT count(*) as count FROM CreditCard c \
			WHERE c.C_num = ?', req.body.cnum, function (error, results, fields) {
		    if (error) {
				console.log("error ocurred",error);
				return res.status(400).send('an error occurred when retrieving results');
		    } else {
		    	// if no card exists
		    	console.log(results)
				if(results[0].count == 0){
					card = {
						C_num: req.body.cnum,
						BillingAddr: req.body.address,
						Name: req.body.name,
						SecCode: req.body.cvv,
						Type: req.body.type,
						ExpDate: req.body.exp
					}
					console.log('will insert this card');
					// insert if card does not exists
					db.query('INSERT INTO CreditCard SET ?', card, function (error, results, fields) {
						if (error) {
							console.log("error ocurred",error);
							return res.status(400).send('an error occurred when inserting card');
					    } else {
					    	return res.status(201).send('new card created');
					    }
					});
		      	} else {
		      		console.log('card already exists')
			      	// if it already exists, just return
					return res.status(200).send('card already exists');
		      	}
		    }
		});
	});
});


app.post('/reservation', isLoggedIn, function(req, res, next) {
	req.check({cnum: {notEmpty: true}, start: {notEmpty: true }, end: {notEmpty: true }, total: {notEmpty: true},
				room: {notEmpty: true}, hotelID: {notEmpty: true}});
	req.getValidationResult()
	.then(function(errors) {
		if (!errors.isEmpty()) {
	      console.log("validation errors");
	      return res.status(400).send('Bad Request');
	    }
		var today = new Date();
		var uuid = Math.round((new Date()).getTime() / 1000);
		var one_day = 1000*60*60*24;
		var num_days = Math.abs(Math.round((new Date(req.body.start).getTime()-new Date(req.body.end).getTime())/one_day));
		reservation = {
			Invoice_no: uuid,
			CID: req.user.CID,
			c_num: req.body.cnum,
			Res_date: req.body.start,
			Total_amt: req.body.total*num_days
		}
		reserves = {
			Room_no: req.body.room,
			HotelID: req.body.hotelID,
			Invoice_no: uuid,
			In_Date: req.body.start,
			Out_Date: req.body.end,
			No_of_days: num_days,
		}
		db.query('INSERT INTO Reservation SET ?', reservation, function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				return res.status(400).send('an error occurred when inserting card');
		    } else {
		    	console.log(num_days)
		    	db.query('INSERT INTO Reserves SET ?', reserves, function (error, results, fields) {
					if (error) {
						console.log("error ocurred",error);
						return res.status(400).send('an error occurred when inserting card');
					}
					return res.status(201).send('new reservation created');
		    	});
		    }
		});
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