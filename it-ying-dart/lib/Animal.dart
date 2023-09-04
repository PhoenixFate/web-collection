/**
 * dart 和其他语言不一样，没有pulic private protected这些访问修饰词
 * 但可以通过 _ 把一个属性或方法定义为私有
 */

class Animal {
  //_ 表示私有
  //私有属性
  String _name;

  Animal(this._name);

  String getName(){
    return _name;
  }

  void setName(String name){
    this._name=name;
  }

  void _run(){
    print("只是一个私有方法run");
  }
  
  void execRun(){
    this._run();
  }
}


