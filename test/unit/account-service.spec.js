'use strict';

describe('accountService', function () {

    var $httpBackend,
        service,
        authRequestHandler;

    // load modules
    beforeEach(module('phonecatApp'));

    beforeEach(inject(function (_$httpBackend_, accountService) {
        // Set up the mock http service responses
        $httpBackend = _$httpBackend_;

        // backend definition common for all tests
        authRequestHandler = $httpBackend.when('GET', 'account/1')
            .respond({accountID: 1, firstName: 'John', surname: 'William'});

        service = accountService;
    }));

    // Test service availability
    it('check the existence of Phone factory', inject(function () {
        $httpBackend.expectGET('account/1');
        service.getAccount(1);
        $httpBackend.flush();

        expect(service.account.accountID).toBe(1);
        expect(service.account.firstName).toBe("John");
        expect(service.account.surname).toBe("William");
    }));
});