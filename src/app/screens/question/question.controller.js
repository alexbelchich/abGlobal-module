(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('QuestionController', QuestionController);

    /** @ngInject */
    function QuestionController(data, $scope, ObservationsService, TimerService) {
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
            TimerService.getTimerTime().then(function (time) {
                ObservationsService.addObservations(vm.type + '.timeElapsed', time);
                ObservationsService.addObservations(vm.type + '.responseValue', vm.sliderValue);
                ObservationsService.addObservations(vm.type + '_idu', (vm.idu) ? 1 : 0);
                ObservationsService.addObservations(vm.type + 'Metadata', {});
            });
        };
    }
})();
