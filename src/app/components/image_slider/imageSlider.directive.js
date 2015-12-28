(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .directive('imageSlider', ImageSliderDirective);

    /** @ngInject */
    function ImageSliderDirective () {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                firstImage: '@',
                secondImage: '@',
                circleImages: '=',
                sliderValue: '=',
                sliderFloor: '=',
                sliderCeil: '=',
                sliderStep:'='
            },
            templateUrl: 'app/components/image_slider/imageSlider.html',
            controller: ImageSliderController,
            controllerAs: 'imageSlider',
            link: function (scope, element) {
                if (scope.circleImages) {
                    element.find('img').addClass('image-circle');
                }
            }
        };
    }

    /** @ngInject */
    function ImageSliderController ($scope) {
        var vm = this;
        vm.src = {
            first: $scope.firstImage,
            second: $scope.secondImage
        };
        vm.defaultSlider = {
            value: 0,
            options: {
                step: 1,
                floor: -500,
                ceil: 500
            },
            center: 0
        };

        vm.initSlider = function (val, defaultVal) {
            if (angular.isDefined(val) && angular.isNumber(val)) {
                return val;
            }
            return defaultVal;
        };

        vm.slider = {
            value: vm.initSlider($scope.sliderValue, vm.defaultSlider.value),
            options: {
                floor: vm.initSlider($scope.sliderFloor, vm.defaultSlider.options.floor),
                ceil: vm.initSlider($scope.sliderCeil, vm.defaultSlider.options.ceil),
                step: vm.initSlider($scope.sliderStep, vm.defaultSlider.options.step)
            }
        };

        vm.checkStartValue = function (slider) {
            var tmpCenter = Math.round((slider.options.ceil - Math.abs(slider.options.floor)) / 2);
            if (slider.value !== tmpCenter) slider.value = tmpCenter;
            vm.slider.center = slider.value;
        };

        vm.checkStartValue(vm.slider);

        $scope.$watch(function () {
                return vm.slider.value
            },
            function (value) {
                setModelValue(value);
            }
        );

        vm.getMaxSize = function () {
            return parseInt(0.3 * angular.element('body').width());
        };

        vm.getMinSize = function () {
            return parseInt(0.2 * angular.element('body').width());
        };

        vm.zoom = function () {
            var minSize = vm.getMinSize();
            var maxSize = vm.getMaxSize();
            var a = (maxSize - minSize) / (vm.slider.options.ceil - vm.slider.options.floor);
            var zoom = (Math.abs(vm.slider.center - vm.slider.value) * a);

            if (vm.slider.value > vm.slider.center) {
                return {
                    first: vm.changeSize(minSize, 0),
                    second: vm.changeSize(minSize, zoom)
                }
            }
            if (vm.slider.value < vm.slider.center) {
                return {
                    first: vm.changeSize(minSize, zoom),
                    second: vm.changeSize(minSize, 0)
                }
            }
            return {
                first: vm.changeSize(minSize, 0),
                second: vm.changeSize(minSize, 0)
            }
        };

        vm.changeSize = function (min, val) {
            return {
                'width': min + val + 'px',
                'height': min + val + 'px',
                'padding-bottom': min + val + 'px'
            }
        };

        vm.setContainerSize = function () {
            return parseInt(vm.getMaxSize() + 50);
        };

        function setModelValue (value) {
            if (!angular.isObject($scope.model)) {
                $scope.model = {};
            }
            $scope.model = value;
        }
    }

})();