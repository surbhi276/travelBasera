'use strict';
var countryCtrl = require('./country');
var mongoose  = require('mongoose');



module.exports = function(app){

	app.route('/api/getAllCountry')
		.get(countryCtrl.getAllCountryCtrl) 
	app.route('/api/addCountry')
		.post(countryCtrl.addCountryCtrl)
	app.route('/api/updateCountry')
		.put(countryCtrl.editCountryCtrl) 
	app.route('/api/deleteCountry/:id')
		.delete(countryCtrl.deleteCountryCtrl) 
	app.route('api/fetchSingleCountry/:id')
		.get(countryCtrl.fetchCountryByIdCtrl)
}	