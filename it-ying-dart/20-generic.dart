// 范型

T getData<T>(T value){
  return value;
}

//范型类
class PrintClass<T>{
  List list=new List<T>();
  void add(T value){
    this.list.add(value);
  }

  void printInfo(){
    for(int i=0;i<this.list.length;i++){
      print(this.list[i]);
    }
  }
}

main(List<String> args) {
  print(getData('xxx'));
  print(getData<int>(10));

  PrintClass<String> pc=new PrintClass();
  pc.add("ab");
  pc.add("bc");
  pc.add("dd");

  pc.printInfo();
}