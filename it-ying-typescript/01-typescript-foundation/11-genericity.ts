/*
泛型：软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，
这在创建大型系统时为你提供了十分灵活的功能。
在像C#和Java这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。
通俗理解：泛型就是解决 类 接口 方法的复用性、以及对不特定数据类型的支持(类型校验)
*/


//any放弃了类型检查,传入什么 返回什么。比如:传入number 类型必须返回number类型  传入 string类型必须返回string类型
//传入的参数类型和返回的参数类型可以不一致
function getData1(value: any): any {
    return '哈哈哈';
}

// 泛型：可以支持不特定的数据类型   要求：传入的参数和返回的参数一直
function getData2<T>(value:T):T{

    return value
}
console.log(getData2<number>(234))
console.log(getData2<string>('aaa'))


//类的泛型
class MinClass<T>{

    public list:T[]=[]

    add(value:T):void{
        this.list.push(value)
    }

    getMin():T{
        let min:T=this.list[0]
        for(let i=0;i<this.list.length;i++){
            if(min>this.list[i]){
                min=this.list[i]
            }
        }
        return min
    }   
}

let minClass=new MinClass<Number>()
minClass.add(23)
minClass.add(234)
minClass.add(45)
minClass.add(12)
minClass.add(99)
console.log("min: "+minClass.getMin())


let minClass2=new MinClass<string>()
minClass2.add('a')
minClass2.add('b')
minClass2.add('c')
minClass2.add('d')
console.log("min string: "+minClass2.getMin())