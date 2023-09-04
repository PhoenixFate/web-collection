// 安装code runner插件，然后在当前文件 右击选择run code
// 或者在终端dart xxx.dart

/**
 * main方法
 * 程序主入口
 */
void main() {
  print('你好 dart');

  //定义变量
  //var会自动推断类型
  var str="hello world";
  print(str);

  var a=1234;
  print(a);


  //字符串
  String str2="my string";
  print(str2);

  int b=444;
  print(b);


  //常量
  //const or final
  final PI=3.14;
  print(PI);

  const c1=888;
  const int c2 =777;
  print(c1);
  print(c2);

  //final,const区别，final可以调用某个方法然后赋值给某个变量，const不行
  final d=new DateTime.now();
  print(d);
}
