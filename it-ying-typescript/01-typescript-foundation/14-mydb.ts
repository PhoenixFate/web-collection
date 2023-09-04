/*
功能：定义一个操作数据库的库  支持 Mysql Mssql  MongoDb
要求1：Mysql MsSql  MongoDb功能一样  都有 add  update  delete  get方法    
注意：约束统一的规范、以及代码重用
解决方案：需要约束规范所以要定义接口 ，需要代码重用所以用到泛型
    1、接口：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范
    2、泛型 通俗理解：泛型就是解决 类 接口 方法的复用性、
*/
interface databaseInterface<T>{
    add(value:T):Boolean
    update(value:T,id:number):Boolean
    delete(id:number):Boolean
    get(id:number):any[]
}

class MysqlDb4<T> implements databaseInterface<T>{

    add(value:T):Boolean{
        console.log("mysql add "+value)
        return true;
    }

    update(value:T,id:number):Boolean{
        console.log("mysql update "+value)
        return true;
    }

    delete(id:number):Boolean{
        console.log("mysql delete "+id)
        return true
    }

    get(id:number):any[]{
        console.log("mysql get "+id)
        return []
    }

}

class mongoDb4<T> implements databaseInterface<T>{

    add(value: T): Boolean {
        console.log("mongo add "+value)
        return true;
    }    
    update(value: T, id: number): Boolean {
        console.log("mongo update "+value)
        return true;
    }
    delete(id: number): Boolean {
        console.log("mongo delete "+id)
        return true
    }
    get(id: number): any[] {
        console.log("mongo get "+id)
        return []
    }

}

class User4{
    username:string |undefined
    password:string |undefined
}

let user4=new User4()
user4.username="admin"
user4.password="123456"

let mysql4=new MysqlDb4<User4>()
mysql4.add(user4)
mysql4.update(user4,10)



