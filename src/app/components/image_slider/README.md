# Horizontal double image slider directive

Directive includes two images and horizontal slider.

Images will change its size with changing of slider value.

Original angularjs-slider library you can see [here](https://github.com/angular-slider/angularjs-slider).


## Installation

**1. Install angularjs-slider**

```
$ bower install --save angularjs-slider
```

**2. Add to your module**

```
angular.module('yourApp', ['rzModule']);
```

## Usage

Put <image-slider> tag to your html:

```
<image-slider model="controller.sliderValue"
              slider-value="0"
              slider-floor="-500"
              slider-ceil="500"
              slider-step="1"
              first-image="{{controller.pathToImage}}"
              second-image="assets/images/123.png"
              circle-images="true">
</image-slider>
```

Get vm.sliderValue in your controller to receive slider value.

## Directive attributes

**model** - Return slider value to your controller

**slider-value** - Number. Start slider value. Defaults to 0

**slider-floor** - Number. Minimum value for a slider. Defaults to -500

**slider-ceil** - Number. Maximum value for a slider. Defaults to 500

**slider-step** - Number. Step for a slider. Defaults to 1

**first-image** - Path to first image. You can put something like that: first-image='assets/images/my_image.png' or first-image='{{valueFromController}}'

**second-image** - Path to second image

**circle-images** - Boolean. Set true if you need to display circle images. Defaults to false


