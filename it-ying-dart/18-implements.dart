
abstract class A{
  String name;
  printA();
}

abstract class B{
  printB();
}

//一个类实现多个接口
class C implements A,B{
  @override
  String name;

  @override
  printA() {
    print("A");
  }

  @override
  printB() {
    print("b");
  }
  
}


main(List<String> args) {
  
}