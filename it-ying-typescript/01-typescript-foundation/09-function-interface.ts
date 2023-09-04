/*
接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，
在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，
接口不关心这些类的内部状态数据，也不关心这些类里方法的实现细节，它只规定这批类里必须提供某些方法，
提供这些方法的类就可以满足实际需要。 typescrip中的接口类似于java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。
定义标准。
*/

// 函数类型接口:对方法传入的参数 以及返回值进行约束    批量约束
// 加密的函数类型接口
interface encrypt{
    (key:string,value:string):string
}

var md5:encrypt=function(key:string,value:string):string{
    return `${key} ---  ${value}`
}
console.log(md5('aaa','bbb'))


// 可索引接口：数组、对象的约束  （不常用）
var arr:number[]=[2342,235325]
var arr1:Array<string>=['111','222']


//可索引接口 对数组的约束
interface UserArr{
    // 索引值必须为number
    [index:number]:string
}

var arr4:UserArr=['aaa','bbb'];
console.log(arr4[0]);

// var arr3:UserArr=[123,'bbb'];  /*错误*/
// console.log(arr3[0]);

 //可索引接口 对对象的约束
interface UserObj{
    [index:string]:string
}
var arr9:UserObj={name:'张三'};
console.log(arr9)



//类类型接口:对类的约束  和   抽象类抽象有点相似    
interface Animal3{
    name:string
    eat():void
}

class Dog3 implements Animal3{

    name:string
    constructor(name:string){
        this.name=name
    }

    eat():void{
        console.log("dog3 is eating")
    }

}

let dog3=new Dog3("旺旺")
dog3.eat()

class Cat3 implements Animal3{
    name:string
    constructor(name:string){
        this.name=name
    }
    eat():void{
        console.log("cat3 is eating")
    }
}

let cat3=new Cat3("xx")
cat3.eat()