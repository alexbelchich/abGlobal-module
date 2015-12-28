'use strict';

describe('Service: ModuleTimerService', function () {
    var service, $timeout;

    beforeEach(module('abGlobalModule'));
    beforeEach(inject(function (_ModuleTimerService_, _$timeout_) {
        service = _ModuleTimerService_;
        $timeout = _$timeout_;
    }));

    it('should define service', function () {
        expect(service).to.exist;
    });

    it('should have timeelapsed', function () {
        expect(service).to.have.property('timeelapsed');
        expect(service.timeelapsed).to.be.a('number');
        expect(service.timeelapsed).to.equal(0);
    });

    it('should have second', function () {
        expect(service).to.have.property('second');
        expect(service.second).to.be.a('number');
        expect(service.second).to.equal(1000);
    });

    it('should have startTimer', function () {
        expect(service).to.have.property('startTimer');
    });

    it('should have stopTimer', function () {
        expect(service).to.have.property('stopTimer');
    });

    it('should have getFullTime', function () {
        expect(service).to.have.property('getFullTime');
    });

    it('should call startTimer', function () {
        if (chai && chai.spy) {
            var startTimer = chai.spy(service.startTimer);
            startTimer();
            expect(startTimer).to.be.spy;
            expect(startTimer).to.have.been.called();
        }
    });

    it('should change timeelapsed after startTimer was called', function () {
        service.startTimer();
        expect(service.timeelapsed).to.exist;
        expect(service.timeelapsed).to.be.a('number');
        $timeout(function () {
            expect(service.timeelapsed).to.be.above(0);
        }, 1000);
    });

    it('should call stopTimer', function () {
        if (chai && chai.spy) {
            var stopTimer = chai.spy(service.stopTimer);
            stopTimer();
            expect(stopTimer).to.be.spy;
            expect(stopTimer).to.have.been.called();
        }
    });

    it('should clear interval after stopTimer', function () {
        service.stopTimer();
        expect(service.interval).to.be.undefined;
    });

    it('should have getFullTime', function () {
        expect(service).to.have.property('getFullTime');
    });

    it('should call getFullTime', function () {
        if (chai && chai.spy) {
            var getFullTime = chai.spy(service.getFullTime);
            getFullTime();
            expect(getFullTime).to.be.spy;
            expect(getFullTime).to.have.been.called();
        }
    });

    it('should return time', function () {
        service.timeelapsed = 3;
        var result = service.getFullTime();
        expect(result).to.exist;
        expect(result).to.be.a('number');
        expect(result).to.equal(3000);
    });
});