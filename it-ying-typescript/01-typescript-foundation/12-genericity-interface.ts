//函数类型接口
interface ConfigFn {
    (value1: string, value2: string): string;
}
var setData: ConfigFn = function (value1: string, value2: string): string {
    return value1 + value2;
}
console.log(setData('name', '张三'))

//泛型接口
interface ConfigFn2 {
    <T1,T2>(value1: T1,value2:T2): string;
}

var getData12: ConfigFn2 = function <T1,T2>(value1: T1,value2:T2): string {
    return ""+value1+" --- "+value2
}

console.log(getData12<string,number>('张三',20));
