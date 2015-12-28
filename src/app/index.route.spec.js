'use strict';

describe('App route', function () {
    var state, currentState;

    beforeEach(module('abGlobalModule'));
    beforeEach(inject(function (_$state_) {
        state = _$state_;
    }));

    it('should define state', function () {
        expect(state).to.exist;
    });

    it('should have introScreen', function () {
        currentState = state.get('introScreen');
        expect(currentState).to.exist;
        expect(currentState.templateUrl).to.equal('app/screens/intro/intro.html');
        expect(currentState.controller).to.equal('IntroController');
        expect(currentState.controllerAs).to.equal('intro');
    });

    it('should have questionScreen1', function () {
        currentState = state.get('questionScreen1');
        expect(currentState).to.exist;
        expect(currentState.templateUrl).to.equal('app/screens/question/question.html');
        expect(currentState.controller).to.equal('QuestionController');
        expect(currentState.controllerAs).to.equal('question');
    });

    it('should have questionScreen2', function () {
        currentState = state.get('questionScreen2');
        expect(currentState).to.exist;
        expect(currentState.templateUrl).to.equal('app/screens/question/question.html');
        expect(currentState.controller).to.equal('QuestionController');
        expect(currentState.controllerAs).to.equal('question');
    });

    it('should have doneScreen', function () {
        currentState = state.get('doneScreen');
        expect(currentState).to.exist;
        expect(currentState.templateUrl).to.equal('app/screens/done/done.html');
        expect(currentState.controller).to.equal('DoneController');
        expect(currentState.controllerAs).to.equal('done');
    });

    it('should not have this state', function () {
        expect(state.get('test')).to.be.null;
    });
});