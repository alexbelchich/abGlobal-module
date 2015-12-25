(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .provider('NavigationProvider', NavigationProvider);

    /** @ngInject */
    function NavigationProvider() {
        var screensList = [];

        this.setScreensList = function (screens) {
            screensList = screens;
        };

        this.$get = function() {
            return {
                getScreensList: function() {
                    return screensList;
                }
            };
        };
    }
})();
