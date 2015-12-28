'use strict';

describe('Controller: QuestionController', function () {
    var ctrl;

    beforeEach(module('abGlobalModule'));
    beforeEach(inject(function ($controller, $rootScope, _ObservationsService_, _TimerService_) {
        ctrl = $controller('QuestionController', {
            $scope: $rootScope.$new(),
            ObservationsService: _ObservationsService_,
            TimerService: _TimerService_,
            data: {
                type: 'abGlobal01',
                src: {
                    first: '123.png',
                    second: '456.png'
                }
            }
        })
    }));

    it('should define ctrl', function () {
        expect(ctrl).to.exist;
    });

    it('should have src', function () {
        expect(ctrl).to.have.property('src');
        expect(ctrl.src).to.be.an('object');
        expect(ctrl.src).to.have.any.keys('first', 'second');
        expect(ctrl.src.first).to.equal('123.png');
        expect(ctrl.src.second).to.equal('456.png');
    });

    it('should have type', function () {
        expect(ctrl).to.have.property('type');
        expect(ctrl.type).to.be.a('string');
        expect(ctrl.type).to.equal('abGlobal01');
    });

    it('should have sliderValue', function () {
        expect(ctrl).to.have.property('sliderValue');
        expect(ctrl.sliderValue).to.be.a('number');
        expect(ctrl.sliderValue).to.equal(0);
    });

    it('should have idu', function () {
        expect(ctrl).to.have.property('idu');
        expect(ctrl.idu).to.be.a('boolean');
        expect(ctrl.idu).to.equal(false);
    });

    it('should have check', function () {
        expect(ctrl).to.have.property('check');
    });

    it('should call check', function () {
        var check = chai.spy(ctrl.check);
        check();
        expect(check).to.be.spy;
        expect(check).to.have.been.called();
    });

    it('should change idu', function () {
        ctrl.check();
        expect(ctrl.idu).to.exist;
        expect(ctrl.idu).to.be.a('boolean');
        expect(ctrl.idu).to.equal(true);
    });

    it('should have storeAdditionalData', function () {
        expect(ctrl).to.have.property('storeAdditionalData');
    });

    it('should call storeAdditionalData', function () {
        var storeData = chai.spy(ctrl.storeAdditionalData);
        storeData();
        expect(storeData).to.be.spy;
        expect(storeData).to.have.been.called();
    });
});