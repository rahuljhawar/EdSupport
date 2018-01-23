myApp.factory('apiService',($http,authService, $q)=>{
	let requests={};

	const baseUrl = "http://localhost:3000";

	//sign up requests
	requests.signUp=(userData)=>{
		return $http.post(baseUrl+'/signup' , userData);
	};
	//login requests
	requests.login=(loginData)=>{
		return $http.post(baseUrl+'/login' , loginData);
	};

	//get logged in user
	requests.getUser = ()=>{
		if(authService.getToken()){
			return $http.get(baseUrl+'/user/currentUser?token='+authService.getToken() , null);
		}else{
			return $q.reject({data:"User not authorized..."});
		}
	}
	//reset password requests

	requests.forgotPasswordOtpSend=(userData)=>{
		return $http.post(baseUrl+'/forgotpassword' , userData);
	};

	requests.verifySentOtp=(otp)=>{
		return $http.post(baseUrl+'/verifyotp' , otp);
	};

	requests.resetPassword=(newPassword)=>{
		return $http.post(baseUrl+'/resetpassword' , newPassword);
	};


	//ticket requests

	//create a ticket
	requests.createTicket = (ticketData)=>{
		return	$http.post(baseUrl+'/user/createTicket?token='+authService.getToken() , ticketData);
	}

	//view a single ticket
	requests.getTicket = (ticketNo)=>{
		return	$http.get(baseUrl+'/user/ticket/'+ticketNo+'?token='+authService.getToken());
	}
	//get all tickets by a user 
	requests.getUserTickets = ()=>{
		return	$http.get(baseUrl+'/user/tickets/?token='+authService.getToken());
	}
	//get all tickets by a all users for the admin 
	requests.getAdminTickets = ()=>{
		return	$http.get(baseUrl+'/user/admin/tickets/?token='+authService.getToken());
	}

	//status change request
	requests.ticketStatusChange = (ticketNo)=>{
		return	$http.post(baseUrl+'/user/ticket/statuschange/'+ticketNo+'?token='+authService.getToken());
	}

	//request for posting message by the user
	requests.userMsg = (ticketNo,msgData)=>{
		return	$http.post(baseUrl+'/user/ticket/usermessage/'+ticketNo+'?token='+authService.getToken(),msgData);
	}
	//request for posting message by the admin
	requests.adminMsg = (ticketNo,msgData)=>{
		return	$http.post(baseUrl+'/user/ticket/adminmessage/'+ticketNo+'?token='+authService.getToken(),msgData);
	}


	return requests;
});