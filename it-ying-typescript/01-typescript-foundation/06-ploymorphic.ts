//[ˌpɑˌliˈmɔrfɪk]  多态;   多型;   多态性;   多形的;   多态的;  

class Animal{
    name2:string
    constructor(name:string){
        this.name2=name
    }
    eat(){
        console.log("animal eat")
    }
}

class Dog extends Animal{
    constructor(name:string){
        super(name)
        this.name2=name
    }
    eat(){
        console.log("dog eat")
    }
}

class Cat extends Animal {
    constructor(name:string){
        super(name)
        this.name2=name
    }
    eat(){
        console.log("cat eat")
    }
}

let dog:Animal=new Dog("旺财")
let cat:Animal=new Cat("喵喵")
dog.eat()
cat.eat()