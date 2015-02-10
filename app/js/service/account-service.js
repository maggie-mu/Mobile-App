/**
 * accountService
 */
angular.module('phonecatServices').service('accountService', ['$http',
    function($http){

        this.account = null;

        /**
         * getAccount - return account details via accountID
         * @param account_id
         * @returns {promise}
         */
        this.getAccount = function(account_id) {
            var self = this;

            return $http.get('account/' + account_id).
                success(function (data, status, headers, confiåg) {
                    self.account = data;
                    console.log("get the account details", data);
                }).
                error(function (data, status, headers, config) {

                });
        };

        /**
         * saveAccount - save the account details
         * @param account
         * @returns {promise}
         */
        this.saveAccount = function(account) {
            var self = this;

            return $http.post('account', account).
                success(function (data, status, headers, config) {
                    self.account = data;
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        };

        /**
         * checkMobileAccount - check whether the account it the mobile customer
         * @returns {boolean}
         */
        this.checkMobileAccount = function() {
            if(this.account && this.account.service && this.account.service === 'Mobile') {
                return true;
            }
            return false;
        };
    }
]);