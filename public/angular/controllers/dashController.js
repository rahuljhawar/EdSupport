myApp.controller('dashController',['$http','$filter','$route','apiService','authService','$rootScope','$location',function($http,$filter,$route,apiService,authService,$rootScope,$location){
	var dash = this;
	this.tickets=[];
	this.filteredTickets=[];

	//check whether the user is logged in
	this.loggedIn=()=>{
		if(authService.isLoggedIn()){
			return 1;

		}
		else{
			return 0;
		}
	};
	//get the user detail
	this.getUserDetail=()=>{
		if(authService.isLoggedIn()){
			apiService.getUser().then(function successCallBack(response){
				if(response.data.error){
					alert("Authentication failed! Token Expired");
					dash.logout();

				}else{
				$rootScope.name=response.data.firstName +' '+response.data.lastName ;
				if(response.data.email === 'admin@edsupport.com'){
					dash.AdminTickets();
					$rootScope.admin = true;
					dash.clearFilter();
				}else{
					dash.UserTickets();
					$rootScope.admin = false;
					dash.clearFilter();
				}
				
		
			}
		});
		}	
	};
	this.getUserDetail();

	//get the user tickets
	this.UserTickets = ()=>{
		apiService.getUserTickets().then(function successCallBack(response){
			response.data.data.forEach(function(ticket){
				dash.tickets.push(ticket);
			
			});
				if(dash.tickets.length>0){
					dash.ticketLength=1;
				}else{
					dash.ticketLength=0;
				}

			console.log(dash.tickets);
			
		},
		function errorCallback(response) {
	  		alert("some error occurred. Check the console.");
	  		console.log(response); 
  		});

	};

	//get the admin tickets
	this.AdminTickets = ()=>{
		apiService.getAdminTickets().then(function successCallBack(response){
				response.data.data.forEach(function(ticket){
					dash.tickets.push(ticket);
				});
			
	
				if(dash.tickets.length > 0 ){
					dash.ticketLength=1;
				}else{
					dash.ticketLength=0;
				}

			console.log(dash.ticketLength);
		},
		function errorCallback(response) {
	  		alert("some error occurred. Check the console.");
	  		console.log(response); 
  		});

	};

	//filter the open tickets
	this.openTickets=()=>{

		dash.filteredTickets=$filter('filter')(dash.tickets,{status:"open"});
		
		console.log(dash.filteredTickets);

		
	};

	    //filter closed tickets
	    this.closeTickets =  () =>{
	    	dash.filteredTickets=$filter('filter')(dash.tickets,{status:"close"});
	    	console.log(dash.filteredTickets);
	    };
	    //clear the filter
	    this.clearFilter=()=>{
	    	dash.filteredTickets = dash.tickets;
	    };



		//function to logout the user
  	this.logout=()=>{
  		//clear the local storage
  		delete $rootScope.admin;
  		delete $rootScope.name;
  		authService.setToken();
  		$location.path('/login');
  	}


}]);