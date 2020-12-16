export default function passwordsMatchDirective() {
    // Directive for matching passwords
    return {
        restrict: 'A',
        scope: {
            matchTarget: '=',
        },
        require: 'ngModel',
        link: function link($scope, elem, attrs, ctrl) {
            let validator = function(value) {
                ctrl.$setValidity('match', value === $scope.matchTarget);
                return value;
            }
            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);

            // Check for changes in password field
            $scope.$watch(function() {
                return $scope.matchTarget;
            }, function() {
                validator(ctrl.$viewValue);
            });
        }
    };
};
