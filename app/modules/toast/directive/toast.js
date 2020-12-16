export default function toastDirective(Toast) {
    return {
        restrict: 'E',
        templateUrl: 'app/modules/toast/toast.html',
        replace: true,
        controller: 'toastController',
    }
}
