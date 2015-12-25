(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .directive('datePicker', DatePickerDirective);

    /** @ngInject */
    function DatePickerDirective() {
        return {
            restrict: 'E',
            scope: {
                minYear: '=',
                maxYear: '=',
                model: '=',
                control: '=',
                validHandler: '='
            },
            templateUrl: 'app/components/date_picker/datePicker.html',
            controller: DatePickerController,
            controllerAs: 'datePicker',
            link: function (scope, element, attrs, controller) {
                if (scope.control) {
                    scope.control.validate = controller.validate;
                    scope.control.invalidDay = function (invalid) {
                        controller.invalidDay = invalid;
                    };
                    scope.control.invalidMonth = function (invalid) {
                        controller.invalidMonth = invalid;
                    };
                    scope.control.invalidYear = function (invalid) {
                        controller.invalidYear = invalid;
                    };
                }
            }
        };

        /** @ngInject */
        function DatePickerController($scope) {
            var vm = this;

            if (!$scope.minYear) {
                $scope.minYear = 1900;
            }

            if (!$scope.maxYear) {
                $scope.maxYear = new Date().getFullYear();
            }

            vm.monthsString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            vm.dayTouched = false;
            vm.monthTouched = false;
            vm.yearTouched = false;

            vm.wasValidate = false;

            $scope.$watch(function () {
                    return vm.day
                },
                function (newDay) {
                    setModelValue('day', newDay);
                    updateValidationStatus();
                }
            );

            $scope.$watch(function () {
                    return vm.month;
                },
                function (newMonth) {
                    setModelValue('month', newMonth);
                    updateValidationStatus();
                }
            );

            $scope.$watch(function () {
                    return vm.year
                },
                function (newYear) {
                    setModelValue('year', newYear);
                    updateValidationStatus();
                }
            );

            function setModelValue(key, value) {
                if (!angular.isObject($scope.model)) {
                    $scope.model = {};
                }
                $scope.model[key] = value;
            }

            function updateValidationStatus () {
                if (angular.isFunction($scope.validHandler)) {
                    $scope.validHandler(
                        !(vm.dayTouched || vm.wasValidate) || (angular.isDefined(vm.day) && vm.day !== ''),
                        !(vm.monthTouched || vm.wasValidate) || (angular.isDefined(vm.month) && vm.month !== ''),
                        !(vm.yearTouched || vm.wasValidate) || (angular.isDefined(vm.year)&& vm.year !== '')
                    )
                }
            }

            vm.range = function(min, max, step){
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            };

            vm.revRange = function(min, max, step){
                step = step || -1;
                var input = [];
                for (var i = max; i >= min; i += step) {
                    input.push(i);
                }
                return input;
            };

            vm.validate = function () {
                vm.wasValidate = true;
                updateValidationStatus();
            };

            vm.focused = function (field) {
                switch (field) {
                    case 'day':
                        vm.dayTouched = true;
                        break;
                    case 'month':
                        vm.monthTouched = true;
                        break;
                    case 'year':
                        vm.yearTouched = true;
                        break;
                    default:
                        break;
                }
                updateValidationStatus();
            };
        }
    }
})();
