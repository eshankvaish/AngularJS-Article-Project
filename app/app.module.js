import angular from 'angular';
import uirouter from 'angular-ui-router';
import uiRouterStateEvents from 'ng-ui-router-state-events';

import { routes, authRoutes } from './app.config';
import { API_CONSTANTS, TOAST_CONSTANTS } from './constants';
import logoutController from './modules/logout/logoutController';
import navbarController from './modules/navbar/navbarController';
import signupController from './modules/signup/signupController';
import toastController from './modules/toast/toastController';
import navbarDirective from './modules/navbar/directive/navbar';
import toastDirective from './modules/toast/directive/toast';
import authService from './shared/services/authService';
import toastService from './shared/services/toastService';
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
app.controller('toastController', ['$scope', 'Toast', toastController])
app.controller('navbarController', ['$scope', '$state', '$rootScope', navbarController]);
app.controller('signupController', ['$scope', 'Auth', signupController]);
app.controller('siginController', ['$scope', 'Auth', siginController]);
app.controller('logoutController', logoutController);
app.directive('navbar', [navbarDirective]);
app.directive('toast', ['Toast', toastDirective]);

app.run([
    '$rootScope',
    '$transitions',
    '$state',
    'Toast',
    'TOAST_CONSTANTS',
    authRoutes,
]);
