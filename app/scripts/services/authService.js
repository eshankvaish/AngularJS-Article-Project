import modifyLocalStorageItem from "../../utils/modifyLocalStorage";

export default function authService($http, $state, $rootScope, Toast, TOAST_CONSTANTS, API_CONSTANTS) {
    let auth = {};
    // Check if user is already logged in
    $rootScope.user = modifyLocalStorageItem('get', 'user');
    $rootScope.isLoggedIn = $rootScope.user ? true : false;

    // Register New User
    auth.registerUser = function(userData) {
        $http
            .get(`${API_CONSTANTS.USERS_API}?username=${userData.username}`)
            .then(function({data}) {
                if (data.length === 1) {
                    // User Already Exists
                    Toast.setToast(TOAST_CONSTANTS.INFO, 'Account already exists, Please SignIn to continue');
                } else {
                    // Make New Account
                    $http
                        .post(API_CONSTANTS.USERS_API, userData)
                        .then(function() {
                            $rootScope.isLoggedIn = true;
                            Toast.setToast(TOAST_CONSTANTS.SUCCESS, 'Congrats, Signup Successful!');
                            // Update Local Storage
                            modifyLocalStorageItem('set', 'user', {
                                username: userData.username,
                                email: userData.email,
                            });
                            $state.go('Home');
                        })
                        .catch(function() {
                            Toast.setToast(TOAST_CONSTANTS.ERROR, 'Something went wrong, Try Again');
                        });
                }
            })
            .catch(function() {
                Toast.setToast(TOAST_CONSTANTS.ERROR, 'Something went wrong, Try Again');
            });
    };

    auth.logout = function() {
        modifyLocalStorageItem('remove', 'user');
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;
        Toast.setToast(TOAST_CONSTANTS.INFO, 'You have been Logged Out Successfully')
    };

    return auth;
};
