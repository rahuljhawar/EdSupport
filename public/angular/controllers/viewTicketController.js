myApp.controller('viewTicketController',['$http','apiService','$route','$routeParams','$location',function($http,apiService,$route,$routeParams,$location){

let ticketview = this;

//view the details of the ticket
this.viewSingleTicket = ()=>{
	let ticketId = $routeParams.ticketId;
	apiService.getTicket(ticketId).then(function successCallBack(response){
		if(!response.data.error){
			ticketview.ticketInfo= response.data.data;	
			console.log(ticketview.ticketInfo);
			
		}else{
			alert(response.data.message);
			$location.path('/dashboard');
		}		
 		
 	},function errorCallback(response) {
            console.log(response);
        });

};

this.viewSingleTicket();

//function to post a message by the user
this.postUserMsg = () =>{

	let msgData = {
		message : ticketview.msg
	}
	apiService.userMsg(ticketview.ticketInfo.ticketid,msgData).then(function successCallBack(response){
		if(!response.data.error){
			console.log(response);
			$route.reload();
		}	
 		
 	},function errorCallback(response) {
            console.log(response);
        });

};
//function to post a message by the admin
this.postAdminMsg = () =>{

	let msgData = {
		message : ticketview.msg
	}
	apiService.adminMsg(ticketview.ticketInfo.ticketid,msgData).then(function successCallBack(response){
		if(!response.data.error){
			console.log(response);
			$route.reload();
		}	
 		
 	},function errorCallback(response) {
            console.log(response);
        });

};

//function to change the status of the ticket
this.changeStatus = () =>{
	if(confirm("Do you want to close the discussion?")){
		apiService.ticketStatusChange(ticketview.ticketInfo.ticketid).then(function successCallBack(response){
			if(!response.data.error){
				alert(response.data.message);
				$location.path('/dashboard');
			}	

		},function errorCallback(response) {
			console.log(response);
		});


	}
	

};

}]);