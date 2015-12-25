(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope, DiscoveryService, NavigationService) {
        $log.debug('runBlock end');

        NavigationService.init();
        DiscoveryService.init();

        var listener = $rootScope.$on('$viewContentLoaded', function() {
            DiscoveryService.changedView();
        });
        $rootScope.$on('$destroy', function () {
            listener();
        });
    }

})();
