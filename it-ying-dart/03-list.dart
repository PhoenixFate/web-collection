main(List<String> args) {
  //1.第一种定义list的方式
  var myList = ['aaa', 'bbb', 'ccc'];
  myList.add('ddd');
  print(myList);
  print(myList.length);
  print(myList[2]);
  print(myList.runtimeType.toString());

  //2.第二种定义list的方式
  var myList2 = new List();
  myList2.add("aaaa");
  myList2.add("bbbb");
  myList2.add("cccc");
  print(myList2);

  //定义list指定类型
  List<String> myList3 = new List<String>();
  myList3.add("value");
  myList3.add("ggg");
  print(myList3);
  print(myList3.runtimeType.toString());
}
