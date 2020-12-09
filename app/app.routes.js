export default function routes($stateProvider) {
    // TODO: Protected Routes during Authentication Setup
    $stateProvider
        .state('Home', {
            url: '/',
            templateUrl: 'app/views/home.html',
            controller: 'navbarController' 
        })
        .state('Create Article', {
            url: '/create-article',
            templateUrl: 'app/views/createArticle.html',
            //controller: 'profileController' 
        })
        .state('Profile', {
            url: '/profile',
            templateUrl: 'app/views/profile.html',
            //controller: 'profileController' 
        })
        .state('Signup', {
            url: '/signup',
            templateUrl: 'app/views/signup.html',
            //controller: 'signupController' 
        })
        .state('Signin', {
            url: '/signin',
            templateUrl: 'app/views/signin.html',
            //controller: 'signinController' 
        })
        .state('logout', {
            url: '/logout',
            //templateUrl: 'app/views/logout.html',
            //controller: 'logoutController' 
        })
        .state('otherwise', {
            url: '*path',
            templateUrl: 'app/views/404.html',
        });
};
