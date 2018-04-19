"use strict";

app.controller('countryController', function($scope, $http,configuration,$location,$routeParams){
		$scope.successPop = false;
		var url = $location.url();
		$scope.viewData = true; 

		$scope.getAllCountry= function(){ 
	      	$http.get(configuration.GET_ALL_COUNTRY_URL).then(function success(res){
               $scope.countryList = res.data.country;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data;
 			});
		 
		};

		$scope.addNewCountry = function(){ 
			if($scope.newCountry.$valid){
				var reqObj = {c_name:$scope.role.name};
		      	$http.post(configuration.ADD_COUNTRY_URL, reqObj).then(function success(res){
                    console.log(res.data);
                }, function errorCallback(err){
                    $scope.invoiceError = true;
                    $scope.invoiceErrorMsg = err.data.message; 

                });
			}
		};
		if(url == '/country' ){ 
			$scope.getAllCountry();
		}

		$scope.editCountry = function(id){
			alert("hjllj");
			$location.path('#!/editCountry/'+id);
			$scope.callIt(); 
		};


		$scope.callIt = function(){
			alert($location.url());
			if($location.url().split('/')[1] == 'editCountry'){
				var userId = $routeParams.id;
				$http.get(configuration.FETCH_SINGLE_COUNTRY+"/"+userId).then(function success(res){
	              $scope.singleUser  = res.data.result;
	              
	            }, function errorCallback(err){
	                $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = err.data;

	            });

				$scope.editCountry = function(){
					 
				$http.put(configuration.EDIT_COUNTRY_URL+"/"+userId, $scope.singleUser).then(function success(res){
	               $scope.successMsg = res.data.message;
	               $scope.successPop = true;
	               $scope.errorPop = false;
	            }, function errorCallback(err){
	                $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = err.data;

	            });
				}
			}
			else{
				alert("surhi")
			}
		}

		$scope.deleteConfirmation = function(id){
			$scope.deleteId = id;
			$scope.deleteConfirmationModal = true;
		};

		$scope.deleteCountry = function(){ 
			$scope.id = $scope.deleteId ;
			$http.delete(configuration.DELETE_COUNTRY_URL+"/"+$scope.id).then(function success(res){
			   $scope.successMsg = res.data.message;
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.deleteConfirmationModal = false;
               $scope.getAllCountry();
			}, function errorCallback(err){
               $scope.errorPop = true;
               $scope.successPop = false;
               $scope.errorMsg = err.data;
			});
		};
	

});