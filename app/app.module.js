import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './app.routes';
import navbarController from './scripts/controllers/directivesController/navbarController';
import navbarDirective from './scripts/directives/navbar';
import './styles/index.scss';


const app = angular.module('articleApp', ['ui.router']).config(['$stateProvider', routes]);

app.controller('navbarController', ['$scope', '$location', navbarController]);
app.directive('navbar', [navbarDirective]);



