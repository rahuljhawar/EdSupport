myApp.controller('addTicketController',['$http','apiService','authService','$rootScope','$location',function($http,apiService,authService,$rootScope,$location){

var ticket = this;
//function to add a ticket
 this.addTicket =()=>{
 	let addticketData = {
 		title:ticket.title,
 		description:ticket.description
 	};

 	apiService.createTicket(addticketData).then(function successCallBack(response){
		if(!response.data.error){
			alert(response.data.message);
            $location.path('/dashboard');
		}		
 		
 	},function errorCallback(response) {
            console.log(response);
        });

 };

}]);