export default function signinController($scope, Auth) {
    // For input fields in SignIn Form
    $scope.inputFields = {
        username: {
            id: 'username',
            name: 'username',
            label: 'Username',
            type: 'text',
            placeholder: 'Enter Username',
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
    // Heading for Signin Page
    $scope.heading = 'Sign In';
    $scope.passwordsMatch = true;
    $scope.handleSubmit = function() {
        const { username, password } = $scope.inputFields;
        // Authenticate User
        Auth.login({
            username: username.value,
            password: password.value,
        });
    }
};
