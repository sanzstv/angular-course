(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject=['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var toBuy = this;
		//hardcoded list of items to buy, default
		toBuy.itemsToBuy =[
		{name: "cookies", quantity: 10},
		{name: "ice cream", quantity: 5},
		{name: "coffee", quantity: 8},
		{name: "chickens", quantity: 34},
		{name: "peanut butter", quantity: 2},
		];

	 	toBuy.moveItem = function(index, itemName, quantity){
	 			 	   	    toBuy.itemsToBuy.splice(index, 1);

	 	   ShoppingListCheckOffService.moveItem(index, itemName, quantity);

	 	};
	}
	AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var bought = this;
		bought.itemsBought = ShoppingListCheckOffService.getItemsBought();
	}

	function ShoppingListCheckOffService() {
	  var service = this;

	  // List of shopping items
	  var itemsToBuy = [];
	  var itemsBought = [];
	  service.addItem = function (itemName, quantity) {
	    var item = {
	      name: itemName,
	      quantity: quantity
	    };
	    items.push(item);
	  };
	  service.getItemsToBuy = function () {
	    return itemsBought;
	  };
	  service.getItemsBought = function () {
	    return itemsBought;
	  };
	  service.moveItem = function(index, itemName, quantity){
	  	//take out of tobuy array
	  		 		console.log("huh2");
	  		 		console.log("index:", index);
	  		 		console.log(itemName);

	  		 		console.log(quantity);

	    //move into bought array
	    var item = {
	    	name: itemName,
	    	quantity: quantity
	    };
	    itemsBought.push(item);
	    
	  };
	}

})();

