// For ROutes
export function routes($stateProvider) {
    $stateProvider
        .state('Home', {
            url: '/',
            templateUrl: 'app/modules/home/home.html',
            controller: 'navbarController',
            // Login Required
            requireAuth: true,
        })
        .state('Create Article', {
            url: '/create-article',
            templateUrl: 'app/modules/createArticle/createArticle.html',
            //controller: 'profileController',
            requireAuth: true,
        })
        .state('Profile', {
            url: '/profile',
            templateUrl: 'app/modules/profile/profile.html',
            //controller: 'profileController',
            requireAuth: true,
        })
        .state('Signup', {
            url: '/signup',
            templateUrl: 'app/modules/signup/signup.html',
            controller: 'signupController',
            // Only for non-loggedIn Users
            onlyNoAuth: true,
        })
        .state('Signin', {
            url: '/signin',
            //templateUrl: 'app/modules/signup/signup.html',
            //controller: 'signinController',
            onlyNoAuth: true,
        })
        .state('Logout', {
            url: '/logout',
            controller: 'logoutController',
        })
        .state('otherwise', {
            url: '*path',
            templateUrl: 'app/views/404.html',
        });
};

export function authRoutes($rootScope, $transitions, $state, Toast, TOAST_CONSTANTS) {
    $transitions.onSuccess({}, function($transition) {
        if ($transition.$to().self.requireAuth && !$rootScope.isLoggedIn) {
            Toast.setToast(TOAST_CONSTANTS.INFO, 'Please login to continue!');
            // Change to Signin during Signin part
            $state.go('Signup');
        } else if ($transition.$to().self.onlyNoAuth && $rootScope.isLoggedIn) {
            Toast.setToast(TOAST_CONSTANTS.INFO, 'You are already logged in');
            $state.go('Home');
        }
    });
}
