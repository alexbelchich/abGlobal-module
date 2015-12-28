'use strict';

describe('App constants', function () {
    var EN_US, ES_PE, ES_MX;

    beforeEach(module('abGlobalModule'));
    beforeEach(inject(function (_EN_US_, _ES_PE_, _ES_MX_) {
        EN_US = _EN_US_;
        ES_PE = _ES_PE_;
        ES_MX = _ES_MX_;
    }));

    it('should define EN_US', function () {
        expect(EN_US).to.exist;
        expect(EN_US).to.be.an('object');
        expect(EN_US).to.have.property('question');
    });

    it('should define ES_PE', function () {
        expect(ES_PE).to.exist;
        expect(ES_PE).to.be.an('object');
        expect(ES_PE).to.have.property('question');
    });

    it('should define ES_MX', function () {
        expect(ES_MX).to.exist;
        expect(ES_MX).to.be.an('object');
        expect(ES_MX).to.have.property('question');
    });
});