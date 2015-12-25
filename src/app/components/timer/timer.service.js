(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .service('TimerService', TimerService);

    /** @ngInject */
    function TimerService(DiscoveryService) {
        var vm = this;

        vm.initTimer = function (time, enableTimeExtension, enableControl) {
            return DiscoveryService.initTimer(time, enableTimeExtension, enableControl);
        };

        vm.startTimer = function () {
            DiscoveryService.startTimer();
        };

        vm.pauseTimer = function () {
            DiscoveryService.pauseTimer();
        };

        vm.getTimerTime = function () {
            return DiscoveryService.getTimerTime();
        };
    }
})();
