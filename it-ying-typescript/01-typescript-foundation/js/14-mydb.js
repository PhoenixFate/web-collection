"use strict";
var MysqlDb4 = /** @class */ (function () {
    function MysqlDb4() {
    }
    MysqlDb4.prototype.add = function (value) {
        console.log("mysql add " + value);
        return true;
    };
    MysqlDb4.prototype.update = function (value, id) {
        console.log("mysql update " + value);
        return true;
    };
    MysqlDb4.prototype.delete = function (id) {
        console.log("mysql delete " + id);
        return true;
    };
    MysqlDb4.prototype.get = function (id) {
        console.log("mysql get " + id);
        return [];
    };
    return MysqlDb4;
}());
var mongoDb4 = /** @class */ (function () {
    function mongoDb4() {
    }
    mongoDb4.prototype.add = function (value) {
        console.log("mongo add " + value);
        return true;
    };
    mongoDb4.prototype.update = function (value, id) {
        console.log("mongo update " + value);
        return true;
    };
    mongoDb4.prototype.delete = function (id) {
        console.log("mongo delete " + id);
        return true;
    };
    mongoDb4.prototype.get = function (id) {
        console.log("mongo get " + id);
        return [];
    };
    return mongoDb4;
}());
var User4 = /** @class */ (function () {
    function User4() {
    }
    return User4;
}());
var user4 = new User4();
user4.username = "admin";
user4.password = "123456";
var mysql4 = new MysqlDb4();
mysql4.add(user4);
mysql4.update(user4, 10);
