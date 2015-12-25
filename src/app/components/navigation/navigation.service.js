(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .service('NavigationService', NavigationService);

    /** @ngInject */
    function NavigationService($state, $rootScope, NavigationProvider, DiscoveryService, ObservationsService) {
        var vm = this;

        vm.init = function () {
            vm.currentScreen = -1;
            vm.screensCount = NavigationProvider.getScreensList().length;
            var nextListener = $rootScope.$on('showNextScreen', vm.showNextScreen);
            var prevListener = $rootScope.$on('showPreviousScreen', vm.showPreviousScreen);
            var initListener = $rootScope.$on('discoveryAPIInitialized', function () {
                if (vm.currentScreen < 0) {
                    vm.showNextScreen();
                }
            });
            $rootScope.$on('$destroy', function () {
                nextListener();
                prevListener();
                initListener();
            });
        };

        vm.showNextScreen = function () {
            if (vm.currentScreen >= vm.screensCount) {
                return;
            }

            if (vm.currentScreen >= 0) {
                var currentScreen = NavigationProvider.getScreensList()[vm.currentScreen];
                $rootScope.$broadcast('willDisplayNextScreen', currentScreen.name);
                var progress = 100 * (vm.currentScreen + 1) / vm.screensCount;
                DiscoveryService.finishedScreen(progress);
            }

            vm.currentScreen++;
            if (vm.currentScreen < vm.screensCount) {
                var newScreen = NavigationProvider.getScreensList()[vm.currentScreen];
                showScreen(newScreen);
            }
            else {
                var observations = ObservationsService.getObservations();
                var metas = ObservationsService.getMetaData();
                var applicant = ObservationsService.getApplicantData();
                var state = ObservationsService.getStateValues();
                DiscoveryService.finishedModule(observations, metas, applicant, state);
            }
        };

        vm.showPreviousScreen = function () {
            if (vm.currentScreen === 0) {
                return;
            }

            if (vm.currentScreen > 0) {
                var progress = 100 * (vm.currentScreen - 1) / vm.screensCount;
                DiscoveryService.finishedScreen(progress);
            }

            vm.currentScreen--;
            var screen = NavigationProvider.getScreensList()[vm.currentScreen];
            showScreen(screen);
        };

        function showScreen(screen) {
            if (!screen.name) {
                throw new Error('No screen name');
            }
            $state.go(screen.name).then(function () {
                var navigationConfig = {};
                if (typeof(screen.showNextButton) === 'boolean') {
                    navigationConfig.showNextButton = screen.showNextButton;
                }
                if (typeof(screen.showBackButton) === 'boolean') {
                    navigationConfig.showBackButton = screen.showBackButton;
                }
                if (typeof(screen.hideTitle) === 'boolean') {
                    navigationConfig.hideTitle = screen.hideTitle;
                }
                if (typeof(screen.hideProgress) === 'boolean') {
                    navigationConfig.hideProgress = screen.hideProgress;
                }
                if (angular.isObject(screen.timer) && screen.timer.time > 0) {
                    navigationConfig.showTimer = true;
                }
                DiscoveryService.loadedScreen(navigationConfig);

                if (angular.isObject(screen.timer) && screen.timer.time > 0) {
                    DiscoveryService.initTimer(
                        screen.timer.time,
                        screen.timer.enableTimeExtension !== false,
                        screen.timer.enableControlButtons !== false
                    ).then(function () {
                            if (screen.timer.autoStart === true) {
                                DiscoveryService.startTimer();
                            }
                    });
                }
            });
        }
    }
})();
