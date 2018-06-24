'use strict';
var termAndConditionsCtrl = require('./termAndConditions');
var mongoose  = require('mongoose');
var error 	 = require('../../error');



module.exports = function(app){

	app.route('/api/termAndConditions')
		.post(termAndConditionsCtrl.addTermAndConditionsCtrl,error)
		.get(termAndConditionsCtrl.getTermAndConditionsCtrl,error)
		.put(termAndConditionsCtrl.updateTermAndConditionsCtrl,error) 
//API for Web
 app.route('/v1/api/termAndConditions') 
 	.get(termAndConditionsCtrl._gettermConditionsCtrl, error)
 	
	 
}