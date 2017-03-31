(function(){
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController', NarrowItDownController)
	.directive('foundItems',FoundItemsDirective)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");;

	
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(ShoppingListFactory){
		var list = this;
		list.query = "";
		list.matches =[];
		list.message ="";
		menu.search= function(){
			console.log(list.query);
			if(list.query){
				var promise = MenuSearchService.getMatchedMenuItems(query)
				promise.then(function(response){
					list.matches = response;
					if (list.matches.length == 0){
						list.message = "No matches for \""+ list.query +"\" ";
					}
				});
			}
			else{
				list.message = "Please enter a search string."
			}
		};
	}
	MenuSearchService.$inject["http", "ApiBasePath"];
	function MenuSearchService($http, ApiBasePath){
		var service = this;

		//find items from API and return matches
		service.getMatchedMenuItems = function(searchTerm){
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			}).then(function (result) {
			    // process result and only keep items that match
			    // return processed items

			    var foundItems = response.data.menu_items;
			    return foundItems.filter(function(item){
				    return item.description.indexOf(searchTerm) !== -1;
				});
			
			});
		};
	}
	
	function FoundItemsDirective(){
		var ddo={
			templateUrl: 'founditems.html',
			scope: {
				items: "<",
				onRemove: "&",
				error: "<"
			}
		}
		return ddo;
	}


})();
