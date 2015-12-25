(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .state('introScreen', {
                url: '/introScreen',
                templateUrl: 'app/screens/intro/intro.html',
                controller: 'IntroController',
                controllerAs: 'intro'
            })
            .state('questionScreen1', {
                url: '/questionScreen1',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(1);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('questionScreen2', {
                url: '/questionScreen2',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(2);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('questionScreen3', {
                url: '/questionScreen3',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(3);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('questionScreen4', {
                url: '/questionScreen4',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(4);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('questionScreen5', {
                url: '/questionScreen5',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(5);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('questionScreen6', {
                url: '/questionScreen6',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(6);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('questionScreen7', {
                url: '/questionScreen7',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(7);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('questionScreen8', {
                url: '/questionScreen8',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(8);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('questionScreen9', {
                url: '/questionScreen9',
                templateUrl: 'app/screens/question/question.html',
                resolve: {
                    data: function () {
                        return questionData(9);
                    }
                },
                controller: 'QuestionController',
                controllerAs: 'question'
            })
            .state('doneScreen', {
                url: '/doneScreen',
                templateUrl: 'app/screens/done/done.html',
                controller: 'DoneController',
                controllerAs: 'done'
            });

        $urlRouterProvider.otherwise('/');
    }

    function questionData (num) {
        return {
            screenName: 'questionScreen' + num,
            type: 'abGlobal0' + num,
            src: {
                first: 'assets/images/question' + num + '-1.png',
                second: 'assets/images/question' + num + '-2.png'
            }
        }
    }

})();
