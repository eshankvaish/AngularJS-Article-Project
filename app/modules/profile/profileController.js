export default function profileController($scope, $rootScope, Auth, Toast, TOAST_CONSTANTS, API_CONSTANTS) {
    // User Details
    $scope.user = $rootScope.user;
    $scope.showPasswordForm = false; // Initally False
    $scope.passwordError = '';
    // Input Fields
    $scope.inputFields = {
        currentPassword: {
            id: 'current-password',
            name: 'currentPassword',
            label: 'Current Password',
            type: 'password',
            placeholder: 'Enter Current Password',
            value: '',
        },
        newPassword: {
            id: 'new-password',
            name: 'newPassword',
            label: 'New Password',
            type: 'password',
            placeholder: 'Enter New Password',
            value: '',
        },
    };
    // Show Password Form on button click
    $scope.handleClick = function() {
        $scope.showPasswordForm = !$scope.showPasswordForm;
    };

    $scope.handleSubmit = function() {
        let password = {
            currentPassword: $scope.inputFields.currentPassword.value,
            newPassword: $scope.inputFields.newPassword.value,
        };
        $scope.passwordError = '';
        Auth.getUserDetails($scope.user.username)
            .then(function({data}) {
                // check for current password
                if (data[0].password === password.currentPassword) {
                    Auth.updateUserDetails(data[0], {
                        password: password.newPassword,
                    })
                        .then(function() {
                            // Success
                            Toast.setToast(TOAST_CONSTANTS.SUCCESS, 'Password Changed Successfully');
                            $scope.showPasswordForm = false;
                        })
                        .catch(function() {
                            Toast.setToast(TOAST_CONSTANTS.ERROR, API_CONSTANTS.DEFAULT_ERROR_MESSAGE);
                            $scope.showPasswordForm = true;
                        });
                } else {
                    $scope.passwordError = 'Invalid Current Password';
                }
            })
            .catch(function() {
                Toast.setToast(TOAST_CONSTANTS.ERROR, API_CONSTANTS.DEFAULT_ERROR_MESSAGE);
                $scope.showPasswordForm = true;
            });
    };
}
