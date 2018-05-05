var _ 				= 	require('lodash');
var jwt				=	require('jsonwebtoken');
var Q 				=	require('q');
var _country     	= 	require('../models');
var countryModel    =  _country.countryModel;
var ec 				= 	require('../../constants').errors;
const lib 			=	require('../../lib');
const middlewares 	= 	lib.middlewares; 


var countryService = {

	getAllCountryService:function(options, cb){
	
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"No data"}));

		countryModel.find({},function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch countries"}));
				cb(null,data);
		});
	},

	addCountryService:function(options, cb){
		
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create Country"}));

        var addcountry = new countryModel({c_name:options.c_name});
		addcountry.save(function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message :"Unable to Insert Country"}));
				cb();
		});
	},
	
	editCountryService:function(options, cb){
debugger;
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to create Country"}));
        var updateAbleData = {'c_name':options.c_name};
		countryModel.update({_id:options.id},updateAbleData, function(err, data){
			if(err)
				return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to Update User'}));
			debugger;
			console.log(data)
			cb(null, data);
		});
	},

	deleteCountryService: function(options, cb){
		
		countryModel.remove({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
			cb(null, result);
		});
	},

	fetchCountryByIdService: function(options, cb){
		
		countryModel.findOne({_id:options.id}, function(err, result){
			if(err) return cb(ec.Error({status:ec.DB_ERROR, message:'Unable to get results'}));
			delete result.id;
			cb(null, result);
		});
	}
};
module.exports = countryService;