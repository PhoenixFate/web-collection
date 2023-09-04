
/**
 * 静态方法不能访问非静态成员，非静态方法可以访问静态成员
 */
class Person{
  static String name="tom";
  int age;
  String job;
  static void show(){
    print("Person static show()");
  }

  void printInfo(){
    print(name);
    print(this.age);
  }

}

/**
 * Dart中对象操作符
 * ?: 条件运算符，不为空则执行
 * as 类型转换
 * is 类型判断
 * .. 及联操作
 */
main(List<String> args) {
  print(Person.name);
  Person.show();

  Person p1=new Person();
  p1.age=99;
  p1.printInfo();

  
  Person p2=null;
  //? 问号表示式
  p2?.printInfo();

  print(p1 is Person);
  print(p2 is Person);

  //as 强制类型转换
  var p3;
  p3="b";
  p3=new Person();
  (p3 as Person).printInfo();


  //.. 及联操作
  Person p4=new Person();
  p4..age=88
  ..job="it"
  ..printInfo();


}