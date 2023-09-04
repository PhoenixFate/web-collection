import '16-extends.dart';

/**
 * mixins可以实现多继承
 * 
 * 1.作为mixins的类只能继承自object，不能继承其他类
 * 2.作为mixins的类不能有构造函数
 * 3.一个类可以mixins多个mixins类
 * 4.mixins绝不是继承也不是接口
 */

class Person{
  String name;
  int age;
  Person(this.name,this.age);
}


class A {
  void printA() {
    print("A");
  }

  void printB() {
    print("AB");
  }
}

class B {
  void printA() {
    print("BA");
  }

  void printB() {
    print("B");
  }
}

class C extends Person with A, B {
  C(String name, int age) : super(name, age);


}

main(List<String> args) {
  C c = new C("tom",88);
  c.printA();
  c.printB();
  print(c is A);
  print(c is B);
  print(c is Person);
  print(c is C);
  // print(C is A);
}
