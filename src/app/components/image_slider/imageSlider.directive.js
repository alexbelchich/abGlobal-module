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
        vm.slider = {
            value: $scope.sliderValue || 0,
            options: {
                floor: $scope.sliderFloor || -500,
                ceil: $scope.sliderCeil || 500,
                step: $scope.sliderStep || 1
            }
        };

        $scope.$watch(function () {
                return vm.slider.value
            },
            function (value) {
                setModelValue(value);
            }
        );

        vm.zoom = function () {
            var minSize = vm.getMinSize();
            var maxSize = vm.getMaxSize();
            var a = (maxSize - minSize) / vm.slider.options.ceil;
            var zoom = (Math.abs(vm.slider.value) * a);

            if (vm.slider.value > 0) {
                return {
                    first: vm.changeSize(minSize, 0),
                    second: vm.changeSize(minSize, zoom)
                }
            }
            if (vm.slider.value < 0) {
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

        vm.getMaxSize = function () {
            return parseInt(0.3 * angular.element('body').width());
        };

        vm.getMinSize = function () {
            return parseInt(0.2 * angular.element('body').width());
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