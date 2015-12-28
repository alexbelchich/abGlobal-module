(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('IntroController', IntroController);

    /** @ngInject */
    function IntroController($scope, NavigationService, ObservationsService, $interval, one_second) {
        var vm = this;
        vm.screenName = 'introScreen';
        vm.timeelapsed = 0;
        vm.maxTime = 15;

        var listener = $scope.$on('willDisplayNextScreen', function () {
            vm.storeAdditionalData();
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

        vm.storeAdditionalData = function () {
            vm.timeelapsed *= one_second;
            ObservationsService.addMetaData('metas.timeElapsed', vm.timeelapsed);
            ObservationsService.addObservations('intro_abGlobal.timeElapsed', vm.timeelapsed);
        };
    }
})();
