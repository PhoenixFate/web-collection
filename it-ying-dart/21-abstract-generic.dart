
//接口使用范型
abstract class Cache<T>{
  getByKey(String key);
  void setByKey(String key,T value);
}

class FileCache<T> implements Cache<T>{
  @override
  getByKey(String key) {
    return null;
  }
  @override
  void setByKey(String key, T value) {
  }
}

class MemoryCache<T> implements Cache<T>{
  @override
  getByKey(String key) {
    return null;
  }
  @override
  void setByKey(String key, T value) {
  }
}



main(List<String> args) {
  
  





}
