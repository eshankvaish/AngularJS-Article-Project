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
        confirmPassword: {
            id: 'confirm-password',
            name: 'confirm-password',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Enter Password Again',
            value: '',
        },
    };
    // For heading
    $scope.heading = 'Sign Up';
    // Passwords Match Check
    $scope.passwordsMatch = true;
    $scope.errorMessage = "Passwords don't match. Try Again.";

    $scope.handleSubmit = function() {
        const { username, email, password, confirmPassword } = $scope.inputFields;
        // Check if passwords match
        if (password.value !== confirmPassword.value) {
            $scope.passwordsMatch = false;
        } else {
            $scope.passwordsMatch = true;
            // Register User
            Auth.registerUser({
                username: username.value,
                email: email.value,
                password: password.value,
            });
        }
    }
}
