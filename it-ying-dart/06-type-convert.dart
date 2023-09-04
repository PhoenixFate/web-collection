main(List<String> args) {
  //Number String类型之间的转换
  String str1 = "123";
  var num1 = int.parse(str1);
  print(num1);

  String str2 = "234.23";
  var num2 = double.parse(str2);
  print(num2);

  String str3 = '';
  try {
    var num3 = double.parse(str3);
    print(num3);
  } catch (e) {
    print(e);
  }

  //Number to String
  var num9 = 123;
  print(num9.toString());

  //isEmpty
  var str = '';
  print("isEmpty: " + str.isEmpty.toString());

  //isNaN
  var num10 = 0 / 0;
  print(num10.isNaN);
}
