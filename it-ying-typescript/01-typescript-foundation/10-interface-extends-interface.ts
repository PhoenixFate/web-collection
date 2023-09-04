interface Animal6{
    eat():void
}

interface Person6 extends Animal6{
    work():void
}

class Man6 implements Person6{

    name:string
    constructor(name:string){
        this.name=name
    }

    eat():void{
        console.log("man is eating")
    }
    work():void{
        console.log("man is working")
    }
}