(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject=['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var toBuy = this;
		//get list of items to buy from service
		toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

	 	toBuy.moveItem = function(index, itemName, quantity){

	 	   ShoppingListCheckOffService.moveItem(index, itemName, quantity);

	 	};
	}
	AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var bought = this;
		//get items that have been bought from service 
		bought.itemsBought = ShoppingListCheckOffService.getItemsBought();
	}

	function ShoppingListCheckOffService() {
	  var service = this;

	//hardcoded list of items to buy, default
	  var itemsToBuy = [
	  	{name: "cookies", quantity: 10},
		{name: "ice cream", quantity: 5},
		{name: "coffee", quantity: 8},
		{name: "chickens", quantity: 34},
		{name: "peanut butter", quantity: 2},
		];

		//haven't bought anything yet so...
	  var itemsBought = [];

	 
	  service.getItemsToBuy = function () {
	    return itemsToBuy;
	  };
	  service.getItemsBought = function () {
	    return itemsBought;
	  };
	  service.moveItem = function(index, itemName, quantity){
	  	//take out of tobuy array
	 	itemsToBuy.splice(index, 1);

	    //move into bought array
	    var item = {
	    	name: itemName,
	    	quantity: quantity
	    };
	    itemsBought.push(item);
	    
	  };
	}

})();

