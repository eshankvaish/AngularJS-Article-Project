export default function navbarDirective() {
    return {
        restrict: 'E',
        templateUrl: 'app/modules/navbar/navbar.html',
        replace: true,
        controller: 'navbarController',
    }
};
