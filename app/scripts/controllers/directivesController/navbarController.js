export default function navbarController($scope, $location, $rootScope) {
    // When the user is logged Out
    const loggedOutNavItems = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Create Article',
            path: '/create-article',
        },
        {
            name: 'Profile',
            path: '/profile',
        },
        {
            name: 'Signup',
            path: '/signup',
        },
        {
            name: 'Signin',
            path: '/signin',
        },
    ];
    // When the user is loggedIn
    const loggedInNavItems = [...loggedOutNavItems.filter(function(navItem) {
        return (navItem.name !== 'Signup' && navItem.name !== 'Signin')
    }), {
        name: 'Logout',
        path: '/logout',
    }];
    // Watch for changes in isLoggedIn variable
    $scope.$watch(
        function() {
            return $rootScope.isLoggedIn;
        }, function() {
            $scope.navItems = $rootScope.isLoggedIn ? loggedInNavItems : loggedOutNavItems;
        }
    );
    $scope.toggleActive = false;

    $scope.handleToggle = function() {
        $scope.toggleActive = !$scope.toggleActive;
    }
    $scope.isActiveLink = function(currentPath) {
        return currentPath === $location.path();
    };
    $scope.handleBack = function() {
        history.back();
    };
};
