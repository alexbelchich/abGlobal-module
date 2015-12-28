(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .service('ModuleTimerService', ModuleTimerService);

    /** @ngInject */
    function ModuleTimerService ($rootScope, $interval) {
        var vm = this;
        vm.timeelapsed = 0;
        vm.second = 1000;

        vm.startTimer = function () {
            vm.interval = $interval(function () {
                ++vm.timeelapsed;
            }, vm.second);
        };

        vm.stopTimer = function () {
            $interval.cancel(vm.interval);
            vm.interval = undefined;
        };

        vm.getFullTime = function () {
            vm.stopTimer();
            return (vm.timeelapsed * vm.second);
        };

        $rootScope.$on('$destroy', function () {
            vm.stopTimer();
        });
    }
})();
