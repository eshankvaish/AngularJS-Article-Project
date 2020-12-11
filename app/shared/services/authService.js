import modifyLocalStorageItem from "../../utils/modifyLocalStorage";

/**
 * @param {Object} $http AngularJS service
 * @param {Object} $state UI Router State
 * @param {Object} $rootScope AngularJS Global Scope
 * @param {Object} Toast Object from Toast Service
 * @param {Object} TOAST_CONSTANTS Object of Toast constants and messages
 * @param {Object} API_CONSTANTS Object of API Constants and messages
 * @return {Object} auth Object with Authentication Methods like registerUser, logout etc.
 */
export default function authService($http, $state, $rootScope, Toast, TOAST_CONSTANTS, API_CONSTANTS) {
    let auth = {};
    // Check if user is already logged in
    $rootScope.user = modifyLocalStorageItem('get', 'user');
    $rootScope.isLoggedIn = $rootScope.user ? true : false;

    auth.createAccount = function(userData) {
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
                Toast.setToast(TOAST_CONSTANTS.ERROR, API_CONSTANTS.DEFAULT_ERROR_MESSAGE);
            });
    }

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
                    auth.createAccount(userData);
                }
            })
            .catch(function() {
                Toast.setToast(TOAST_CONSTANTS.ERROR, API_CONSTANTS.DEFAULT_ERROR_MESSAGE);
            });
    };

    auth.logout = function() {
        modifyLocalStorageItem('remove', 'user');
        $rootScope.user = null;
        $rootScope.isLoggedIn = false;
        Toast.setToast(TOAST_CONSTANTS.INFO, 'You have been Logged Out Successfully')
        $state.go('Signin')
    };

    return auth;
};
