# Module template instructions

Module was written using AngularJS framework with [ng-annotate](https://github.com/olov/ng-annotate) library. Project
was created with [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular) so check its documentation
to understand project structure.

If you don't create this module using yeoman generator, remember to run `npm install` and `bower install` at the beginning.
`npm install` copy also `efl-discovery.min.js` to `src/scripts` folder, so if you want to update this library to the newest
version, just run this command.

## Adding screens

You configure screen list in the `src/app/index.config.js` file using navigation provider. You need to call its
`setScreensList` method with the array of the screens configurations object. Each object need to have name attribute.
You can add also additional information about external navigation elements that should be visible. Available optional
fields are:

* showNextButton - set to true to show next button;
* showBackButton - set to true to show back button;
* hideTitle - set to true to hide the module title;
* hideProgress - set to true to hide progress bar;
* timer - if screen should have the timer as value set timer configuration object that could have a following fields:
    * time - initial timer time in milliseconds. It should be greater than 0 to show the timer;
    * enableTimeExtension - set to false to disable displaying time extension modal when time is up (default true);
    * enableControlButtons - set to false to hide play/pause buttons on the timer;
    * autoStart - set to true to start the timer automatically after screen is loaded.

Check `src/app/index.config.js` to see an example.

Template uses [ui-router](https://github.com/angular-ui/ui-router) library for routing and you need to edit `src/app/index.route.js`
file to configure screens. Each screen state should have the same name as you use in the configuration object that you
passed to the navigation provider.

## Events

Discovery service can send four events to inform about some messages from the external libraries:

* discoveryAPIInitialized
* showNextScreen
* showPreviousScreen
* languageChanged (have locale code as an additional parameter)
* initializedTimer
* startedTimer
* pausedTimer
* finishedTimer
* timerTimeResponse (have current time as an additional parameter)

You should register on that events, if you want to get information about them.

## Configuration

You can get configuration values using config service. For example to get applicant data that was passed to the module,
read `ConfigService.applicant` field.

Check `/src/app/components/config/config.service.js` for more details.

## Navigation

To change screen use navigation service. It has two methods: `showNextScreen()` and `showPreviousScreen` that you can use.
See an example in the `src/app/screens/sreen2/screen2.controller.js` file.

## Module return values

Module can return observations, meta data, state values and applicant data that should be updated. You should use
observations service to store these data:
* call `ObservationsService.addObservations(key, value)` method to store observation;
* call `ObservationsService.addMetaData(key, value)` method to store meta deta;
* call `ObservationsService.addApplicationData(key, value)` method to store applicant data;
* call `ObservationsService.addStateValue(key, value)` method to store state value.

If you want to store some nested data (for example: { "key1": { "key2": "value"}}) you can use "key1.key2" as a key.

You can find examples in the `src/app/screens/sreen1/screen1.controller.js` and `src/app/screens/sreen1/screen1.controller.js`
files.

## Timer

To control screen timer use TimerService. Call:

* `TimerService.startTimer()` - to start timer. Timer is started could be started automatically after screen is loaded.
Check "Adding screens" section for more information.
* `TimerService.pauseTimer()` - to pause timer.
* `TimerService.getTimerTime()` - to get current timer time. This method return a promise that will return requested time.

You can also register on the `startedTimer`, `pausedTimer` and `finishedTimer` events, if you want to be informed about timer
state changes.

See an example in the `src/app/screens/sreen1/screen1.controller.js` file.

## Warning

If you use this template outside EFL Player, it will be still waiting on the module init event. Before it get this event,
module will be displaying main state that is an empty screen. For that reason you can uncomment `DiscoveryService.mockInit();`
line in the `src/app/main/main.controller.js` file. It will init Discovery Module with the mock data.


# Gulp commands

Template have several tasks that you can use during module development:

### Building the Web App
* **gulp build:dist [--appDest=path_to_build]** -  build app with minification. Default location is: `appDist` folder.
* **gulp build [--appDest=path_to_build]** - build app without minification. Default location for the app is: `appDev` folder.

The `gulp build` task takes the following optional parameters:
* **--appDest** - which specifies the folder to put the built app into.

### Testing the Web App
* **gulp test** - runs the unit tests


### Archiving into epub
* **gulp archive [--appDest=path_to_build] [--epubDest=path_to_epub] [--epubName=epub_name]** - build app (without minification) and archive it into an epub module. Default location for the app is: ‘appDev’ folder. Default location for epub is: `epubDev` folder. Default name of the epub is `MODULE_NAME.epub`.
* **gulp archive:dist [--appDest=path_to_build] [--epubDest=path_to_epub] [--epubName=epub_name]** - build app  (with minification) and archive it into an epub module.  Default location for the app is: ‘appDist’ folder. Default location for epub is: `epubDist` folder. Default name of the epub is `MODULE_NAME.epub`.

The `gulp archive` task takes the following optional parameters:
* **--appDest** - which specifies the folder to put the built app into.
* **--epubDest** - which specifies the folder to put the archived epub into.
* **--epubName** - specifies the name epub to write out.

### Watching source code for changes

* **gulp watch [--appDest=path_to_build] [--epubDest=path_to_epub] [--epubName=epub_name]** - watch src/app and on changes, build app, and archive it into an epub module (without minification). Default location for the app is: ‘appDev’ folder. Default location for epub is: `epubDev` folder. Default name of the epub is `MODULE_NAME.epub`.
* **gulp watch:dist [--appDest=path_to_build] [--epubDest=path_to_epub] [--epubName=epub_name]** - watch src/app and on changes, build app, and archive it into an epub module  (with minification). Default location for the app is: ‘appDist’ folder. Default location for epub is: `epubDist` folder. Default name of the epub is `MODULE_NAME.epub`.

The `gulp watch` takes the following optional parameters:
* **--appDest** - which specifies the folder to put the built app into.
* **--epubDest** - which specifies the folder to put the archived epub into.
* **--epubName** - specifies the name epub to write out.

### Watching source code for changes while running module in the Developer Web Player
* **gulp dmp [--appDest=path_to_build] [--epubDest=path_to_epub] [--epubName=epub_name]** - watch src/app and on changes, build app, reload the module into the Developer Web Player inside a browser (without minification nor archiving). Default location for the app is: `appDev` folder.
* **gulp dmp:dist [--appDest=path_to_build] [--epubDest=path_to_epub] [--epubName=epub_name]** -  watch src/app and on changes, build app, archive epub, and reload the module into the Developer Web Player in a browser (with minification and archiving). Default location for the app is: `appDist` folder. Default location for epub is: ‘epubDist’ folder. Default name of the epub is `MODULE_NAME.epub`.

The `gulp dmp` takes the following optional parameters:
* **--appDest** - which specifies the folder to put the built app into.
* **--epubDest** - which specifies the folder to put the archived epub into.
* **--epubName** - specifies the name epub to write out.


### Watching source code for changes while running module in the browser
* **gulp serve [--appDest=path_to_build] [--epubDest=path_to_epub] [--epubName=epub_name]** - watch src/app and on changes, build app, reload the module inside a browser (without minification nor archiving). Default location for the app is: `appDev` folder.
* **gulp serve:dist [--appDest=path_to_build] [--epubDest=path_to_epub] [--epubName=epub_name]** -  watch src/app and on changes, build app, archive epub, and reload the module inside a browser (with minification and archiving). Default location for the app is: `appDist` folder. Default location for epub is: `epubDist` folder. Default name of the epub is`‘MODULE_NAME.epub`.

The `gulp serve` takes the following optional parameters:
* **--appDest** - which specifies the folder to put the built app into.
* **--epubDest** - which specifies the folder to put the archived epub into.
* **--epubName** - specifies the name epub to write out.
