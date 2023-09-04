main(List<String> args) {
  //第一种定义Map
  var person = {
    "name": "张三",
    "age": 18,
    "jobs": ['程序员', '外卖员']
  };
  print(person.runtimeType.toString());
  print(person);
  print(person['name']);
  print(person['jobs']);

  //第二种定义Map
  var p = new Map();
  p['name'] = 'tom';
  p['age'] = 22;
  print(p);
  //使用is来判断类型
  print(p is Map);
}
