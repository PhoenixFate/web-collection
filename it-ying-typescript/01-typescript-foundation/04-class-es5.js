//es5中的类
function Person(name,age){
    this.name=name
    this.age=age
}
var p=new Person("张三",22)
console.log(p.name)
console.log(p.age)

//2.构造函数和原型链中添加方法
function Person2(name,age){
    this.name=name
    this.age=age
    this.run=function(){
        console.log(this.name+" is running")
    }
}
var p2=new Person2("张三2",22)
console.log(p2.name)
console.log(p2.age)
p2.run()
//原型链上面的属性会被多个实例共享，但构造函数不会
Person2.prototype.sex="男"
console.log(p2.sex)
Person2.prototype.work=function(){
    console.log(this.name+" is working")
}
p2.work()


//3.es5里面的静态方法
Person2.getInfo=function(){
    console.log(this.name+" 我是静态方法")
    console.log("this.age: "+this.age)
}
Person2.getInfo()
// p2.getInfo() //报错


//4.es5里面的继承
//原型链+对象冒充的组合继承

//对象冒充继承
function Man(){
    //对象冒充实现继承
    Person2.call(this)
}
let man=new Man()
//对象冒充可以继承构造函数里面的属性和方法
man.run()
//对象冒充不能继承原型链上面的上面
// man.work()

//原型链继承
function Woman(name,age){

}
Woman.prototype=new Person2()
let woman=new Woman('小红',33) //实例化子类的时候没法给父类传参数
//既可以继承构造函数里面的属性和方法，又可以继承原型链上面的属性方法
woman.run()
woman.work()


//!!!!!!!!!!!原型链+对象冒充的组合继承
function BestPerson(name,age){
    Person2.call(this,name,age)//对象冒充继承 可以给父类传入参数
}
// BestPerson.prototype=new Person2()
BestPerson.prototype=Person2.prototype //效果和上面一样
let bp=new BestPerson("牛人",88)
bp.run()
bp.work()

