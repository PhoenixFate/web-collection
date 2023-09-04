main(List<String> args) {
  //自增自减
  var a=10;
  print(a++);
  print(++a);

  print(a--);
  print(--a);

  for(int i=1;i<10;i++){
    print(i);
  }

  int i=0;
  while(i<10){
    print("while: "+i.toString());
    i++;
  }

  int j=0;
  do {
    print("do while: "+j.toString());
    j++;
  } while (j<10);

}