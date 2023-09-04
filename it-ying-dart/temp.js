var list=[1,2,3];
var list2=list.map((value)=>{
    if(value%2==0){
        return value*2;
    }
    return value;
})

console.log(list)
console.log(list2)