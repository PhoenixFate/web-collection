/*
1、vscode配置自动编译
    1.第一步   tsc --inti 生成tsconfig.json   改 "outDir": "./js",  
    2、第二步 任务 - 运行任务  监视tsconfig.json

2、typeScript中的数据类型
    typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验，在typescript中主要给我们提供了以下数据类型
        布尔类型（boolean）
        数字类型（number）
        字符串类型(string)
        数组类型（array）
        元组类型（tuple）
        枚举类型（enum）
        任意类型（any）
        null 和 undefined
        void类型
        never类型
*/

//布尔类型（boolean）
/*
es5的写法 （正确写法）  ts中（错误写法）
    var flag=true;
    flag=456;
*/

/*
 typescript中为了使编写的代码更规范，更有利于维护，增加了类型校验
 写ts代码必须指定类型
*/
var flag: boolean = true;
// flag=123;  //错误
flag = false;  //正确
console.log("boolean: " + flag);

// 数字类型（number）
var num: number = 123;
num = 456;
console.log("number: " + num); /正确/
//num='str';    //错误

// 字符串类型(string)
var str: string = 'this is ts';
str = 'haha';  //正确
console.log("string: " + str)
//str=true;  //错误

// 数组类型（array）  ts中定义数组有两种方式
// var arr=['1','2'];  //es5定义数组
// 1.第一种定义数组的方式
var arr: number[] = [11, 22, 33];
console.log("array: " + arr);
var arr2: string[] = ['123', '345', 'bcd']
console.log("string array: " + arr2)

//2.第二种定义数组的方式
var arr3: Array<number> = [11, 22, 33];
console.log(typeof (arr3))
console.log("Array<number>")
console.log(arr3)


//元组类型（tuple）  属于数组的一种
//元祖类型 数组中的类型只能一种，但元祖中的类型可以多种
let tuple2: [number, string, number] = [123, 'this is ts', 234];
console.log(tuple2);

/*
枚举类型（enum）
    随着计算机的不断普及，程序不仅只用于数值计算，还更广泛地用于处理非数值的数据。
    例如：性别、月份、星期几、颜色、单位名、学历、职业等，都不是数值数据。
    在其它程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，易读性差。
    如果能在程序中用自然语言中有相应含义的单词来代表某一状态，则程序就很容易阅读和理解。
    也就是说，事先考虑到某一变量可能取的值，尽量用自然语言中含义清楚的单词来表示它的每一个值，
    这种方法称为枚举方法，用这种方法定义的类型称枚举类型。
    enum 枚举名{
        标识符[=整型常数],
        标识符[=整型常数],
        ...
        标识符[=整型常数],
    } ;
 */

enum Flag { success, error };
let status1: Flag = Flag.success;
console.log("status1");
console.log(status1);
enum Sex { male = 1, female = 2 }
let sex: Sex = Sex.male
console.log(sex)

enum Color { blue, red, 'orange' };
var c: Color = Color.orange;
console.log(c);   //1  如果标识符没有赋值 它的值就是下标


enum Err { 'undefined' = -1, 'null' = -2, 'success' = 1 };
var e: Err = Err.null;
console.log(e);

// 任意类型（any）
let a:any=123
console.log(a)
let b:any=true
console.log(b)
//ts 基本类型中没有object类型
// let d:object="sbc"
// console.log(d)
let arr5:any[]=['abc',2,3]
console.log(arr5)
let arr6:Array<any>=[34,'sdd',23]
console.log(arr6)

// null 和 undefined (这两个是其他类型的子类型)
// let f:number
//Variable 'f' is used before being assigned.ts(2454)
// console.log(f)
let h:undefined
console.log(h)
let i:null
i=null
console.log(i)

// void类型 :typescript中的void表示没有任何类型，一般用于定义方法的时候方法没有返回值。
function run0():void{
    console.log("run")
}
run0()

// never类型:是其他类型 （包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明never的变量只能被never类型所赋值。
let n:never
// console.log(n)
let y:never
// y=(()=>{
//     throw new Error("my error")
// })()
// console.log(typeof(y))
// console.log(y)