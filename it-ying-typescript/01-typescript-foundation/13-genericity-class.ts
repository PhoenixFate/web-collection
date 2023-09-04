/*
泛类：泛型可以帮助我们避免重复的代码以及对不特定数据类型的支持(类型校验)，下面我们看看把类当做参数的泛型类
1、定义个类
2、把类作为参数来约束数据传入的类型 
*/

class MysqlDb<T>{
    add(value:T):Boolean{
        console.log(value)
        return true
    }
}

let mysql=new MysqlDb<string>()
mysql.add("abc")

class Article{
    title:string|undefined
    desc:string|undefined
}
let article=new Article()
article.title="news"
article.desc="news desc"
let mysqlArticle=new MysqlDb<Article>()
mysqlArticle.add(article)
