export default function navbarController($scope, $state, $rootScope) {
    // When the user is logged Out
    const loggedOutNavItems = [
        'Home', 'Create Article', 'Profile', 'Signup', 'Signin'
    ];
    // When the user is loggedIn
    const loggedInNavItems = [...loggedOutNavItems.filter(function(navItem) {
        return (navItem !== 'Signup' && navItem !== 'Signin')
    }), 'Logout'];
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
    $scope.isActiveLink = function(currentState) {
        return currentState === $state.current.name;
    };
    $scope.handleBack = function() {
        history.back();
    };
};
