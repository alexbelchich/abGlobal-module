(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('IntroController', IntroController);

    /** @ngInject */
    function IntroController($scope, NavigationService, ObservationsService, $interval, one_second, $log) {
        var vm = this;
        vm.screenName = 'introScreen';
        vm.timeelapsed = 0;
        vm.maxTime = 15;

        var listener = $scope.$on('willDisplayNextScreen', function () {
            $log.info('vm.timeelapsed: ', vm.timeelapsed);
//            vm.storeAdditionalData();
        });

        vm.interval = $interval(function () {
            if (vm.timeelapsed < vm.maxTime) {
                return ++vm.timeelapsed;
            }
            return vm.clearInterval();
        }, one_second);

        vm.clearInterval = function () {
            $interval.cancel(vm.interval);
            vm.interval = undefined;
            vm.nextScreen();
        };

        $scope.$on('$destroy', function () {
            listener();
            vm.clearInterval();
        });

        vm.nextScreen = function () {
            NavigationService.showNextScreen();
        };

//        vm.storeAdditionalData = function () {
//            ObservationsService.addMetaData('meta1.part1', 'meta value 1');
//            ObservationsService.addMetaData('meta1.part2', 'meta value 2');
//            ObservationsService.addStateValue('state1', 'state value 1');
//        };
    }
})();
