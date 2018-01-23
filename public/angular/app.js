const myApp =  angular.module('EdSupport',['angular-loading-bar','ngRoute','ngAnimate'])
					.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    		
    						cfpLoadingBarProvider.includeSpinner = false;
    				}]);