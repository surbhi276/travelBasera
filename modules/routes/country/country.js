'use strict';

var countryServices = require('../../services').countryServices;
var _ = require('lodash');

var countryCtrl = {

	getAllCountryCtrl: function(req, res, next){
		var options = {};
		countryServices.getAllCountryService(options, function(err, data){
			if(err) return next(err);
			res.json({ country:data});
		})
	},

	addCountryCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		var options = req.body;

		countryServices.addCountryService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({message:'Country Saved Successfully', data:data});
		})
	},

	editCountryCtrl:function(req, res, next){
		var options = {};
		_.assign(options, req.body);
		countryServices.editCountryService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({message:'Country Saved Successfully', data:data});
		})
	},

	deleteCountryCtrl: function(req,res,next){
		console.log(req,"ssssssssssssss");
		var options = {};
		_.assign(options, req.params);
		console('delete options',options);
		countryServices.deleteCountryService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'Country Deleted Successfully'});
		})
	},

	fetchCountryByIdCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		countryServices.fetchCountryByIdService(options, function(err, data){
			if(err) return next(err);
			res.json({result:data});
		})
	}
};

module.exports = countryCtrl;