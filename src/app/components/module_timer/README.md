# Module Timer Service

Service can count full time that user spent on your module.

This timer use angular $interval.

## Service methods

**startTimer** - Should start timer using $interval

**stopTimer** - Should stop timer and clear $interval

**getFullTime** - Should stop timer and return full time in milliseconds


## Usage

1. inject "ModuleTimerService" to your controller;

2. start timer on your first screen "ModuleTimerService.startTimer()";

3. get time from service on your last screen "ModuleTimerService.getFullTime()".
