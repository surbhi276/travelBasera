'use strict';

var inclusionServices = require('../../services').inclusionServices;
var _ = require('lodash');

var countryCtrl = {

	getInclustionsCtrl: function(req, res, next){
		var options = {};
		inclusionServices.getInclusionService(options, function(err, data){
			if(err) return next(err);
			res.json({status:1, inclusions:data});
		})
	},

	addInclustionsCtrl:function(req, res, next){
		var options = {file:{}};
		var filee = _.get(req, 'file');
		_.assign(options, req.body);
		_.assign(options.file, filee); 
		console.log('inclusion data==', options);
		 
		inclusionServices.addInclusionService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1,message:'Inclsuion Saved Successfully', data:data});
		})
	},

	editCountryCtrl:function(req, res, next){
		var options = {}; 
		_.assign(options, req.body);
		debugger;
		inclusionServices.editCountryService(options, function(err, data){
			if(err){
				return next(err);
			}
			res.json({'status':1, 'message':'Country Updated Successfully'});
		})
	},

	deleteInclustionsCtrl: function(req,res,next){
		var options = {};
		_.assign(options, req.params);
		console.log('delete options',options);
		inclusionServices.deleteInclusionService(options, function(err, data){
			if(err) return next(err);
			res.json({message:'Inclusion Deleted Successfully'});
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