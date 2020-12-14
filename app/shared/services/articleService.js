/**
 * @param {Object} $http AngularJS http
 * @param {Object} $state UI Router State
 * @param {Object} $rootScope AngularJS Root Scope
 * @param {Object} Toast Object for Toast Service
 * @param {Object} TOAST_CONSTANTS Constants for toast services
 * @param {Object} API_CONSTANTS Constants for api
 * @return {Object} article Object for Article Service
 */
export default function articleService($http, $state, $rootScope, Toast, TOAST_CONSTANTS, API_CONSTANTS) {
    let article = {};

    article.postArticle = function(articleData) {
        $http
            .post(API_CONSTANTS.ARTICLES_API, {
                ...articleData,
                author: $rootScope.user.username,
            })
            .then(function({data}) {
                Toast.setToast(TOAST_CONSTANTS.SUCCESS, 'Article Posted Successfully');
                $state.go('ArticleDetail', {
                    articleId: data.id,
                });
            })
            .catch(function() {
                Toast.setToast(TOAST_CONSTANTS.ERROR, API_CONSTANTS.DEFAULT_ERROR_MESSAGE);
            })
    }

    article.getArticle = function(articleId) {
        // send back the promise directly
        return $http.get(`${API_CONSTANTS.ARTICLES_API}/${articleId}`);
    }

    article.deleteArticle = function(articleId) {
        $http.delete(`${API_CONSTANTS.ARTICLES_API}/${articleId}`)
            .then(function() {
                Toast.setToast(TOAST_CONSTANTS.SUCCESS, 'Article Deleted Successfully');
                $state.go('Home');
            })
            .catch(function() {
                Toast.setToast(TOAST_CONSTANTS.ERROR, API_CONSTANTS.DEFAULT_ERROR_MESSAGE);
            });
    }

    return article;
};
