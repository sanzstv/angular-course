(function () {
	'use strict';
	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	//protect
	LunchCheckController.$inject = ['$scope'];
	
	function LunchCheckController($scope) {
	  $scope.lunch = "";
	  var lunchCount = 0;
	  $scope.message = "";

	   $scope.lunchValue = function () {
	   	var foods = $scope.lunch.split(',');
	   	//DISCARD EMPTY RESULTS
	   	foods = foods.filter(Boolean);
	   	lunchCount = foods.length;
	   	console.log(lunchCount);
	   	//nothing
	   	if ($scope.lunch == "")
	   		$scope.message = "Please enter data first.";
	   	else
	   	//good amount
	   	{ if(lunchCount > 0 && lunchCount <= 3  )
	   		$scope.message = "Enjoy!";
	   	//bruh
	   	else
	   		$scope.message = "Too much!";
	   }
	  };


	}

})();
