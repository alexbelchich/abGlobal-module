(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('DoneController', DoneController);

    /** @ngInject */
    function DoneController($scope, NavigationService, ObservationsService, DiscoveryService) {
        var vm = this;
        var listener = $scope.$on('willDisplayNextScreen', function () {
            vm.finishModule();
        });

        $scope.$on('$destroy', function () {
            listener();
        });

        vm.backAction = function () {
            NavigationService.showPreviousScreen();
        };

        vm.finishModule = function () {
            var observations = ObservationsService.getObservations(),
                metas = ObservationsService.getMetaData(),
                applicant = ObservationsService.getApplicantData(),
                state = ObservationsService.getStateValues();

            DiscoveryService.finishedModule(observations, metas, applicant, state);
        };
    }
})();
