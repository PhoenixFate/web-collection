
/**
 * Set
 * 无序且不能重复，不能通过索引获取
 */
main(List<String> args) {
  var set1=new Set();
  set1.add("香蕉");
  set1.add("牛奶");
  //自动会去掉重复的数据
  set1.add("香蕉");

  print(set1);

  set1.forEach((value){
    print(value);
  });

}