export default function navbarController($scope, $location) {
    // NavItems
    $scope.navItems = [
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
            // TODO: Add Logout during Authentication Part
            name: 'Signin',
            path: '/signin',
        },
    ];
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
