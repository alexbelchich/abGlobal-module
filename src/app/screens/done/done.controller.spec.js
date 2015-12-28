'use strict';

describe('Controller: DoneController', function () {
    var ctrl;

    beforeEach(module('abGlobalModule'));
    beforeEach(inject(function ($controller, $rootScope, _ObservationsService_, _DiscoveryService_, _ModuleTimerService_) {
        ctrl = $controller('DoneController', {
            $scope: $rootScope.$new(),
            ObservationsService: _ObservationsService_,
            DiscoveryService: _DiscoveryService_,
            ModuleTimerService: _ModuleTimerService_
        });
    }));

    it('should define ctrl', function () {
        expect(ctrl).to.exist;
    });

    it('should have setModuleTime', function () {
        expect(ctrl).to.have.property('setModuleTime');
    });

    it('should call setModuleTime', function () {
        var setModuleTime = chai.spy(ctrl.setModuleTime);
        setModuleTime();
        expect(setModuleTime).to.be.spy;
        expect(setModuleTime).to.have.been.called();
    });

    it('should set fullTime', function () {
        ctrl.setModuleTime();
        expect(ctrl.fullTime).to.exist;
        expect(ctrl.fullTime).to.be.a('number');
    });

    it('should have finishModule', function () {
        expect(ctrl).to.have.property('finishModule');
    });

    it('should call finishModule', function () {
        var finishModule = chai.spy(ctrl.finishModule);
        finishModule();
        expect(finishModule).to.be.spy;
        expect(finishModule).to.have.been.called();
    });

    it('should have observations, metas, applicant, state', function () {
        ctrl.finishModule();
        expect(ctrl.observations).to.exist;
        expect(ctrl.observations).to.be.an('object');
        expect(ctrl.metas).to.exist;
        expect(ctrl.metas).to.be.an('object');
        expect(ctrl.applicant).to.exist;
        expect(ctrl.applicant).to.be.an('object');
        expect(ctrl.state).to.exist;
        expect(ctrl.state).to.be.an('object');
    });

    it('should have changeBg', function () {
        expect(ctrl).to.have.property('changeBg');
    });

    it('should call changeBg', function () {
        var changeBg = chai.spy(ctrl.changeBg);
        changeBg();
        expect(changeBg).to.be.spy;
        expect(changeBg).to.have.been.called();
    });
});