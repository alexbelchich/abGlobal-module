(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .service('ObservationsService', ObservationsService);

    /** @ngInject */
    function ObservationsService() {
        var vm = this;
        var observations = {};
        var metas = {};
        var applicant = {};
        var state = {};

        vm.addObservations = function (key, value) {
            storeValue(observations, key, value);
        };

        vm.getObservations = function () {
            return observations;
        };

        vm.addMetaData = function (key, value) {
            storeValue(metas, key, value);
        };

        vm.getMetaData = function () {
            return metas;
        };

        vm.addApplicantData = function (key, value) {
            storeValue(applicant, key, value);
        };

        vm.getApplicantData = function () {
            return applicant;
        };

        vm.addStateValue = function (key, value) {
            storeValue(state, key, value);
        };

        vm.getStateValues = function () {
            return state;
        };

        function storeValue(object, key, value) {
            var tmp = object;
            var keys = key.split(/\./);
            for (var i = 0; i < keys.length - 1; i++) {
                if (angular.isObject(tmp[keys[i]])) {
                    tmp = tmp[keys[i]];
                }
                else {
                    tmp[keys[i]] = {};
                    tmp = tmp[keys[i]];
                }
            }
            tmp[keys[keys.length - 1]] = value;
        }
    }
})();
