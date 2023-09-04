"use strict";
//es5 定义函数的两种方法
function run() {
    return 'run';
}
var run2 = function () {
    return "run2";
};
//3.1ts中定义函数的方式
function run3() {
    return "run3";
}
var run4 = function () {
    return "run4";
};
//3.1ts中的方法传值
function getInfo(name, age) {
    return name + " ------ " + age;
}
console.log(getInfo("tom", 29));
//3.2方法配置可选参数 
//参数名后面加？
//可选参数必须配置到参数列表最后面
function getInfo2(name, age) {
    if (age) {
        return name + " ------ " + age;
    }
    else {
        return name + " ------ \u5E74\u9F84\u4FDD\u5BC6";
    }
}
console.log(getInfo2("carry"));
//3.3默认参数
function getInfo3(name, age) {
    if (age === void 0) { age = 20; }
    return name + " ------ " + age;
}
console.log(getInfo3("理查德"));
//3.4剩余参数
function sum(a, b, c) {
    return a + b + c;
}
console.log(sum(1, 2, 3));
//剩余参数
//三点运算符（剩余参数） 动态接受传递过来的值
function sum4() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    var temp = 0;
    for (var i_1 = 0; i_1 < result.length; i_1++) {
        temp += result[i_1];
    }
    return temp;
}
console.log(sum4(2, 4, 34));
function myInfo(str) {
    if (typeof str == 'string') {
        return str;
    }
    else {
        return "我几年" + str + "岁";
    }
}
console.log(myInfo('占三'));
console.log(myInfo(88));
function myInfo2(name, age) {
    if (age) {
        return name + " xxx " + age;
    }
    else {
        return name + " xxx \u5E74\u9F84\u4FDD\u5BC6";
    }
}
console.log(myInfo2('占三'));
console.log(myInfo2('占三', 30));
//3.6箭头函数 es6中的
setTimeout(function () {
    console.log("time out");
}, 1000);
