export default function createArticleController($scope, $state, Article) {
    $scope.article = {
        title: '',
        description: '',
        tags: ''
    }

    $scope.handleSubmit = function() {
        if ($scope.article.tags != '') {
            $scope.article.tags = $scope.article.tags.split(',');
        }
        Article.postArticle($scope.article);
    }
}
