var express = require('express');
var app = express();
var db = require('../db/conn');
var Promise = require('promise')

function breakfastQuery(breakfast){
	console.log('breakfast', breakfast)
	return new Promise(function(resolve, reject) {
		db.query('SELECT COUNT(*) as count FROM Includes WHERE Includes.Invoice_no = ?', breakfast.Invoice_no, function (error, results, fields) {
		  	if (error) {
				console.log("error occurred",error);
		        // return res.status(400).send('Error occurred in review');
		        reject(error);
		    }
		    console.log(results)
		    if (results[0].count > 0) {
		    	console.log('skipping')
			    db.query('UPDATE Includes SET \
							Includes.Times_req = 1+Includes.Times_req \
							WHERE Includes.bType= ? AND Includes.Invoice_no = ?', 
							[breakfast.bType, breakfast.Invoice_no], function (error, results, fields) {
				  	if (error) {
						console.log("error occurred",error);
				        // return res.status(400).send('Error occurred in review');
				        reject(error);
				    }
				    db.query('UPDATE Reservation SET Total_amt = ?+Total_amt \
				    			WHERE Invoice_no = ?', [breakfast.bPrice, breakfast.Invoice_no],function (error, results, fields){
				    	if (error) {
				    		console.log('error occurred', error);
				    		reject(error);
				    	}
				    	// return res.status(201).send('inserted values into breakfast');
				    	resolve(results);	
				    })
				});
		    } else {
		    	console.log('not skipping')
		    	const price = breakfast.bPrice
		    	delete breakfast.bPrice;
				    db.query('INSERT INTO Includes SET ?', breakfast, function (error, results, fields) {
					  	if (error) {
							console.log("error occurred",error);
					        // return res.status(400).send('Error occurred in review');
					        reject(error);
					    }
    				    db.query('UPDATE Reservation SET Total_amt = ?+Total_amt \
					    			WHERE Invoice_no = ?', [price, breakfast.Invoice_no],function (error, results, fields){
					    	if (error) {
					    		console.log('error occurred', error);
					    		reject(error);
					    	}
					    	// return res.status(201).send('inserted values into breakfast');
					    	resolve(results);	
					    })
					});
		    	}
		  })
	})
}

function serviceQuery(service){
	console.log('service')
	return new Promise(function(resolve, reject) {
		db.query('SELECT COUNT(*) as count FROM Contains WHERE Contains.Invoice_no = ?', service.Invoice_no, function (error, results, fields) {
		  	if (error) {
				console.log("error occurred",error);
		        // return res.status(400).send('Error occurred in review');
		        reject(error);
		    }
		    console.log(results)
		    if (results[0].count > 0) {
		    	console.log('skipping')
			    db.query('UPDATE Contains SET \
							Contains.Times_req = 1+Contains.Times_req \
							WHERE Contains.sType= ? AND Contains.Invoice_no = ?', 
							[service.sType, service.Invoice_no], function (error, results, fields) {
				  	if (error) {
						console.log("error occurred",error);
				        // return res.status(400).send('Error occurred in review');
				        reject(error);
				    }
				    db.query('UPDATE Reservation SET Total_amt = ?+Total_amt \
				    			WHERE Invoice_no = ?', [service.sCost, service.Invoice_no],function (error, results, fields){
				    	if (error) {
				    		console.log('error occurred', error);
				    		reject(error);
				    	}
				    	// return res.status(201).send('inserted values into service');
				    	resolve(results);	
				    })
				});
		    } else {
		    	console.log('not skipping')
		    	const cost = service.sCost;
		    	delete service.sCost;
				    db.query('INSERT INTO Contains SET ?', service, function (error, results, fields) {
					  	if (error) {
							console.log("error occurred",error);
					        // return res.status(400).send('Error occurred in review');
					        reject(error);
					    }
					    db.query('UPDATE Reservation SET Total_amt = ?+Total_amt \
					    			WHERE Invoice_no = ?', [cost, service.Invoice_no],function (error, results, fields){
					    	if (error) {
					    		console.log('error occurred', error);
					    		reject(error);
					    	}
					    	// return res.status(201).send('inserted values into service');
					    	resolve(results);	
					    })
					});
		    	}
		  })
	})
}

app.post('/breakfast', isLoggedIn, function(req, res, next) {
  console.log(req.body.breakfast[0].Invoice_no)
  var promises = [];
	  for (var i = 0; i < req.body.breakfast.length; i++) {
	  	console.log(i)
	  	promises.push(breakfastQuery(req.body.breakfast[i]));
	  }
	Promise.all(promises)
	.then(function(results) {
		return res.status(201).send('inserted values into breakfast');
	})
	.catch(function(err) {
		console.log('there was an error', err)
		return res.status(400).send('Error occurred');
	})
});

app.post('/service', isLoggedIn, function(req, res, next) {
  console.log(req.body.service[0].Invoice_no)
  var promises = [];
	  for (var i = 0; i < req.body.service.length; i++) {
	  	console.log(i)
	  	promises.push(serviceQuery(req.body.service[i]));
	  }
	Promise.all(promises)
	.then(function(results) {
		return res.status(201).send('inserted values into service');
	})
	.catch(function(err) {
		console.log('there was an error', err)
		return res.status(400).send('Error occurred');
	})
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