(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('QuestionController', QuestionController);

    /** @ngInject */
    function QuestionController(data, $scope, ObservationsService) {
        var vm = this;
        vm.screenName = data.screenName;
        vm.src = data.src;
        vm.type = data.type;
        vm.sliderValue = 0;
        vm.idu = false;

        var listener = $scope.$on('willDisplayNextScreen', function () {
            vm.storeAdditionalData();
        });
        $scope.$on('$destroy', function () {
            listener();
        });

        vm.check = function () {
            vm.idu = !vm.idu;
        };

        vm.storeAdditionalData = function () {
            ObservationsService.addMetaData('meta1.part1', 'meta value 1');
            ObservationsService.addMetaData('meta1.part2', 'meta value 2');
            ObservationsService.addStateValue('state1', 'state value 1');
        };
    }
})();
