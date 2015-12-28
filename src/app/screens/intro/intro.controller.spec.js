'use strict';

describe('Controller: IntroController', function () {
    var ctrl;

    beforeEach(module('abGlobalModule'));
    beforeEach(inject(function ($controller, $rootScope, _ObservationsService_, _ModuleTimerService_, _NavigationService_) {
        ctrl = $controller('IntroController', {
            $scope: $rootScope.$new(),
            ObservationsService: _ObservationsService_,
            ModuleTimerService: _ModuleTimerService_,
            NavigationService: _NavigationService_
        });
    }));

    it('should define ctrl', function () {
        expect(ctrl).to.exist;
    });

    it('should have nextScreen', function () {
        expect(ctrl).to.have.property('nextScreen');
    });

    it('should have storeAdditionalData', function () {
        expect(ctrl).to.have.property('storeAdditionalData');
    });

    it('should call nextScreen', function () {
        var nextScreen = chai.spy(ctrl.nextScreen);
        nextScreen();
        expect(nextScreen).to.be.spy;
        expect(nextScreen).to.have.been.called();
    });

    it('should call storeAdditionalData', function () {
        var storeData = chai.spy(ctrl.storeAdditionalData);
        storeData();
        expect(storeData).to.be.spy;
        expect(storeData).to.have.been.called();
    });
});