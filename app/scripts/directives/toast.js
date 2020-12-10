export default function toastDirective(Toast) {
    return {
        restrict: 'E',
        templateUrl: 'app/views/toast.html',
        replace: true,
        controller: function($scope, Toast) {
            $scope.toast = Toast;
        },
    }
}
