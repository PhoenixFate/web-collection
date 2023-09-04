class Rectangle {
  num height;
  num width;

  Rectangle(this.height, this.width);
  // 实例化的默认值
  // Rectangle():_height=20,_width=30{};

  get Height {
    return this.height;
  }

  set Height(value) {
    this.height = value;
  }

  @override
  String toString() {
    return "height: ${height}; width: ${width}";
  }
}

main(List<String> args) {
  Rectangle r = new Rectangle(20.1, 22);
  print(r);
  print(r.Height);
  r.Height = 99.0;
  print(r.Height);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
  Rectangle rr = new Rectangle(3.2, 23.2)..Height = 24.32;
  print(rr);
}
