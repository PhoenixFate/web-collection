"use strict";
/*
泛类：泛型可以帮助我们避免重复的代码以及对不特定数据类型的支持(类型校验)，下面我们看看把类当做参数的泛型类
1、定义个类
2、把类作为参数来约束数据传入的类型
*/
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (value) {
        console.log(value);
        return true;
    };
    return MysqlDb;
}());
var mysql = new MysqlDb();
mysql.add("abc");
var Article = /** @class */ (function () {
    function Article() {
    }
    return Article;
}());
var article = new Article();
article.title = "news";
article.desc = "news desc";
var mysqlArticle = new MysqlDb();
mysqlArticle.add(article);
