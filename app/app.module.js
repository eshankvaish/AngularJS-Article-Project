import angular from 'angular';
import uirouter from 'angular-ui-router';
import uiRouterStateEvents from 'ng-ui-router-state-events';

import routes from './app.routes';
import { API_CONSTANTS, TOAST_CONSTANTS } from './constants';
import navbarController from './scripts/controllers/directivesController/navbarController';
import logoutController from './scripts/controllers/logoutController';
import signupController from './scripts/controllers/signupController';
import navbarDirective from './scripts/directives/navbar';
import toastDirective from './scripts/directives/toast';
import authService from './scripts/services/authService';
import toastService from './scripts/services/toastService';
import './styles/index.scss';

const app = angular.module('articleApp', [
        'ui.router',
        'ui.router.state.events',
    ]
);

app.config(['$stateProvider', routes]);
app.constant('API_CONSTANTS', API_CONSTANTS);
app.constant('TOAST_CONSTANTS', TOAST_CONSTANTS);
app.factory('Toast', ['$timeout', 'TOAST_CONSTANTS', toastService]);
app.factory('Auth', ['$http', '$state', '$rootScope', 'Toast', 'TOAST_CONSTANTS', 'API_CONSTANTS', authService]);
app.controller('navbarController', ['$scope', '$location', '$rootScope', navbarController]);
app.controller('signupController', ['$scope', 'Auth', signupController]);
app.controller('logoutController', logoutController);
app.directive('navbar', [navbarDirective]);
app.directive('toast', ['Toast', toastDirective]);

app.run([
    '$rootScope',
    '$transitions',
    '$state',
    'Toast',
    'TOAST_CONSTANTS',
    function($rootScope, $transitions, $state, Toast, TOAST_CONSTANTS) {
        $transitions.onSuccess({}, function($transition) {
            if ($transition.$to().self.requireAuth && !$rootScope.isLoggedIn) {
                Toast.setToast(TOAST_CONSTANTS.INFO, 'Please login to continue!');
                // Change to Signin during Signin part
                $state.go('Signup');
            } else if ($transition.$to().self.onlyNoAuth && $rootScope.isLoggedIn) {
                Toast.setToast(TOAST_CONSTANTS.INFO, 'You are already logged in');
                $state.go('Home');
            }
        }
    );
}])
