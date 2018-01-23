myApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){

      
    $routeProvider
        .when('/',{
        	templateUrl		: 'views/main.html'
         
        })
        .when('/login',{
        	templateUrl    : 'views/login.html',
            controller     : 'userController',
            controllerAs   : 'userCtrl',
             resolve: {
                "check": function ($location,authService) {
                    if (authService.getToken()) {

                            $location.path('/dashboard');
                          
                        } else {
                        $location.path('/login');
                     
                    }
                }
            }
        	
        })
         .when('/signup',{
            templateUrl    : 'views/signup.html',
            controller     : 'userController',
            controllerAs   : 'userCtrl'
            
        })
          .when('/forgotpassword',{
            templateUrl    : 'views/forgot-pass.html',
             controller     : 'userController',
            controllerAs   : 'userCtrl'
        })

         .when('/dashboard',{
            templateUrl    : 'views/dashboard.html',
            controller     : 'dashController',
            controllerAs   : 'dashCtrl',
              resolve: {
                "check": function ($location,authService) {
                    if (authService.getToken()) {

                            $location.path('/dashboard');
                          
                        } else {
                        $location.path('/login');
                     
                    }
                }
            }
        })
         .when('/addTicket',{
            templateUrl    : 'views/addticket.html',
            controller     : 'addTicketController',
            controllerAs   : 'addCtrl',
              resolve: {
                "check": function ($location,authService) {
                    if (authService.getToken()) {

                            $location.path('/addTicket');
                          
                        } else {
                        $location.path('/login');
                     
                    }
                }
            }
        })
        .when('/ticketView/:ticketId',{
            templateUrl    : 'views/viewTicket.html',
            controller     : 'viewTicketController',
            controllerAs   : 'viewCtrl',
              resolve: {
                "check": function ($location,authService) {
                    if (!authService.getToken()) {

                            $location.path('/login');
                          
                        } 
                     
                    
                }
            }
        })
   

        .otherwise(
            {
                redirectTo:'/'
               
            }
        );
        $locationProvider.html5Mode(true);

    
}]);
  