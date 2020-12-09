export default function navbarDirective() {
    return {
        restrict: 'E',
        templateUrl: 'app/views/navbar.html',
        replace: true,
        controller: 'navbarController',
    }
};
