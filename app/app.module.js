import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './app.routes';
import './styles/index.scss';

angular.module('articleApp', [uirouter])
    .config(routes);
