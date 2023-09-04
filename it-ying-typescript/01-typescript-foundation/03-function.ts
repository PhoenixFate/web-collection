
//es5 定义函数的两种方法
function run(){
    return 'run'
}
var run2=function(){//匿名函数
    return "run2"
}

//3.1ts中定义函数的方式
function run3():string{
    return "run3"
}
var run4=function():string{
    return "run4"
}

//3.1ts中的方法传值
function getInfo(name:string,age:number):string{
    return `${name} ------ ${age}`
}
console.log(getInfo("tom",29))

//3.2方法配置可选参数 
//参数名后面加？
//可选参数必须配置到参数列表最后面
function getInfo2(name:string,age?:number):string{
    if(age){
        return `${name} ------ ${age}`
    }else {
        return `${name} ------ 年龄保密`
    }
}
console.log(getInfo2("carry"))

//3.3默认参数
function getInfo3(name:string,age:number=20):string{
    return `${name} ------ ${age}`
}
console.log(getInfo3("理查德"))

//3.4剩余参数
function sum(a:number,b:number,c:number):number{
    return a+b+c
}
console.log(sum(1,2,3))
//剩余参数
//三点运算符（剩余参数） 动态接受传递过来的值
function sum4(...result:number[]):number{
    let temp=0;
    for(let i=0;i<result.length;i++){
        temp+=result[i]
    }
    return temp
}
console.log(sum4(2,4,34))

//3.5 ts函数重载
//ts为类兼容es5 es6，重载和java有区别
//es5中 后定义的方法替换同名的方法
function myInfo(name:string):string
function myInfo(age:number):string;
function myInfo(str:any):any{
    if(typeof str=='string'){
        return str
    }else {
        return "我几年"+str+"岁"
    }
}

console.log(myInfo('占三'))
console.log(myInfo(88))

function myInfo2(name:string):string
function myInfo2(name:string,age?:number):string;
function myInfo2(name:any,age?:any):any{
    if(age){
        return `${name} xxx ${age}`
    }else {
        return `${name} xxx 年龄保密`
    }
}

console.log(myInfo2('占三'))
console.log(myInfo2('占三',30))


//3.6箭头函数 es6中的
setTimeout(()=>{
    console.log("time out")
},1000)