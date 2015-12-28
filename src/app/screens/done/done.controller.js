(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('DoneController', DoneController);

    /** @ngInject */
    function DoneController($scope, ObservationsService, DiscoveryService, ModuleTimerService) {
        var vm = this;
        var listener = $scope.$on('willDisplayNextScreen', function () {
            vm.finishModule();
        });

        vm.setModuleTime = function () {
            vm.fullTime = ModuleTimerService.getFullTime();
            ObservationsService.addMetaData('metas.timeElapsed', vm.fullTime);
        };

        vm.setModuleTime();

        $scope.$on('$destroy', function () {
            listener();
        });

        vm.finishModule = function () {
            vm.observations = ObservationsService.getObservations();
            vm.metas = ObservationsService.getMetaData();
            vm.applicant = ObservationsService.getApplicantData();
            vm.state = ObservationsService.getStateValues();

            DiscoveryService.finishedModule(vm.observations, vm.metas, vm.applicant, vm.state);
        };

        vm.changeBg = function () {
            angular.element('body').css('background-color', '#1bd830');
        };

        vm.changeBg();
    }
})();
