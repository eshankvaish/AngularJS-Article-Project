export default function articleDetailController($scope, $stateParams, Article, API_CONSTANTS, $rootScope) {
    $scope.article = {};
    Article.getArticle($stateParams.articleId)
        .then(function({data}) {
            $scope.article = data;
            // The Authenticated User is author or not
            if ($rootScope.user && data.author === $rootScope.user.username) {
                $scope.isAuthor = true;
            }
        })
        .catch(function() {
            $scope.article.error = API_CONSTANTS.DEFAULT_ERROR_MESSAGE;
        });

    $scope.handleDelete = function() {
        // Check for Authorized User
        if ($scope.article.author === $rootScope.user.username) {
            // Call Article Delete Service
            Article.deleteArticle($scope.article.id);
        } else {
            $scope.article.error = 'You are not Authorized to perform this action';
        }
    }

}
