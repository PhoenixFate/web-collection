import 'dart:ffi';

main(List<String> args) {
  int a = 13;
  int b = 5;

  print(a + b);
  print(a - b);
  print(a * b);
  print(a / b); //2.6
  print(a % b); //取余
  print(a ~/ b); //整除

  print(a == b);
  print(a != b);
  print(a > b);
  print(a < b);
  print(a >= b);
  print(a <= b);

  bool b1 = false;
  print(!b1);
  bool b2 = true;
  print(b1 && b2);
  print(b1 || b2);

  // b??=23 表示b为空，则把23赋值给b
  var t;
  print("t: " + t.toString());
  t ??= 23;
  print("t: " + t.toString());
  var t2 = 19;
  t2 ??= 99;
  print("t2: " + t2.toString());

  //复合运算符
  // += -= *= /= %= ~/=

  //三目运算符
  var dd = b1 ? 88 : 99;
  print(dd);

  //if-else
  if (b1) {
    print("if");
  } else {
    print("else");
  }

  var score = 23;
  if (score >= 85) {
    print("A");
  } else if (score >= 75) {
    print("B");
  } else if (score >= 60) {
    print("C");
  } else {
    print("D");
  }

  var grade = 'A';
  switch (grade) {
    //The last statement of the 'case' should be 'break', 'continue', 'rethrow',
    case "A":
      print("case A");
      break;
    case "B":
      print("case B");
      break;
    case "C":
      print("case C");
      break;
    default:
      print("D");
  }

  // ?? 运算符
  var gg = 22;
  var ff = gg ?? 99; //gg为空执行后面
  print("ff: " + ff.toString());
}
