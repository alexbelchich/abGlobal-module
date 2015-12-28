(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('IntroController', IntroController);

    /** @ngInject */
    function IntroController($scope, NavigationService, ObservationsService, ModuleTimerService) {
        var vm = this;
        vm.screenName = 'introScreen';
        vm.timeelapsed = 0;
        vm.maxTime = 15;

        ModuleTimerService.startTimer();

        var listener = $scope.$on('willDisplayNextScreen', function () {
            vm.storeAdditionalData();
        });

        $scope.$on('$destroy', function () {
            listener();
        });

        vm.nextScreen = function () {
            NavigationService.showNextScreen();
        };

        vm.storeAdditionalData = function () {
            ObservationsService.addObservations('intro_abGlobal.timeElapsed', vm.timeelapsed);
        };
    }
})();
