class Person{

  String name;
  int age;

  Person(String name){
    this.name=name;
  }

  //默认构造函数的简写方式
  //并不支持构造函数的重载
  // Person(this.name,this.age);

  //命名构造函数
  Person.now(){
    print("我是命名构造函数");
  }


  String getName(){
    return this.name;
  }

  void setName(String name){
    this.name=name;
  }

}