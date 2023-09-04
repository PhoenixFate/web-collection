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



main(List<String> args) {
  
  Object a=123;
  print(a);
  Object b=true;
  print(b);

  var p1=new Person("tom");
  print(p1.name);

  print(p1.getName());
  p1.setName("carry");

  print(p1.name);

  //命名构造函数
  Person p2=new Person.now();
  print(p2);

  print(new Person("tt").getName());
}