export default function homeController($scope, $filter, Article, Toast, TOAST_CONSTANTS) {
    const MAX_ARTICLES_PER_PAGE = 10;

    // Function to update articles and currentPage according to Page Number
    const updateArticles = function(pageNo = $scope.currentPage) {
        $scope.currentPage = pageNo;
        $scope.articles = allArticles.slice(
            (pageNo - 1) * MAX_ARTICLES_PER_PAGE,
            pageNo * MAX_ARTICLES_PER_PAGE
        );
    }
    let allArticles; // To store all articles
    $scope.searchValue = '';
    $scope.currentPage = 1; // current page in Pagination

    // Custom Function for Range
    $scope.range = function(min, max) {
        let res = [];
        for(let i=min; i<=max; i++) {
            res.push(i);
        }
        return res;
    }

    // Fetch Articles
    Article.getArticles()
        .then(function({data}) {
            allArticles = data; // Store all articles
            updateArticles(); // Add articles for first page
            $scope.totalPages = parseInt(data.length / MAX_ARTICLES_PER_PAGE);
        })
        .catch(function() {
            Toast.setToast(TOAST_CONSTANTS.ERROR, TOAST_CONSTANTS.DEFAULT_ERROR_MESSAGE);
        });

    // Change the articles on Page Change
    $scope.handleClick = function(pageNo) {
        updateArticles(pageNo);
    };

    // Filter Articles on Search
    $scope.handleSearch = function() {
        if ($scope.searchValue === '') {
            // back to normal pagination
            updateArticles();
        } else {
            // Filter on the basis of searchValue
            $scope.articles = $filter('filter')(allArticles, $scope.searchValue);
        }
    };

    $scope.isActivePage = function(pageNo) {
        return $scope.currentPage === pageNo;
    };
};
