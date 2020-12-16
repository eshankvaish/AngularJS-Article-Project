export default function signupController($scope, Auth) {
    // Variable for inputFields
    $scope.inputFields = {
        username: {
            id: 'username',
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Enter Username',
            value: '',
        },
        email: {
            id: 'email',
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Enter Email',
            value: '',
        },
        password: {
            id: 'password',
            name: 'password',
            label: 'Password',
            type: 'password',
            placeholder: 'Enter Password',
            value: '',
        },
    };
    $scope.showConfirmPassword = true;
    // For heading
    $scope.heading = 'Sign Up';

    $scope.handleSubmit = function() {
        const { username, email, password, confirmPassword } = $scope.inputFields;
        // Register User
        Auth.registerUser({
            username: username.value,
            email: email.value,
            password: password.value,
        });
    }
}
