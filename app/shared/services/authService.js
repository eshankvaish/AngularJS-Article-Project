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
    auth.getUser = function() {
        $rootScope.user = modifyLocalStorageItem('get', 'user');
        $rootScope.isLoggedIn = $rootScope.user ? true : false;
    };

    auth.setUser = function(user) {
        modifyLocalStorageItem('set', 'user', user);
        $rootScope.user = user;
    };

    auth.createAccount = function(userData) {
        $http
            .post(API_CONSTANTS.USERS_API, userData)
            .then(function() {
                $rootScope.isLoggedIn = true;
                Toast.setToast(TOAST_CONSTANTS.SUCCESS, 'Congrats, Signup Successful!');
                // Update Local Storage
                auth.setUser({
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

    auth.login = function(userData) {
        $http
            .get(`${API_CONSTANTS.USERS_API}?username=${userData.username}`)
            .then(function({data}) {
                if (data.length === 0) {
                    // User Doesn't Exist
                    Toast.setToast(TOAST_CONSTANTS.ERROR, 'Account does not exist, Please try again');
                } else {
                    // Validate user
                    if (data[0].password === userData.password) {
                        $rootScope.isLoggedIn = true;
                        Toast.setToast(TOAST_CONSTANTS.SUCCESS, 'Welcome Back! Login Successful!');
                        // Update Local Storage
                        auth.setUser({
                            username: userData.username,
                            email: data[0].email,
                        });
                        $state.go('Home');
                    } else {
                        Toast.setToast(TOAST_CONSTANTS.ERROR, 'Please enter correct password');
                    }
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
    // Get user details using Username
    auth.getUserDetails = function(username) {
        return $http.get(`${API_CONSTANTS.USERS_API}?username=${username}`);
    };
    // Update User Password
    auth.updateUserDetails = function(userData, newUserData) {
        return $http.put(`${API_CONSTANTS.USERS_API}/${userData.id}`, {
            ...userData,
            ...newUserData,
        });
    };

    return auth;
};
