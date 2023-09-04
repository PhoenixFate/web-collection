main(List<String> args) {
  
  var myList=['aaa','bbb','ccc'];
  print(myList.length);
  print(myList.isEmpty);
  print(myList.isNotEmpty);
  print(myList.reversed);//返回的不是List对象
  print(myList.reversed.runtimeType.toString());
  var newList=myList.reversed.toList();
  print(newList);
  print(newList.runtimeType.toString());

  //add
  newList.add("ddd");
  print(newList);
  //addAll
  newList.addAll(['xxx','zzz']);
  print(newList);
  //indexOf
  print(newList.indexOf('aaa'));//查找不到返回-1
  //remove
  newList.remove('aaa');
  print(newList);
  //removeAt
  newList.removeAt(2);
  print(newList);
  //fillRange [start,end)全部修改
  newList.fillRange(1, 2,'new');
  print(newList);
  //insert
  newList.insert(1, 'insert');
  print("insert: "+newList.toString());
  //insertAll
  newList.insertAll(1, ['all1','all2']);
  print("insert all: "+newList.toString());
  //join 把list转字符串
  print("join: "+newList.join("-"));
  //把字符分割成数组
  String strList='香蕉-西瓜-牛奶';
  var list2=strList.split("-");
  print(list2);



  //循环数据的方法
  for(int i=0;i<myList.length;i++){
    print("for: "+myList[i]);
  }

  for(var item in myList){
    print("for in: "+item);
  }

  //forEach只是用来遍历的，不能修改里面的值
  myList.forEach((value){
    print("for each: $value");
    value=value+"ss";
  });
  print(myList);
  
  //map循环可以修改里面的值
  var new2=myList.map((value){
    print("map: $value");
    value=value+"ss";
    return value;
  });
  print(myList);
  print(new2);

  //where 返回满足条件的值
  var tempList=[1,2,3,4,5,6,7,8,9];
  var new3=tempList.where((value){
    return value>5;
  });
  print(new3);

  //any 有满足条件的，返回true
  var f=tempList.any((value){
    return value>5;
  });
  print(f);

  //every 每一个满足条件，返回true
  var f2=tempList.every((value){
    return value>5;
  });
  print(f2);
}