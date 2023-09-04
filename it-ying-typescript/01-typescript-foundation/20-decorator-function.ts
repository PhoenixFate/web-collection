/*
3、方法装饰器
    它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
    方法装饰会在运行时传入下列3个参数：
        1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
        2、成员的名字。
        3、成员的属性描述符。
*/

function logMethod6(params:any){
    return function(target:any,methodName:any,desc:any){
        console.log(target)
        console.log(methodName)
        console.log(desc)

        target.apiUrl="xxx"
        target.run=function(){
            console.log('run')
        }

        //修改装饰器修饰的方法 把装饰器方法里面的传入的所有参数改为string
        let oldMethod=desc.value
        desc.value=function(...list:any){
            list=list.map((temp: any)=>{
                return String(temp)
            })
            console.log(list)
            oldMethod.apply(this.list)
        }

    }
}

class HttpClient6{
    public url:any | undefined

    constructor(){

    }

    @logMethod6('http://www.phoenix.com')
    getData(){
        console.log('我是getData里面的方法')
    }
}
let http6:any=new HttpClient6()
console.log(http6.apiUrl)
http6.run()
http6.getData(123,'sss')


/*
4、方法参数装饰器 
参数装饰器表达式会在运行时当作函数被调用，可以使用参数装饰器为类的原型增加一些元素数据 ，传入下列3个参数：
1、对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2、方法的名字。
3、参数在函数参数列表中的索引。
*/


function logParams7(params:any){
    return function(target:any,methodName:any,paramsIndex:any){
        console.log(params);
        console.log(target);
        console.log(methodName);
        console.log(paramsIndex);
        target.apiUrl=params;
    }   
}

class HttpClient7{  
            public url:any |undefined;
            constructor(){
            }           
            getData(@logParams7('xxxxx') uuid:any){               
                console.log(uuid);
            }
 }


 var http7:any = new HttpClient7();
 http7.getData(123456);
console.log( http7.apiUrl);




//装饰器执行顺序
//属性》方法》方法参数》类
// 如果有多个同样的装饰器，它会先执行后面的
