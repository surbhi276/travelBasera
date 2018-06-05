var _ 				= 	require('lodash');
var Q 				=	require('q');
var categoryModel    = 	require('../models').categoryModel;
var ec 				= 	require('../../constants').errors;
var lib 			=	require('../../lib');
var middlewares 	= 	lib.middlewares; 

function checkCategoryName(){

	var deferred = Q.defer();
	var self = this;
	self.cat_code = 1;
	categoryModel.find({c_name:self.data.name}, function(err, data){
		if(err) return deferred.reject();
		if(data.length)
			 return deferred.reject(ec.Error({status:ec.DATA_ALREADY_EXISTS, message:'Category Already Exist.'}));
		deferred.resolve();
	});
	return deferred.promise;
}
function getLastCode(){
	var self = this;
 	var deferred = Q.defer();
 	categoryModel.find(function(err, data){
 		if(err)
 			return deferred.reject(ec.Error({status:ec.DB_ERROR, message :"Unable to Fetch Categories"}));
 		
 		if(data.length){
            var lastElm = data[data.length-1];
     		self.cat_code = parseInt(lastElm.cat_code)+1;
       } 
 		deferred.resolve();
 	});
 	return deferred.promise;
}
function saveNewCategory(){
	var deferred = Q.defer();
	var self = this;
	var reqObj = {
			'cat_name': self.data.name,
			'cat_code': self.cat_code,
			'cat_image': self.file.path,
			'metadata':{'is_active' : self.data.status}
		}

		var newData = new categoryModel(reqObj);
			newData.save(function(err, data){
				if(err)return deferred.reject(ec.Error({status:ec.DB_ERROR, message:"Unable Save Category."}));
				deferred.resolve();
			}) ;
		return deferred.promise;
}

var categoryServ = {
	 
	addCategoryService: function(options,cb){  
		if(!options)
            return cb(ec.Error({status:ec.DB_ERROR, message :"Invalid data to add Category"}));

       checkCategoryName.call(options)
       		.then(getLastCode.bind(options))
            .then(saveNewCategory.bind(options)) 
            .then(cb)
            .fail(failureCb)
            .catch(failureCb)

        function failureCb(err){
            var finalErr = new Error(err.message || 'Some Undefined Error Occurs.');
            finalErr.status = err.status || 400;
            return cb(finalErr);
        } 
		 
	},
	getCategoryService: function(options, cb){
		categoryModel.find({}, function(err, data){
			if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to get Categories"}));
			cb(null, data);
		})
	},
	updateBannerService: function(options,cb){
		// var img_data = {metadata:{}};
		// 	img_data.imageTitle = options.imageTitle;
		// 	img_data.metadata.status = options.status;
		// 	img_data.imageUrl = options.file.path;
		console.log(options);
		// var newData = bannersModel(img_data);
		// 	newData.update({_id:options._id},updateData,function(err, data){
		// 		if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable Save Image."}));
		// 		cb(null, data);
		// 	}) 
		 
	},
	deleteBanners: function(options, cb){
		console.log(options);
		debugger;
		bannersModel.remove({_id:options.id}, function(err, data){
		if(err)return cb(ec.Error({status:ec.DB_ERROR, message:"Unable to delete Categories"}));
		debugger;
			cb(null, data);

		})
	}
};
module.exports = categoryServ;
