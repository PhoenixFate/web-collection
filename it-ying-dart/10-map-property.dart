main(List<String> args) {
  var map1={
    "a":"this is a",
    "b":"this is b",
    "c":"this is c"
  };
  print(map1);
  map1.remove("a");
  print(map1);
  //添加数据
  map1['d']="d";
  print(map1);
  //addAll
  map1.addAll({'name':"tom"});
  print(map1);

  //获取所有的key
  print("keys: "+map1.keys.toList().toString());
  //获取所有的value
  print("values: "+map1.values.toList().toString());
  //isEmpty
  print(map1.isEmpty);
  //isNotEmpty
  print(map1.isNotEmpty);

  //是否有某个key
  print(map1.containsKey("name"));


  map1.forEach((key,value){
    print("$key : $value");
  });
}