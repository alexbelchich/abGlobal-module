(function() {
    'use strict';

    angular
        .module('abGlobalModule')
        .config(config);

    /** @ngInject */
    function config($logProvider, NavigationProviderProvider, $translateProvider, EN_US) {
        // Enable log
        $logProvider.debugEnabled(true);

        $translateProvider.translations('en_US', EN_US);

        NavigationProviderProvider.setScreensList([
            {
                name: 'introScreen',
                showNextButton: true,
                showBackButton: false,
                hideTitle: false,
                hideProgress: false,
                timer: false
            },
            {
                name: 'questionScreen1',
                showNextButton: true,
                showBackButton: false,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'questionScreen2',
                showNextButton: true,
                showBackButton: true,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'questionScreen3',
                showNextButton: true,
                showBackButton: true,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'questionScreen4',
                showNextButton: true,
                showBackButton: true,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'questionScreen5',
                showNextButton: true,
                showBackButton: true,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'questionScreen6',
                showNextButton: true,
                showBackButton: true,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'questionScreen7',
                showNextButton: true,
                showBackButton: true,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'questionScreen8',
                showNextButton: true,
                showBackButton: true,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'questionScreen9',
                showNextButton: true,
                showBackButton: true,
                hideTitle: false,
                hideProgress: false,
                timer: {
                    time: 15000,
                    enableTimeExtension: true,
                    enableControlButtons: true,
                    autoStart: true
                }
            },
            {
                name: 'doneScreen',
                showNextButton: true,
                showBackButton: false,
                hideTitle: false,
                hideProgress: false,
                timer: false
            }
        ]);
    }


})();
