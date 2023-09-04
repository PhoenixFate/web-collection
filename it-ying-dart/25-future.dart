/**
 *  Future future = new Future(() => null); 
 *  相当于 Future<Null> future = new Future(() => null); 
 *  泛型如果为null可以省略不写，为了便于维护和管理，开发中建议加上泛型。
 */
void testFuture() {
  Future<String> future = new Future(() => "abc");
  future.then((abc) {
    print("then: " + abc);
  }).whenComplete(() {
    print("whenComplete");
  }).catchError(() {
    print("catchError");
  });
}

main(List<String> args) {
  testFuture();
}
