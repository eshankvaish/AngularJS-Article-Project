export default function signinController($scope, Auth) {
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
    $scope.heading = 'Sign In';
    $scope.passwordsMatch = true;
    $scope.handleSubmit = function() {
        const { username, password } = $scope.inputFields;
        Auth.login({
            username: username.value,
            password: password.value,
        });
    }
};
