import 'lib/Person.dart';
import 'lib/Animal.dart';

main(List<String> args) {
  Person p1 = new Person("carry");
  print(p1.getName());
  print(p1.name);

  Animal animal = new Animal("梅花鹿");
  //print(animal.name);
  print(animal.getName());
  animal.execRun();
}
