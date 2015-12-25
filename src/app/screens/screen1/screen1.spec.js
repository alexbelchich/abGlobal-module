describe('Screen1Controller', function() {
    beforeEach(module('abGlobalModule'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it('should validate form', function() {
        var $scope = {$watch: function() {}, $on: function () {}};
        var controller = $controller('Screen1Controller', {$scope: $scope});
        expect(controller).to.have.property('submitForm');
    });
});
