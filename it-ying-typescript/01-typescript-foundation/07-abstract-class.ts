//typescript中的抽象类：它是提供其他类继承的基类，不能直接被实例化。
//用abstract关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
// abstract抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准 。   标准：Animal 这个类要求它的子类必须包含eat方法
abstract class Animal2{
    name:string
    constructor(name:string){
        this.name=name
    }
    abstract eat():any
    //可以包含非抽象方法
    run(){
        console.log("animal2 run")
    }
}

class Dog2 extends Animal2{
    constructor(name:string){
        super(name)
        this.name=name
    }
    // 抽象类的子类必须实现抽象类里面的抽象方法
    eat(){
        console.log("dog2 eat")
    }
}

class Cat2 extends Animal2{
    constructor(name:string){
        super(name)
        this.name=name
    }
    // 抽象类的子类必须实现抽象类里面的抽象方法
    eat(){
        console.log("cat2 eat")
    }
}


