(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('Screen2Controller', Screen2Controller);

    /** @ngInject */
    function Screen2Controller($scope, NavigationService, ObservationsService) {
        var vm = this;
        vm.screenName = 'screen2';

        var listener = $scope.$on('willDisplayNextScreen', function () {
            vm.storeAdditionalData();
        });
        $scope.$on('$destroy', function () {
            listener();
        });

        vm.backAction = function () {
            NavigationService.showPreviousScreen();
        };

        vm.storeAdditionalData = function () {
            ObservationsService.addMetaData('meta1.part1', 'meta value 1');
            ObservationsService.addMetaData('meta1.part2', 'meta value 2');
            ObservationsService.addStateValue('state1', 'state value 1');
        };
    }
})();
