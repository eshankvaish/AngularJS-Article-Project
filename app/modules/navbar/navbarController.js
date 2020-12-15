export default function navbarController($scope, $state, $rootScope, Auth) {
    // When the user is logged Out
    const loggedOutNavItems = [
        'Home', 'Create Article', 'Profile', 'Signup', 'Signin'
    ];
    // When the user is loggedIn
    const loggedInNavItems = [...loggedOutNavItems.filter(function(navItem) {
        return (navItem !== 'Signup' && navItem !== 'Signin')
    })];
    // Watch for changes in isLoggedIn variable
    $scope.$watch(
        function() {
            return $rootScope.isLoggedIn;
        }, function() {
            $scope.navItems = $rootScope.isLoggedIn ? loggedInNavItems : loggedOutNavItems;
        }
    );
    $scope.toggleActive = false;

    $scope.handleToggle = function(action = '') {
        $scope.toggleActive = (action === 'close') ? false : !$scope.toggleActive;
    }
    $scope.isActiveLink = function(currentState) {
        return currentState === $state.current.name;
    };
    $scope.handleBack = function() {
        history.back();
    };
    $scope.handleLogout = function() {
        $scope.handleToggle('close');
        Auth.logout();
    };
};
