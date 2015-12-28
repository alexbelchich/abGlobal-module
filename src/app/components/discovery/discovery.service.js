(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .service('DiscoveryService', DiscoveryService);

    /** @ngInject */
    function DiscoveryService($window, $rootScope, $q, ConfigService, $translate) {
        var vm = this;
        var discovery = $window.EFLDiscoveryModule;

        vm.init = function () {
            discovery.init({
                initModuleHandler: initModule,  // method called to initialize module
                nextButtonHandler: nextScreen,  // method called on next screen event
                backButtonHandler: previousScreen,  // method called on previous screen event
                changedLanguageHandler: changedLanguage, // method called when user chosen a new language
                initializedTimerHandler: initializedTimer,
                startedTimerHandler: startedTimer,
                pausedTimerHandler: pausedTimer,
                finishedTimerHandler: finishedTimer,
                timerTimeResponseHandler: timerTimeResponse
            });
        };

        /*
            Module initialization.
         */
        function initModule(stepName, config) {
            vm.name = stepName;
            ConfigService.setupConfig(config);

            $rootScope.$broadcast('discoveryAPIInitialized');
            discovery.loadedModule();
        }

        /*
            Handle next screen event.
         */
        function nextScreen() {
            $rootScope.$broadcast('showNextScreen');
        }

        /*
            Handle previous screen event.
         */
        function previousScreen() {
            $rootScope.$broadcast('showPreviousScreen');
        }

        /*
            Handle change language event. "lang" is locale code.
         */
        function changedLanguage(lang) {
            $rootScope.$broadcast('languageChanged', lang);
            if (lang.match(/en/) || lang.match(/us/)) $translate.use('en_US');
            if (lang.match(/pe/) || lang.match(/pem/) || lang.match(/es/)) {
                $translate.use('es_PE');
            }
            if (lang.match(/mex/) || lang.match(/mx/) || lang.match(/es/)) {
                $translate.use('es_MX');
            }
        }

        /*
            Handle initialized timer event.
         */
        function initializedTimer() {
            $rootScope.$broadcast('initializedTimer');
        }

        /*
            Handle started timer event.
         */
        function startedTimer() {
            $rootScope.$broadcast('startedTimer');
        }

        /*
            Handle paused timer event.
         */
        function pausedTimer() {
            $rootScope.$broadcast('pausedTimer');
        }

        /*
            Handle finished timer event.
         */
        function finishedTimer() {
            $rootScope.$broadcast('finishedTimer');
        }

        /*
            Handle timer time response event. "time" is elapsed time.
         */
        function timerTimeResponse(time) {
            $rootScope.$broadcast('timerTimeResponse', time);
        }

        vm.loadedScreen = function (config) {
            discovery.loadedScreen({
                showNextButton: config.showNextButton !== false,
                showBackButton: config.showBackButton !== false,
                hideTitle: config.hideTitle === true,
                hideProgress: config.hideProgress === true,
                showTimer: config.showTimer === true
            });
        };

        vm.finishedScreen = function (progress) {
            discovery.finishedScreen(progress);
        };

        vm.finishedModule = function (observations, metas, applicant, state) {
            var returnValues = {};
            if (observations && Object.keys(observations).length) {
                returnValues.observations = observations;
            }
            if (metas && Object.keys(metas).length) {
                returnValues.metas = metas;
            }
            if (applicant && Object.keys(applicant).length) {
                returnValues.applicant = applicant;
            }
            if (state && Object.keys(state).length) {
                returnValues.state = state;
            }
            discovery.finishedModule(returnValues);
        };

        vm.error = function (category, message) {
            discovery.caughtException(category, message);
        };

        vm.resizedContent = function () {
            discovery.resizedScreen();
        };

        vm.initTimer = function (time, enableTimeExtension, enableControl) {
            discovery.initTimer(time, enableTimeExtension, enableControl);
            return $q(function (resolve) {
                var listener = $rootScope.$on('initializedTimer', function () {
                    resolve();
                    listener();
                });
                $rootScope.$on('$destroy', function () {
                    listener();
                });
            });
        };

        vm.startTimer = function () {
            discovery.startTimer();
        };

        vm.pauseTimer = function () {
            discovery.pauseTimer();
        };

        vm.getTimerTime = function () {
            discovery.requestTimerTime();
            return $q(function (resolve) {
                var listener = $rootScope.$on('timerTimeResponse', function (event, time) {
                    resolve(time);
                    listener();
                });
                $rootScope.$on('$destroy', function () {
                    listener();
                });
            });
        };

        vm.mockInit = function () {
            initModule("step", {
                applicantJourney: {
                    key: 'consumerMobile',
                    version: 'v.59',
                    step: {
                        moduleKey: 'facebookHappiness',
                        title: 'Facebook Happiness',
                        ordinal: 0,
                        locale: 'en',
                        style: ''
                    },
                    applicant: {},
                    lender: {},
                    loanOfficer: {}
                }
            });
        };

        vm.changedView = function () {
            discovery.changedView();
        };
    }
})();
