(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .controller('Screen1Controller', Screen1Controller);

    /** @ngInject */
    function Screen1Controller($window, $scope, $timeout, $log, ObservationsService, NavigationService, DiscoveryService, TimerService) {
        var vm = this;
        vm.screenName = 'screen1';

        var displayListener = $scope.$on('willDisplayNextScreen', function () {
            vm.storeObservations();
        });
        var startListener = $scope.$on('startedTimer', function () {
            $log.debug('Started timer');
        });
        var pauseListener = $scope.$on('pausedTimer', function () {
            $log.debug('Paused timer');
        });
        var finishedListener = $scope.$on('finishedTimer', function () {
            $log.debug('Finished timer');
        });
        $scope.$on('$destroy', function () {
            displayListener();
            startListener();
            pauseListener();
            finishedListener();
        });

        vm.form = {
        };

        $scope.$watch(function () {
            $timeout(function() {
                DiscoveryService.resizedContent();
            }, 0, false);
        });

        vm.invalidFields = [];

        vm.storeObservations = function () {
            var observations = {
                name: vm.form.name,
                surname: vm.form.surname,
                idNumber: vm.form.idNumber,
                occupation: vm.form.occupation,
                gender: vm.form.gender,
                birthDate: vm.form.birthDate,
                address: vm.form.address,
                city: vm.form.city
            };
            ObservationsService.addObservations('screen1', observations);

            ObservationsService.addApplicantData('firstName', vm.form.name);
            ObservationsService.addApplicantData('lastName', vm.form.surname);
        };

        vm.dateValidator = {};
        vm.dateValid = true;

        vm.submitForm = function () {
            vm.invalidFields = [];
            vm.submitted = true;
            vm.dateValidator.validate();

            var values = vm.form;
            if (!values.name) {
                vm.invalidFields.push("Name");
            }
            if (!values.surname) {
                vm.invalidFields.push("Surname");
            }
            if (!values.idNumber) {
                vm.invalidFields.push("ID number");
            }
            if (!values.occupation) {
                vm.invalidFields.push("Occupation");
            }
            if (!values.gender) {
                vm.invalidFields.push("Gender");
            }
            if (!values.birthDate.day || !values.birthDate.month || !values.birthDate.year) {
                vm.invalidFields.push("Date of birth");
            }
            if (!values.address) {
                vm.invalidFields.push("Address");
            }
            if (!values.city) {
                vm.invalidFields.push("City");
            }

            if (vm.invalidFields.length === 0) {
                TimerService.getTimerTime().then(function (time) {
                    $log.debug('Screen time: ' + time + 'ms');
                    NavigationService.showNextScreen();
                });
            }
            else {
                $window.scrollTo(0, 0);
            }
        };

        vm.focus = function (id) {
            angular.element(id).focus();
        };

        vm.formValid = function () {
            var values = vm.form;

            return values.name && values.surname && values.idNumber && values.occupation && values.gender && values.address &&
                    values.city && values.birthDate.day && values.birthDate.month && values.birthDate.year;
        };

        vm.dateValidHandler = function (day, month, year) {
            vm.dateValid = day && month && year;
        };
    }
})();
