(function(){
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController', NarrowItDownController)
	.directive('foundItems',FoundItemsDirective)
	.service('MenuSearchService', MenuSearchService)
	.constant('API_URL', "https://davids-restaurant.herokuapp.com/menu_items.json");;

	
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){
		var list = this;
		list.query = "";
		list.matches =[];
		list.message ="";
		list.search= function(){

			if(list.query){
				var promise = MenuSearchService.getMatchedMenuItems(list.query);
				promise.then(function(response){
					list.matches = response;
					if (list.matches.length == 0){
						list.message = "No matches for \""+ list.query +"\" ";
					}
					else{
						list.message = "All results for \""+ list.query +"\" (" +list.matches.length +" results)";
					}
				});
			}
			else{
				list.message = "Please enter a search string.";
			}
		};

		list.removeItem = function(index){
			list.matches.splice(index, 1);
		};
	}
	MenuSearchService.$inject =["$http", "API_URL"];
	function MenuSearchService($http, API_URL){
		var service = this;
		//find items from API and return matches
		service.getMatchedMenuItems = function(searchTerm){

			return $http({
				method: "GET",
				url: (API_URL)
			}).then(function (result) {
			    // process result and only keep items that match
			    // return processed items
			    var foundItems = result.data.menu_items;
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
				messsage: "<"
			}
		}
		return ddo;
	}


})();
