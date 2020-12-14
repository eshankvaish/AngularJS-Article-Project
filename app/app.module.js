import angular from 'angular';
import uirouter from 'angular-ui-router';
import uiRouterStateEvents from 'ng-ui-router-state-events';

import { routes, authRoutes } from './app.config';
import { API_CONSTANTS, TOAST_CONSTANTS } from './constants';
import articleDetailController from './modules/articleDetail/articleDetailController';
import createArticleController from './modules/createArticle/createArticleController';
import logoutController from './modules/logout/logoutController';
import navbarController from './modules/navbar/navbarController';
import signupController from './modules/signup/signupController';
import signinController from './modules/signin/signinController';
import profileController from './modules/profile/profileController';
import toastController from './modules/toast/toastController';
import navbarDirective from './modules/navbar/directive/navbar';
import toastDirective from './modules/toast/directive/toast';
import articleService from './shared/services/articleService';
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
app.factory('Article', ['$http', '$state', '$rootScope', 'Toast', 'TOAST_CONSTANTS', 'API_CONSTANTS', articleService]);
app.controller('toastController', ['$scope', 'Toast', toastController])
app.controller('navbarController', ['$scope', '$state', '$rootScope', navbarController]);
app.controller('signupController', ['$scope', 'Auth', signupController]);
app.controller('signinController', ['$scope', 'Auth', signinController]);
app.controller('logoutController', logoutController);
app.controller('createArticleController', ['$scope', '$state', 'Article', createArticleController]);
app.controller('articleDetailController', ['$scope', '$state', '$stateParams', 'Article', 'API_CONSTANTS', '$rootScope', articleDetailController]);
app.controller('profileController', ['$scope', '$rootScope', 'Auth', 'Toast', 'TOAST_CONSTANTS', 'API_CONSTANTS', profileController]);
app.directive('navbar', [navbarDirective]);
app.directive('toast', ['Toast', toastDirective]);

app.run([
    '$rootScope',
    '$transitions',
    '$state',
    'Toast',
    'TOAST_CONSTANTS',
    'Auth',
    authRoutes,
]);
