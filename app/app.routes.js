export default function routes($stateProvider, Auth) {
    $stateProvider
        .state('Home', {
            url: '/',
            templateUrl: 'app/views/home.html',
            controller: 'navbarController',
            requireAuth: true,
        })
        .state('Create Article', {
            url: '/create-article',
            templateUrl: 'app/views/createArticle.html',
            //controller: 'profileController',
            requireAuth: true,
        })
        .state('Profile', {
            url: '/profile',
            templateUrl: 'app/views/profile.html',
            //controller: 'profileController',
            requireAuth: true,
        })
        .state('Signup', {
            url: '/signup',
            templateUrl: 'app/views/signup.html',
            controller: 'signupController',
            onlyNoAuth: true,
        })
        .state('Signin', {
            url: '/signin',
            templateUrl: 'app/views/signup.html',
            controller: 'siginController',
            onlyNoAuth: true,
        })
        .state('logout', {
            url: '/logout',
            controller: 'logoutController',
        })
        .state('otherwise', {
            url: '*path',
            templateUrl: 'app/views/404.html',
        });
};
