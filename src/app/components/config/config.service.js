(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .service('ConfigService', ConfigService);

    /** @ngInject */
    function ConfigService($rootScope) {
        var vm = this;

        var listener = $rootScope.$on('languageChanged', function (event, lang) {
            vm.locale = lang;
        });
        $rootScope.$on('$destroy', function () {
            listener();
        });

        vm.setupConfig = function (config) {
            if (!angular.isObject(config)) {
                return;
            }

            var journey = config.applicantJourney;
            if (journey) {
                vm.applicantJourney = {
                    key: journey.key,
                    version: journey.version
                };

                if (journey.step) {
                    vm.step = {
                        moduleKey: journey.step.moduleKey,
                        title: journey.step.title,
                        ordinal: journey.step.ordinal
                    };

                    vm.locale = journey.step.locale;
                }
            }

            vm.applicant = config.applicant;
            vm.lender = config.lender;
            vm.loanOfficer = config.loanOfficer;
            vm.unparsedConfig = config;
        };
    }
})();
