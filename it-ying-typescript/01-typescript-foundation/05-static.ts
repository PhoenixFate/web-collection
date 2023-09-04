class NewPerson {
    public name:string

    static className:string='NewPerson'

    constructor(name:string){
        this.name=name
    }

    run(){
        console.log(`${this.name} is running`)
    }

    work(){
        console.log(`${this.name} is working`)
    }

    static print(){
        console.log(this.className+"is printing")
    }

}


let p2=new NewPerson('张三')
p2.run()
NewPerson.print()
