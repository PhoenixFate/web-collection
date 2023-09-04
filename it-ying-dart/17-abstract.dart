
/**
 * 使用abstract 定义抽象类和接口
 * 
 * 1.abstract
 * 2.没有方法体的就是抽象方法
 * 3.子类继承 必须实现抽象方法
 * 4.抽象类不能实例化
 * 
 * extends和implements区别: 
 * implements 必须实现和覆盖所有的方法
 * 
 */

/**
 * dart接口没有interface 关键字，普通类和抽象类都可以作为接口被实现
 * implements
 */

abstract class Animal{
  String name;
  void eat();
  void printInfo(){
    print("animal print info");
  }
}

class Dog extends Animal{
  @override
  void eat() {
    print("dog eat");
  }
}

class Cat extends Animal{
  @override
  void eat() {
    print("cat eat");
  }
}

class BidDog implements Animal{
  @override
  void eat() {
    print("big dog eat");
  }

  @override
  void printInfo() {
    print("big dog print info");
  }

  @override
  String name;
  
}

main(List<String> args) {
  Dog d1=new Dog();
  d1.eat();
  d1.printInfo();

  Cat c1=new Cat();
  c1.eat();
  c1.printInfo();


  BidDog bg=new BidDog();
  bg.printInfo();


}