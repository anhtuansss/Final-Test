"use client";

import React, { useState, useEffect } from "react";

interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number[];
  isMultiple: boolean;
  explanation: string;
  isEssay?: boolean;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "Phát biểu nào đúng về khởi tạo và hủy bỏ đối tượng trong Java?",
    options: [
      "Trong Java không có phương thức hủy",
      "Java có phương thức có thể dùng thay thế phương thức hủy là phương thức finalize",
      "Một lớp luôn luôn có ít nhất 1 phương thức khởi tạo",
      "Mỗi đối tượng khi tồn tại và hoạt động được hệ điều hành cấp phát một vùng nhớ để lưu lại các dữ liệu thành phần",
      "Các thuộc tính kiểu DL nguyên thủy (int, char, boolean,...) của đối tượng phải được Lập trình viên khởi tạo trước khi sử dụng"
    ],
    correctAnswer: [0, 1, 2, 3],
    isMultiple: true,
    explanation: "Java không có hàm hủy (destructor) như C++ nhưng dùng finalize() để dọn dẹp. Mỗi lớp luôn có ít nhất 1 constructor, và hệ điều hành sẽ cấp phát vùng nhớ khi đối tượng được tạo. Các kiểu nguyên thủy sẽ có giá trị mặc định nên không bắt buộc khởi tạo thủ công."
  },
  {
    id: 2,
    question: "Cho chương trình Java sau được lưu toàn bộ trong file Test.java (chú ý số dòng được đánh ngoài lề chương trình). Nhận định nào sau đây đúng?",
    code: `public class Test {
  static int calculate(int no, int nol) throw Exception { //dong 2
    if (nol == 0) throw new Exception(""); //dong 3
    int num = no / nol; //dong 4
    return num;
  }
  public static void main(String[] args) {
  }
}`,
    options: [
      "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 2",
      "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 3",
      "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 4",
      "Chương trình biên dịch thành công"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Lỗi ở dòng 2 do sai cú pháp. Từ khóa để khai báo ném ngoại lệ ở chữ ký phương thức phải là 'throws' (có s), không phải 'throw'."
  },
  {
    id: 3,
    question: "Chọn những phát biểu đúng về Java collection framework",
    options: [
      "List và ArrayList đều là các class",
      "List kế thừa (extends) Collection",
      "Java collection framework không hỗ trợ kiểu dữ liệu tập hợp",
      "Java collection framework không hỗ trợ kiểu dữ liệu dictionary"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "List là interface kế thừa từ interface Collection, còn ArrayList là class triển khai interface List. Framework cũng có hỗ trợ cả tập hợp (Set) và từ điển (Map)."
  },
  {
    id: 4,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: `public class MyClass {
  int i = 111;
  static int j = 222;
  static void methodOne(int i, int j) {
    System.out.print(i);
    System.out.print(j);
  }
  public static void main(String[] args) {
    methodOne(333, 444);
  }
}`,
    options: [
      "111222",
      "333222",
      "333444"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Phương thức methodOne nhận hai tham số cục bộ i và j. Do đó nó sẽ in ra giá trị của các đối số truyền vào (333 và 444) thay vì in các biến của lớp."
  },
  {
    id: 5,
    question: "Lựa chọn nào đúng với những nhận xét sau đây trong Java:\nNhận xét 1. Nếu lập trình viên không tạo phương thức khởi tạo cho lớp thì Java sẽ tự động tạo phương thức khởi tạo mặc định cho lớp\nNhận xét 2. Có thể viết chồng phương thức khởi tạo (constructor overloading)\nNhận xét 3. Có thể viết đè phương thức khởi tạo (constructor overriding) kế thừa từ lớp cha",
    options: [
      "Tất cả nhận xét đều đúng",
      "Tất cả nhận xét đều sai",
      "Nhận xét 1 và 2 đúng, nhận xét 3 sai",
      "Nhận xét 1 đúng, nhận xét 2 và 3 sai"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Java tự động tạo constructor mặc định nếu lớp không định nghĩa. Các constructor có thể nạp chồng (overload) nhưng không thể bị ghi đè (override) như phương thức thông thường."
  },
  {
    id: 6,
    question: "Đoạn mã Java sau có 5 phương thức được đánh số (1) (2) (3)... Giả sử phương thức được đánh số (1) là đúng. Chỉ ra các phương thức là nạp chồng với phương thức này",
    code: `class A {
  // (1)
  public int method(int a) {
    return a * 2;
  }
  // (2)
  protected int method(int a) {
    return a * 3;
  }
  // (3)
  public double method(int a) {
    return a * 4;
  }
  // (4)
  public int method(double a) {
    return (int) a * 5;
  }
}
class B {
  // (5)
  public int method(int a, int b) {
    return a + b;
  }
}`,
    options: [
      "Phương thức số (2)",
      "Phương thức số (3)",
      "Phương thức số (4)",
      "Phương thức số (5)"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Nạp chồng (overloading) đòi hỏi các phương thức phải có cùng tên nhưng khác nhau về danh sách hoặc kiểu tham số trong cùng một lớp. Phương thức (4) đáp ứng điều kiện vì dùng kiểu tham số double."
  },
  {
    id: 7,
    question: "Kết quả thực thi đoạn code sau là gì",
    code: `public class Test {
  public static int sCounter = 0;
  public int counter;
  
  public static void main(String[] args) {
    Test t1 = new Test();
    t1.counter = 5;
    t1.sCounter = 6;
    System.out.print(t1.counter + "" + t1.sCounter + "");
    
    Test t2 = new Test();
    System.out.print(t2.counter + "" + t2.sCounter + "");
    
    t2.sCounter = 7;
    System.out.print(t1.counter + "" + t1.sCounter + "");
  }
}`,
    options: [
      "560657",
      "565657",
      "560056",
      "560057",
      "565656",
      "560656"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Biến tĩnh sCounter được dùng chung cho mọi đối tượng. Khi đổi giá trị sCounter của t2 thành 7, sCounter của t1 cũng là 7. Biến counter (không tĩnh) thì độc lập trên từng instance."
  },
  {
    id: 8,
    question: "Chọn những phát biểu đúng về kết tập (Aggregation)",
    options: [
      "Ký hiệu kết tập trong UML, hình thoi đặt ở lớp toàn thể",
      "Đối tượng lớp thành phần được khởi tạo trước đối tượng lớp toàn thể",
      "Kết tập là một loại hợp thành (Composition)",
      "Kết tập là một loại liên kết (Association)"
    ],
    correctAnswer: [0, 3],
    isMultiple: true,
    explanation: "Trong sơ đồ UML, quan hệ kết tập dùng hình thoi rỗng gắn ở đầu liên kết phía lớp toàn thể. Kết tập chính là một dạng đặc biệt của liên kết (Association)."
  },
  {
    id: 9,
    question: "Cho chương trình như dưới đây được lưu toàn bộ trong file B.java. Lựa chọn nào là chính xác?",
    code: `public class B {
  public static void main(String[] args) {
    for (int i = 2; i < 4; i++)
      for (int j = 2; j < 4; j++)
        if (i <= j) break;
        else System.out.print("i=" + i + " j=" + j);
  }
}`,
    options: [
      "Lỗi khi biên dịch",
      "Chương trình không lỗi biên dịch nhưng khi chạy xuất hiện exception",
      "Chương trình chạy thông và in ra màn hình i=3 j=2",
      "Chương trình chạy thông và in ra màn hình i=4 j=3"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Khi i=3 và j=2, điều kiện i <= j bị sai nên chạy vào khối else in ra i=3 j=2. Sau đó vòng lặp tiếp tục thực thi và không gây lỗi."
  },
  {
    id: 10,
    question: "Đoạn chương trình sau báo lỗi biên dịch. Thêm câu lệnh nào vào dòng trống để chương trình không còn báo lỗi?",
    code: `class X {
  public X(int i) {
    System.out.println(1);
  }
}
class Y extends X {
  public Y() {
    // ...
    System.out.println(2);
  }
}`,
    options: [
      "super();",
      "super(1);",
      "Không cần thêm lệnh vào dòng ...",
      "System.out.println(1);"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Lớp cha X chỉ có constructor có tham số (không có constructor mặc định). Do đó lớp con Y phải gọi constructor cha một cách tường minh thông qua từ khóa super kèm tham số hợp lệ như super(1)."
  },
  {
    id: 11,
    question: "Chọn những phát biểu đúng",
    options: [
      "Hợp thành (composition) cũng là một loại kết tập (aggregation)",
      "Kết tập (aggregation) cũng là một loại liên kết (association)",
      "Trong quan hệ hợp thành, đối tượng lớp toàn thể (Whole) sở hữu đối tượng lớp thành phần (Part), chịu trách nhiệm tạo và hủy bỏ đối tượng lớp thành phần",
      "Trong quan hệ hợp thành, đối tượng lớp thành phần (Part) không thể tồn tại độc lập, mà phải gắn kèm với đối tượng lớp toàn thể (Whole)",
      "Trong quan hệ hợp thành, đối tượng lớp thành phần (Part) có thể thuộc về nhiều hơn một lớp toàn thể (Whole)"
    ],
    correctAnswer: [0, 1, 2, 3],
    isMultiple: true,
    explanation: "Hợp thành (Composition) là hình thức gắn kết mạnh mẽ của kết tập, nơi mà đối tượng thành phần không thể tồn tại độc lập, và một thành phần không thể thuộc nhiều khối toàn thể cùng lúc."
  },
  {
    id: 12,
    question: "Những phát biểu nào sau đây là sai:",
    options: [
      "Một phương thức final có thể được nạp chồng trong Java",
      "Một phương thức final có thể được ghi đè trong Java",
      "Ta có thể khai báo một phương thức là abstract final trong Java",
      "Ta không thể khai báo một phương thức là abstract final trong Java"
    ],
    correctAnswer: [1, 2],
    isMultiple: true,
    explanation: "Phương thức final không thể bị ghi đè (override) ở lớp con. Ta cũng không thể dùng cả từ khóa abstract và final cho cùng một phương thức vì abstract bắt buộc lớp con ghi đè trong khi final lại cấm điều đó."
  },
  {
    id: 13,
    question: "Xét chương trình sau. Chọn những dòng in ra màn hình kết quả là true",
    code: `class Test {
  public static void main(String[] args) {
    String s1 = new String("test");
    String s2 = new String("test");
    String s3 = "test";
    String s4 = "test";
    System.out.println(s1 == s2); // dong 7
    System.out.println(s3 == s4); // dong 8
    System.out.println(s1 == s3); // dong 9
    System.out.println(s1.equals(s2)); // dong 10
    System.out.println(s2.equals(s3)); // dong 11
  }
}`,
    options: [
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    correctAnswer: [1, 3, 4],
    isMultiple: true,
    explanation: "Dòng 8 đúng vì s3 và s4 đều trỏ vào cùng 1 đối tượng trong String Pool. Dòng 10 và 11 đúng vì phương thức equals() so sánh giá trị nội dung của các chuỗi (đều là 'test'). Toán tử == với các biến khai báo bằng new String sẽ trả về false do khác địa chỉ nhớ."
  },
  {
    id: 14,
    question: "Cho biết kết quả của đoạn code sau",
    code: `public class Test {
  int _$ ;
  int $7 ;
  int do;
  
  public static void main(String argv[]) {
    Test test = new Test();
    test.$7 = 7;
    test.do = 9;
    System.out.println(test.$7);
    System.out.println(test.do);
    System.out.println(test._$);
  }
}`,
    options: [
      "790",
      "709",
      "Lỗi biên dịch - $7 không phải là tên biến hợp lệ",
      "Lỗi biên dịch - do không phải là tên biến hợp lệ"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Trong Java, 'do' là một từ khóa (keyword) được dành riêng cho vòng lặp do-while, do vậy không thể được sử dụng để làm tên biến và sẽ dẫn tới lỗi biên dịch."
  },
{
    id: 15,
    question: "Đoạn mã sau khi chạy in ra gì ?",
    code: `class Person {
  protected String name;
}
class Employee extends Person {
  private int salary;
  public Employee(int salary) {
    this.salary = salary;
  }
  public int getSalary() {
    return salary;
  }
  public static void main(String[] args) {
    Person p = new Employee(15);
    System.out.println(p.getSalary()); // dong 14
  }
}`,
    options: [
      "Báo lỗi dòng 13",
      "Báo lỗi dòng 14",
      "0",
      "15"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Ở thời điểm biên dịch (compile-time), Java kiểm tra sự tồn tại của phương thức dựa vào kiểu khai báo của biến (lớp Person). Vì lớp Person không định nghĩa getSalary() nên sẽ xảy ra lỗi biên dịch ở dòng gọi phương thức này."
  },
  {
    id: 16,
    question: "Câu lệnh nào sau đây được dùng để cấp phát một mảng array trong Java?",
    options: [
      "int[] array = new allocate[10];",
      "int[] array = new arr[10];",
      "int[] array = new int[10];",
      "int[] array = alloc int[10];"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Trong Java, từ khóa 'new' dùng để cấp phát mảng kèm theo kiểu dữ liệu nguyên thủy hoặc đối tượng và kích thước mảng. Các từ khóa như 'allocate' hay 'alloc' không tồn tại trong cú pháp Java."
  },
  {
    id: 17,
    question: "Số byte của các biến int, long, float, double trong Java lần lượt là",
    options: [
      "4, 8, 16, 32",
      "4, 8, 8, 16",
      "4, 8, 4, 8",
      "4, 8, 12, 16"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Kích thước chuẩn của các kiểu dữ liệu nguyên thủy trong Java: int (4 byte), long (8 byte), float (4 byte) và double (8 byte)."
  },
  {
    id: 18,
    question: "Số lượng tối đa thể hiện (instance) được khởi tạo ra (instantiated) của một lớp trừu tượng trong Java có thể là bao nhiêu?",
    options: [
      "1",
      "2",
      "3",
      "0",
      "Rất nhiều"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Lớp trừu tượng (abstract class) không thể khởi tạo đối tượng trực tiếp bằng từ khóa 'new'. Chỉ có thể khởi tạo đối tượng thông qua các lớp con kế thừa từ nó."
  },
  {
    id: 19,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: `public class Demo {
  public static void main(String[] ss) {
    System.out.print("Begin ");
    try {
      int i = 5/0;
      System.out.print("Try ");
    } catch (Exception ex) {
      System.out.print("Catch ");
    } finally {
      System.out.print("Finally ");
    }
    System.out.print("End ");
  }
}`,
    options: [
      "Begin End",
      "Begin Catch End",
      "Begin Try Catch End",
      "Begin Catch Finally End",
      "Begin Try Catch Finally End"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Đầu tiên in 'Begin '. Phép chia 5/0 ném ngoại lệ ArithmeticException làm bỏ qua dòng in 'Try', nhảy thẳng vào catch in 'Catch '. Khối finally luôn thực thi nên in 'Finally '. Cuối cùng tiếp tục chương trình in 'End '."
  },
  {
    id: 20,
    question: "Nhận định nào sau đây là đúng với chương trình này?",
    code: `class Hello {
  static int add(int i, int j) {
    return i + j;
  }
}
public class Helloworld extends Hello {
  public static void main(String argv[]) {
    short sNum = 10;
    System.out.println(add(sNum, 6));
  }
}`,
    options: [
      "Chương trình chạy và in 16 ra màn hình",
      "Lỗi khi biên dịch",
      "Lỗi khi chạy chương trình",
      "Chương trình chạy và in 6 ra màn hình"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Java tự động thực hiện ép kiểu ngầm định (upcasting) an toàn từ kiểu dữ liệu nhỏ (short) sang kiểu dữ liệu lớn hơn (int) nên không có lỗi và tính tổng trả về 16."
  },
  {
    id: 21,
    question: "Nhận định nào sau đây đúng:",
    code: `class A {}
class B extends A {}

public class Test {
  public static void main(String[] args){
    A a = new A();
    B b = new B();
    a = b; //cau lenh gan
  }
}`,
    options: [
      "Câu lệnh gán a = b; là chuyển đổi kiểu dữ liệu tham chiếu upcasting",
      "Câu lệnh gán a = b; là chuyển đổi kiểu dữ liệu tham chiếu downcasting",
      "Các nhận định về câu lệnh gán a = b; đưa ra ở đây đều không đúng",
      "Câu lệnh gán a = b; là chuyển đổi kiểu dữ liệu tham chiếu peertopeercasting"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Việc gán một đối tượng của lớp con (b kiểu B) cho một biến tham chiếu của lớp cha (a kiểu A) là quá trình upcasting ngầm định, hoàn toàn hợp lệ và an toàn trong Java."
  },
  {
    id: 22,
    question: "Đoạn mã sau khi chạy in ra gì ?",
    code: `class A {
  static void methodOne() {
    System.out.print("BBB");
  }
}
class B extends A {
  static void methodOne() {
    System.out.print("AAA");
  }
}
public class Test {
  public static void main(String[] ss) {
    A a = new B();
    a.methodOne();
  }
}`,
    options: [
      "BBB",
      "AAABBB",
      "BBBAAA",
      "AAA"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Phương thức tĩnh (static) bị che khuất (method hiding) chứ không được ghi đè (overriding). Trình biên dịch sẽ dựa vào kiểu khai báo của biến (lớp A) để gọi hàm, do đó in ra BBB."
  },
  {
    id: 23,
    question: "Nếu trong đoạn mã sau có lỗi, chọn những phương án có thể dùng để sửa lỗi cho đoạn mã",
    code: `interface X {
  public void methodX();
}
interface Y extends X {
  public void methodY();
}
class Z implements Y {
  public void methodY() {
    System.out.println("Method Y");
  }
}`,
    options: [
      "Lớp Z phải sửa phạm vi truy cập của phương thức methodY() thành mặc định",
      "Không có cách nào trong số các cách còn lại",
      "Lớp Z phải triển khai phương thức methodX() của lớp X",
      "Lớp Z phải được khai báo là abstract"
    ],
    correctAnswer: [2, 3],
    isMultiple: true,
    explanation: "Lớp Z implements Y (mà Y lại kế thừa X) nên Z buộc phải triển khai mọi phương thức trừu tượng của cả X và Y. Để hết lỗi, Z phải implement thêm methodX() hoặc Z phải tự khai báo mình là abstract class."
  },
  {
    id: 24,
    question: "Cho biết kết quả của đoạn code sau",
    code: `public class A {
  int k;
  boolean istrue;
  static int p;
  public void printValue() {
    System.out.print(k + " ");
    System.out.print(istrue + " ");
    System.out.print(p);
  }
}
public class Test {
  public static void main(String argv[]) {
    A a = new A();
    a.printValue();
  }
}`,
    options: [
      "0 false 0",
      "0 true 0",
      "0 0 0",
      "Lỗi biên dịch."
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Trong Java, các thuộc tính của lớp (instance field và static field) sẽ tự động nhận giá trị mặc định nếu không khởi tạo. Kiểu nguyên thủy int là 0, kiểu boolean là false."
  },
  {
    id: 25,
    question: "Trong UML, tên lớp trừu tượng sẽ",
    options: [
      "Được in nghiêng",
      "Được in đậm",
      "Được gạch chân",
      "Được viết bình thường"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Theo chuẩn UML, tên của một lớp trừu tượng (abstract class) được viết in nghiêng để phân biệt trực quan với các lớp thông thường."
  },
  {
    id: 26,
    question: "Kết quả của đoạn code sau là gì ?",
    code: `public class A {
  int i = 10;
  public void printValue() {
    System.out.print("Value-A ");
  }
}
public class B extends A {
  int i = 12;
  public void printValue() {
    System.out.print("Value-B ");
  }
}
public class Test {
  public static void main(String argv[]) {
    A a = new B();
    a.printValue();
    System.out.println(a.i);
  }
}`,
    options: [
      "Value-B 11",
      "Value-B 10",
      "Value-A 10",
      "Value-A 11"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Phương thức tuân theo đa hình nên a.printValue() gọi bản của lớp con B (Value-B). Thuộc tính thì không có đa hình, do a được khai báo kiểu A nên a.i sẽ lấy biến i của lớp cha (10)."
  },
  {
    id: 27,
    question: "Cho chương trình như dưới đây được lưu toàn bộ trong file B.java. Lựa chọn nào là chính xác?",
    code: `class A {
  int a = 5;
  protected int b = 6;
  public int c = 7;
}
public class B {
  public static void main(String[] args) {
    A a = new A();
    System.out.print("" + a.a); // dong 10
    System.out.print("" + a.b); // dong 11
    System.out.println("" + a.c);
  }
}`,
    options: [
      "Lỗi khi biên dịch ở dòng 10",
      "Lỗi khi biên dịch ở dòng 11",
      "Chương trình không lỗi biên dịch nhưng khi chạy xuất hiện exception",
      "Chương trình chạy thành công và in ra màn hình 567"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Lớp A và lớp B cùng nằm trong một file (cùng package). Do vậy lớp B có thể truy cập hợp lệ các biến của A có mức độ truy cập mặc định (default), protected và public."
  },
  {
    id: 28,
    question: "Vai trò của biểu đồ use case",
    options: [
      "Mô hình chức năng hệ thống với các tác nhân",
      "Biểu diễn chuỗi các hoạt động hoặc luồng điều khiển có thứ tự của hệ thống",
      "Biểu diễn các lớp và mối quan hệ giữa các lớp",
      "Biểu diễn trình tự trao đổi thông điệp giữa các đối tượng theo thời gian"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Biểu đồ Use Case dùng để mô hình hóa yêu cầu và chức năng của hệ thống dưới góc nhìn người dùng, mô tả các tương tác giữa tác nhân (actor) bên ngoài với hệ thống."
  },
  {
    id: 29,
    question: "Chọn những phát biểu đúng về 2 lớp Person và Employee:",
    code: `final class Person {
  protected String name;
  protected String print() {
    return name;
  }
}
class Employee extends Person {
  protected String print() {
    System.out.println(super.print());
    return super.print();
  }
}`,
    options: [
      "Có lỗi biên dịch ở lớp Person",
      "Có lỗi biên dịch ở lớp Employee",
      "Không có lỗi biên dịch nào ở cả 2 lớp"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Lớp Person được khai báo là 'final' có nghĩa là nó không cho phép bất kỳ lớp nào khác kế thừa. Lớp Employee cố tình extends Person sẽ bị trình biên dịch báo lỗi."
  },
  {
    id: 30,
    question: "Đoạn mã sau khi chạy in ra gì ?",
    code: `class A {
  int i = 200;
}
class B extends A {
  int i = 100;
}
public class Test {
  public static void main(String[] args) {
    B a = new B();
    System.out.println(a.i);
  }
}`,
    options: [
      "200",
      "100",
      "Báo lỗi biên dịch"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Trong Java, các thuộc tính (biến) không hỗ trợ tính đa hình ghi đè mà chỉ có tính năng che khuất (shadowing). Do biến tham chiếu 'a' có kiểu là lớp con B, chương trình sẽ gọi trực tiếp biến 'i' của lớp B và in ra 100."
  },
  {
    id: 31,
    question: "Cho lớp Person như sau. Lớp Employee sau đây có lỗi ở những dòng nào?",
    code: `package p1;
public class Person {
  private int a1;
  int a2;
  protected int a3;
  public int a4;
}

// File Employee.java
package p2;
import p1.Person;
public class Employee extends Person {
  public void print() {
    System.out.println(a1); // dong 5
    System.out.println(a2); // dong 6
    System.out.println(a3); // dong 7
    System.out.println(a4); // dong 8
  }
}`,
    options: [
      "Dòng 5",
      "Dòng 6",
      "Dòng 7",
      "Dòng 8",
      "Không bị lỗi ở dòng nào"
    ],
    correctAnswer: [0, 1],
    isMultiple: true,
    explanation: "Biến a1 mang phạm vi private nên chỉ truy cập được bên trong lớp Person. Biến a2 mang phạm vi mặc định (default/package-private) nên không thể truy cập từ package p2 khác, dẫn đến báo lỗi tại dòng 5 và 6."
  },
  {
    id: 32,
    question: "Đâu là các đặc tính của lập trình hướng đối tượng",
    options: [
      "Tất cả đều là đối tượng",
      "Chương trình phần mềm có thể coi là một tập hợp các đối tượng tương tác với nhau",
      "Mỗi đối tượng trong chương trình có cực dữ liệu độc lập của mình và chiếm bộ nhớ riêng của mình.",
      "Mỗi đối tượng đều có dạng đặc trưng của lớp các đối tượng đó",
      "Tất cả các đối tượng thuộc về cùng một lớp đều có các hành vi giống nhau"
    ],
    correctAnswer: [0, 1, 2, 3, 4],
    isMultiple: true,
    explanation: "Lập trình hướng đối tượng (OOP) coi mọi thực thể là đối tượng, mang trạng thái bộ nhớ độc lập và hành vi tương ứng với lớp. Các đối tượng này sẽ tương tác với nhau để vận hành toàn bộ chương trình phần mềm."
  },
  {
    id: 33,
    question: "Phương thức khởi tạo có thể dùng kết hợp với từ khóa nào",
    options: [
      "Có thể dùng với cả abstract và static",
      "Có thể dùng với abstract, không thể dùng với static",
      "Có thể dùng với static, không thể dùng với abstract",
      "Không thể dùng với cả abstract và static"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Phương thức khởi tạo (constructor) dùng để cấp phát cho một đối tượng cụ thể (nên không thể là static) và bắt buộc phải có thân hàm để thực thi lệnh (nên không thể là abstract)."
  },
  {
    id: 34,
    question: "Kết quả thực thi chương trình sau là gì",
    code: `public class Test {
  public static void p(String s) {
    System.out.print(s + " ");
  }
  public static void f(int i) { p("int"); }
  public static void f(short h) { p("short"); }
  public static void f(char c) { p("char"); }
  public static void f(long l) { p("long"); }
  public static void f(double l) { p("double"); }
  public static void f(float f) { p("float"); }
  
  public static void main(String[] args) {
    f(5);
    f('c');
    f(5.5);
    f(7L);
  }
}`,
    options: [
      "int char double long",
      "int int float long",
      "short char float long",
      "Lỗi biên dịch ở 1 trong các lời gọi hàm f (trong hàm main)"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Java tự động chọn phương thức nạp chồng (overloaded) phù hợp nhất với kiểu dữ liệu truyền vào: 5 là int, 'c' là char, 5.5 mặc định là double, và 7L được chỉ định rõ là long."
  },
  {
    id: 35,
    question: "Kết quả của đoạn code sau:",
    code: `public class Test {
  public static void main(String[] args) {
    System.out.println(032);
    System.out.println(0x2a);
    System.out.println(0X2a);
    System.out.println(0x2A);
    System.out.println(0X2A);
  }
}`,
    options: [
      "Lỗi ở dòng 1, 2, 3, 4, 5",
      "Lỗi ở dòng 1",
      "Lỗi ở dòng 2, 3, 4",
      "In ra 5 dòng, mỗi dòng lần lượt là các số 26 42 42 42 42",
      "In ra 5 dòng, mỗi dòng lần lượt là các số 26 32 32 32 32"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Tiền tố '0' chỉ định số hệ bát phân (octal) nên 032 bằng 26 trong hệ thập phân. Tiền tố '0x' hoặc '0X' chỉ định số hệ thập lục phân (hexadecimal) nên 0x2A tương đương 42, không phân biệt chữ hoa hay chữ thường."
  },
  {
    id: 36,
    question: "Chương trình Java sau được lưu toàn bộ trong file Test.java sẽ cho kết quả là gì?",
    code: `public class Test {
  public static void main(String args[]) {
    if (args.length > 0)
      System.out.println(args.length);
  }
}`,
    options: [
      "Chương trình chạy thành công nhưng không in gì ra màn hình",
      "Chương trình chạy thành công và in 0 ra màn hình",
      "Chương trình chạy thành công và in 1 ra màn hình",
      "Lỗi biên dịch"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Khi khởi chạy chương trình mà không truyền bất kỳ tham số (arguments) nào từ command line, mảng 'args' sẽ rỗng (length = 0). Điều kiện if sai nên không có gì được in ra."
  },
  {
    id: 37,
    question: "Cho lớp Person như sau. Chọn những phát biểu đúng về lớp Employee sau đây:",
    code: `class Person {
  protected String name;
  private String print1() {
    return name;
  }
  protected String print2() {
    return name.toUpperCase();
  }
  protected String print3() {
    return name.toLowerCase();
  }
}
class Employee extends Person {
  private void print1() {
    System.out.println(name);
  }
  protected void print2() {
    System.out.println("Name: " + name.toUpperCase());
  }
  String print3() {
    return "Name: " + name.toLowerCase();
  }
}`,
    options: [
      "Lỗi biên dịch ở phương thức print1",
      "Lỗi biên dịch ở phương thức print2",
      "Lỗi biên dịch ở phương thức print3",
      "Không bị lỗi gì cả"
    ],
    correctAnswer: [1, 2],
    isMultiple: true,
    explanation: "Phương thức print2() lỗi do đổi kiểu trả về từ String sang void (không tương thích). Phương thức print3() lỗi do hạ mức cấp quyền truy cập từ protected xuống default. Phương thức print1() hợp lệ vì lớp cha định nghĩa private, lớp con coi như tạo hàm mới độc lập."
  },
  {
    id: 38,
    question: "Đoạn mã sau bị lỗi biên dịch ở những dòng nào?",
    code: `package hust.oop;
public class Main {
  static short check(long l) {
    int i = (int) l;
    return i; // dong 5
  }
  
  public static void main(String[] args) {
    double d = 10.25;
    float f = d; // dong 10
    byte b = (byte) check(f); // dong 11
    System.out.println(b);
  }
}`,
    options: [
      "Dòng 5",
      "Dòng 10",
      "Dòng 11",
      "Dòng 12"
    ],
    correctAnswer: [0, 1, 2],
    isMultiple: true,
    explanation: "Dòng 5 lỗi vì trả về biến int cho phương thức định nghĩa kiểu short. Dòng 10 lỗi vì không thể gán trực tiếp giá trị double vào biến float mà không ép kiểu. Dòng 11 lỗi do gọi hàm check() với kiểu float trong khi hàm yêu cầu kiểu long."
  },
  {
    id: 39,
    question: "Đoạn mã sau khi chạy in ra gì ?",
    code: `class B {
  B() {
    System.out.print("Class B.");
  }
}
class A extends B {
  A() {
    System.out.print("Class A.");
  }
}
public class Test {
  public static void main(String[] ss) {
    A a = new A();
    B c = new B();
    A b = new A();
  }
}`,
    options: [
      "Class A.Class A.Class B.Class A.Class A.",
      "Class B.Class A.Class B.Class B.Class A.",
      "Class A.Class A.Class B.Class A.",
      "Class A.Class B.Class A."
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Khi đối tượng của lớp con A được khởi tạo, nó sẽ ưu tiên gọi constructor của lớp cha B trước, in ra 'Class B.Class A.'. Hàm main gọi tuần tự khởi tạo A, B, A nên sẽ in ra chuỗi kết quả: Class B.Class A.Class B.Class B.Class A."
  },
  {
    id: 40,
    question: "Đoạn mã sau khi chạy in ra gì ?",
    code: `class M {
  int i = 50;
  public M(int j) {
    System.out.print(i);
    this.i = j * 10;
  }
}
class N extends M {
  public N(int j) {
    super(j);
    System.out.print(i);
    this.i = j * 20;
  }
}
public class Test {
  public static void main(String[] ss) {
    N n = new N(25);
    System.out.print(n.i);
  }
}`,
    options: [
      "0500",
      "02500500",
      "50250500",
      "505050"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Khởi tạo N(25) gọi super(25). Tại M, in ra i ban đầu là 50, sau đó gán i = 250. Về lại N, in tiếp giá trị i (lúc này là 250), rồi gán i = 500. Sau cùng, n.i in ra 500. Tổng hợp xuất ra 50250500."
  },
  {
    id: 41,
    question: "Lựa chọn nào đúng với những nhận xét sau đây trong Java:\nNhận xét 1: Một lớp trừu tượng không thể kế thừa một lớp trừu tượng\nNhận xét 2: Một giao diện không thể kế thừa một giao diện\nNhận xét 3: Một lớp thực thi không thể kế thừa một lớp trừu tượng\nNhận xét 4: Một lớp trừu tượng có thể kế thừa một lớp thực thi",
    options: [
      "Nhận xét 4 đúng, các nhận xét còn lại đều sai",
      "Tất cả các nhận xét đều sai",
      "Tất cả các nhận xét đều đúng",
      "Nhận xét 2 đúng, các nhận xét còn lại đều sai",
      "Nhận xét 2 và 4 đúng, các nhận xét còn lại đều sai"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Trong Java, một lớp trừu tượng (abstract class) hoàn toàn có thể kế thừa từ một lớp thực thi thông thường. Ngược lại, các nhận xét 1, 2, và 3 đều sai vì interface kế thừa được interface, lớp thực thi kế thừa được lớp trừu tượng, và lớp trừu tượng cũng kế thừa nhau được."
  },
  {
    id: 42,
    question: "Cho chương trình Java sau được lưu toàn bộ trong file Test.java (chú ý số dòng được đánh ngoài lề chương trình). Nhận định nào sau đây đúng.",
    code: `interface A {
  void f(); //dong 2
}
interface B extends A {
  void f(); //dong 6
}
abstract class C implements A {
  abstract void f(); //dong 10
}
public class Test {
  public static void main(String args[]) {
  }
}`,
    options: [
      "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 2",
      "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 6",
      "Chương trình bị lỗi biên dịch gây ra bởi câu lệnh ở dòng 10",
      "Chương trình biên dịch thành công"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Trong interface, các phương thức ngầm định mang phạm vi truy cập 'public'. Tại lớp abstract C triển khai interface A, nếu định nghĩa lại phương thức mà thiếu từ khóa 'public' thì sẽ bị thu hẹp quyền truy cập về mặc định, gây ra lỗi biên dịch ở dòng 10."
  },
  {
    id: 43,
    question: "Cho lớp Person như sau. Chọn những phát biểu đúng về lớp Employee sau đây:",
    code: `class Person {
  protected String name;
  private String print1() {
    return name;
  }
  protected String print2() {
    return name.toUpperCase();
  }
  protected String print3() {
    return name.toLowerCase();
  }
}
class Employee extends Person {
  @Override
  private void print1() {
    System.out.println(name);
  }
  @Override
  protected String print2() {
    System.out.println(super.print2());
    return super.print2();
  }
  @Override
  protected String print3() {
    System.out.println(super.print3());
    return super.print3();
  }
}`,
    options: [
      "Lỗi biên dịch ở phương thức print1",
      "Lỗi biên dịch ở phương thức print2",
      "Lỗi biên dịch ở phương thức print3",
      "Không bị lỗi gì cả"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Phương thức print1() tại lớp cha Person có quyền truy cập 'private' nên không thể bị ghi đè. Việc sử dụng annotation @Override tại lớp con Employee cho một hàm không ghi đè sẽ bị trình biên dịch phát hiện và báo lỗi."
  },
  {
    id: 44,
    question: "Cho 2 interface như sau. Lớp Person sau bị lỗi ở những dòng nào?",
    code: `interface Printable {
  public void print();
}
interface Stringable {
  String stringify();
}

class Person implements Printable, Stringable {
  protected String name;
  public String stringify() {
    return name;
  }
  public void print() {
    System.out.println(name);
  }
  
  public static void main(String[] args) {
    Printable p1 = new Printable(); // dong 10
    Printable p2 = new Person(); // dong 11
    String name = p2.stringify(); // dong 12
  }
}`,
    options: [
      "Dòng 1",
      "Dòng 6",
      "Dòng 10",
      "Dòng 11",
      "Dòng 12"
    ],
    correctAnswer: [2, 4],
    isMultiple: true,
    explanation: "Dòng 10 báo lỗi do Interface không thể khởi tạo trực tiếp qua từ khóa 'new'. Dòng 12 báo lỗi do biến p2 có kiểu tham chiếu Printable (vốn không sở hữu phương thức stringify) nên cần ép kiểu p2 về dạng Person hoặc Stringable mới gọi được hàm này."
  },
  {
    id: 45,
    question: "Câu lệnh nào sau đây hợp lệ trong Java?",
    options: [
      "int arr[][] = new int[5][5];",
      "int[] arr[] = new int[5][5];",
      "int[][] arr = new int[5][5];",
      "int[] arr = new int[][5];"
    ],
    correctAnswer: [0, 1, 2],
    isMultiple: true,
    explanation: "Các cú pháp 1, 2, 3 đều đúng vì mảng 2 chiều được cấp phát kích thước rõ ràng. Cú pháp 4 sai vì khai báo biến là mảng 1 chiều (int[]) nhưng lại cố cấp phát mảng 2 chiều."
  },
  {
    id: 46,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: `public class Demo {
  public static void main(String[] s) {
    System.out.println(methodReturningValue());
  }
  static int methodReturningValue() {
    try {
      int i = Integer.parseInt("abc");
      return 20;
    } finally {
      return 50;
    }
  }
}`,
    options: [
      "20",
      "50",
      "Lỗi biên dịch",
      "Chương trình ném ra ngoại lệ NumberFormatException"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Trong khối try xảy ra lỗi ép kiểu NumberFormatException. Tuy nhiên, khối finally luôn được thực thi và có chứa lệnh return 50, do đó nó sẽ đè lên bất kỳ ngoại lệ hay lệnh return nào trước đó."
  },
  {
    id: 47,
    question: "Ta có thể gọi phương thức super() và this() từ đâu?",
    options: [
      "Có thể gọi từ phương thức thông thường, phương thức khởi tạo, phương thức ghi đè",
      "Có thể gọi từ phương thức khởi tạo",
      "Có thể gọi từ phương thức thông thường và phương thức khởi tạo",
      "Có thể gọi từ phương thức thông thường nhưng không thể gọi từ phương thức khởi tạo"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "super() (gọi constructor lớp cha) và this() (gọi constructor cùng lớp) chỉ được phép sử dụng bên trong một phương thức khởi tạo (constructor) và phải là lệnh đầu tiên."
  },
  {
    id: 48,
    question: "Cho 3 phương thức như sau. Chọn những phát biểu đúng về đoạn code dưới đây (gọi đến 3 phương thức trên)",
    code: `public void print1(ArrayList<Object> list) {
  for (Object o : list) {
    System.out.println(o);
  }
}
public void print2(ArrayList<?> list) {
  for (Object o : list) {
    System.out.println(o);
  }
}
public <T> void print3(ArrayList<T> list) {
  for (Object o : list) {
    System.out.println(o);
  }
}

// Đoạn mã gọi:
ArrayList<Employee> list = new ArrayList<Employee>();
// Add new element to list
print1(list);
print2(list);
print3(list);`,
    options: [
      "Lời gọi hàm print1 bị lỗi biên dịch",
      "Lời gọi hàm print2 bị lỗi biên dịch",
      "Lời gọi hàm print3 bị lỗi biên dịch",
      "Không lời gọi nào bị lỗi"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "print1() yêu cầu đúng kiểu ArrayList<Object>, không chấp nhận ArrayList<Employee> do tính chất type-safety của Generics. print2() dùng wildcard <?> và print3() dùng generic <T> nên truyền ArrayList<Employee> hợp lệ."
  },
  {
    id: 49,
    question: "Cho lớp P và lớp S1, S2 như sau. Lớp nào bị lỗi biên dịch",
    code: `class P {
  private String name;
  public P(String name) {
  }
}
class S1 extends P {
  public void test() { }
}
class S2 extends P {
  public S2() { }
}`,
    options: [
      "S1 và S2",
      "S1",
      "S2",
      "Không lớp nào bị lỗi biên dịch"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Cả S1 và S2 đều lỗi vì khi khởi tạo mặc định, lớp con sẽ ngầm gọi super() không tham số. Nhưng lớp cha P chỉ có constructor P(String name), không có constructor mặc định."
  },
  {
    id: 50,
    question: "Đoạn mã sau bị lỗi biên dịch ở những dòng nào?",
    code: `class A {
  public int check(double a) { // dong 2
    return (int) a;
  }
  public double check(double a) { // dong 5
    return a;
  }
}
class B {
  private int check(double a, int b) { // dong 10
    return (int) a + b;
  }
  private double check(double a, int b) { // dong 13
    return a + b;
  }
}`,
    options: [
      "Dòng 2 và 10",
      "Dòng 5 và 13",
      "Dòng 2 và 5",
      "Dòng 10 và 13"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Dòng 5 và 13 bị lỗi vì trùng chữ ký phương thức (tên và tham số y hệt hàm trên) nhưng chỉ khác kiểu trả về. Trong Java, không thể nạp chồng (overload) phương thức chỉ bằng cách thay đổi kiểu trả về."
  },
  {
    id: 51,
    question: "Kết quả khi thực thi đoạn code sau là gì",
    code: `public class Person {
  private int age;
  private String name;
  public static void main(String[] args) {
    Person p = new Person();
    System.out.println(p.age);
    System.out.println(p.name);
  }
}`,
    options: [
      "Bị lỗi ở dòng khai báo đối tượng do chưa có constructor mặc định",
      "Bị lỗi in ra age do chưa khởi tạo",
      "Bị lỗi in ra name do chưa khởi tạo",
      "In ra màn hình 2 dòng là 0 và null",
      "In ra màn hình 2 dòng là 0 và undefined"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Biến thành viên (instance fields) trong Java tự động nhận giá trị mặc định nếu không khởi tạo. Kiểu int mặc định là 0, kiểu đối tượng (String) mặc định là null."
  },
  {
    id: 52,
    question: "Trong Java, chuyện gì xảy ra khi một thành phần không tĩnh (non-static) được sử dụng bên trong một phương thức tĩnh (static function)?",
    options: [
      "Chương trình biên dịch và chạy thành công",
      "Chương trình biên dịch thành công nhưng khi chạy thì xuất hiện ngoại lệ NonStaticException",
      "Chương trình biên dịch thành công nhưng khi chạy thì xuất hiện ngoại lệ NullPointerException",
      "Chương trình bị lỗi biên dịch"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Phương thức tĩnh thuộc về lớp, không phụ thuộc vào đối tượng. Việc gọi trực tiếp một thành phần không tĩnh từ phương thức tĩnh mà không thông qua instance cụ thể sẽ dẫn đến lỗi biên dịch."
  },
  {
    id: 53,
    question: "Cho 2 lớp như sau. Kết quả khi thực thi lớp Employee là gì",
    code: `class Person {
  protected String name;
}
class Employee extends Person {
  private int salary;
  public Employee(int salary) {
    this.salary = salary;
  }
  public int getSalary() {
    return salary;
  }
  public static void main(String[] args) {
    Person p = new Employee(15); // dong 13
    System.out.println(p.getSalary()); // dong 14
  }
}`,
    options: [
      "Không biên dịch được vì lỗi dòng số 13",
      "Không biên dịch được vì lỗi dòng số 14",
      "Không biên dịch được vì lỗi ở cả dòng số 13 và dòng số 14",
      "In ra màn hình giá trị 15"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Dòng 13 hợp lệ (upcasting). Tuy nhiên dòng 14 báo lỗi biên dịch vì biến p được khai báo là kiểu Person, trình biên dịch sẽ kiểm tra phương thức getSalary() ở lớp Person nhưng không tìm thấy."
  },
  {
    id: 54,
    question: "Đâu là các ấn bản Java phát hành bởi Oracle",
    options: [
      "Java EE",
      "Java SE",
      "Java ME",
      "Java FX",
      "Java Virtual Machine"
    ],
    correctAnswer: [0, 1, 2, 3],
    isMultiple: true,
    explanation: "Oracle phát hành các nền tảng Java EE (Doanh nghiệp), Java SE (Tiêu chuẩn), Java ME (Thiết bị nhỏ), và JavaFX (Ứng dụng giao diện). Java Virtual Machine (JVM) không phải là một ấn bản mà chỉ là một thành phần của môi trường chạy Java (JRE)."
  },
  {
    id: 53,
    question: "Kết quả của đoạn mã sau là gì ?",
    code: `public class A {
  int add(int i, int j) { // dong 2
    return i + j;
  }
}
public class B extends A {
  public static void main(String argv[]) {
    short s = 9; // dong 8
    System.out.println(add(s, 6)); // dong 9
  }
}`,
    options: [
      "Lỗi biên dịch ở dòng 2",
      "Lỗi biên dịch ở dòng 9",
      "Lỗi biên dịch ở dòng 8",
      "15"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Phương thức add() không được khai báo là static, do vậy không thể được gọi trực tiếp từ bên trong phương thức static main() mà không có đối tượng, dẫn đến lỗi biên dịch ở dòng 9."
  },
  {
    id: 55,
    question: "Cho 3 lớp Person, Employee và Doctor như sau. Những lớp nào sẽ bị lỗi biên dịch",
    code: `abstract class Person {
  protected String name;
  public abstract String printName();
}
abstract class Employee extends Person {
  protected String id;
  public abstract void printId();
}
class Doctor extends Employee {
  public void printId() {
    System.out.println(id);
  }
}`,
    options: [
      "Lớp Person",
      "Lớp Employee",
      "Lớp Doctor",
      "Không lớp nào bị lỗi biên dịch"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Lớp Doctor là một lớp thông thường kế thừa từ Employee. Do đó nó bắt buộc phải triển khai toàn bộ các phương thức trừu tượng của lớp cha và ông nội. Ở đây lớp Doctor chưa triển khai printName() của Person nên sẽ bị lỗi biên dịch."
  },
  {
    id: 56,
    question: "Chọn những từ khóa dùng trong xử lý ngoại lệ trong Java",
    options: [
      "try",
      "catch",
      "finally",
      "throw",
      "throws",
      "Error",
      "Exception"
    ],
    correctAnswer: [0, 1, 2, 3, 4],
    isMultiple: true,
    explanation: "Các từ khóa (keywords) dùng cho xử lý ngoại lệ trong Java bao gồm try, catch, finally, throw và throws. Error và Exception là tên các lớp (class), không phải từ khóa."
  },
  {
    id: 57,
    question: "Trong Lập Trình Hướng Đối Tượng, một đối tượng tương tác với đối tượng khác được gọi là:",
    options: [
      "Đọc thông điệp (Message Reading)",
      "Đọc dữ liệu (Data Reading)",
      "Truyền thông điệp (Message Passing)",
      "Liên kết dữ liệu (Data Binding)"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Trong lập trình hướng đối tượng, sự tương tác giao tiếp giữa các đối tượng để yêu cầu thực hiện hành động được gọi là Truyền thông điệp (Message Passing)."
  },
  {
    id: 58,
    question: "Đâu không phải là lớp con kế thừa từ lớp JavaFX javafx.scene.Node?",
    options: [
      "javafx.scene.Parent",
      "javafx.scene.Canvas",
      "javafx.scene.ImageView",
      "javafx.scene.Point"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Trong JavaFX, Parent, Canvas, và ImageView đều là các đối tượng giao diện và kế thừa từ javafx.scene.Node. javafx.scene.Point không tồn tại trong package này (thường dùng Point2D)."
  },
  {
    id: 59,
    question: "Kết quả in ra màn hình khi thực thi đoạn code sau là gì",
    code: `System.out.print("Begin ");
try {
  int i = 5 / 0;
  System.out.print("Try ");
} catch (Exception ex) {
  System.out.print("Catch ");
  int i = 5 / 0;
} finally {
  System.out.print("Finally ");
}
System.out.print("End ");`,
    options: [
      "Begin Try Catch Finally",
      "Begin Try Catch Finally End",
      "Begin Catch Finally End",
      "Begin Catch + thông báo gặp ngoại lệ không được xử lý",
      "Begin Catch End + thông báo gặp ngoại lệ không được xử lý",
      "Begin Catch Finally + thông báo gặp ngoại lệ không được xử lý"
    ],
    correctAnswer: [5],
    isMultiple: false,
    explanation: "In 'Begin '. Khối try có lỗi ArithmeticException nên chuyển sang catch, in 'Catch '. Tuy nhiên, bên trong catch lại gặp lỗi chia cho 0 và chưa được bắt. Sau khi khối finally chạy và in 'Finally ', chương trình văng ngoại lệ và kết thúc, không in 'End '."
  },
  {
    id: 60,
    question: "Chọn những phát biểu đúng về kỹ thuật ghi đè (overriding)",
    options: [
      "Phương thức ở lớp con hoàn toàn giống về chữ ký với phương thức kế thừa ở lớp cha",
      "Phương thức lớp con KHÔNG bắt buộc có cùng kiểu trả về với phương thức kế thừa trong lớp cha",
      "Chỉ định truy cập ở lớp con KHÔNG giới hạn chặt hơn chỉ định truy cập phương thức kế thừa trong lớp cha",
      "Phương thức lớp con KHÔNG tung ra kiểu ngoại lệ mới so với phương thức kế thừa trong lớp cha"
    ],
    correctAnswer: [0, 2, 3],
    isMultiple: true,
    explanation: "Khi ghi đè, chữ ký phương thức phải giống nhau, quyền truy cập không được thu hẹp hơn lớp cha và ngoại lệ ném ra không được mới/rộng hơn. Phương thức lớp con bắt buộc phải có cùng kiểu trả về hoặc kiểu con tương thích, nên phát biểu thứ 2 bị sai."
  },
  {
    id: 61,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: `class Test {
  public static void main(String[] args) {
    int ii = 1;
    double ff = 1.0;
    char cc = 'a';
    boolean bb = false;
    tryPrimitiveTypes(ii, ff, cc, bb);
    System.out.println("ii = " + ii + ", ff = " + ff + ", cc = " + cc + ", bb = " + bb);
  }
  public static void tryPrimitiveTypes(int ii, double ff, char cc, boolean bb) {
    ii = 10;
    ff = 10.0;
    cc = 'z';
    bb = true;
  }
}`,
    options: [
      "ii = 1, ff = 0.0, cc = z, bb = true",
      "ii = 11, ff = 1.0, cc = a, bb = false",
      "ii = 11, ff = 0.0, cc = z, bb = true",
      "ii = 1, ff = 1.0, cc = a, bb = false"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Java sử dụng cơ chế truyền tham trị (pass-by-value) đối với các kiểu dữ liệu nguyên thủy. Những thay đổi trong phương thức tryPrimitiveTypes chỉ thao tác trên bản sao cục bộ, nên giá trị các biến ở hàm main vẫn giữ nguyên."
  },
  {
    id: 63,
    question: "Đoạn code sau bị lỗi biên dịch ở những dòng nào",
    code: `public class Student {
  private int age;
  private String name;
  
  public Student(int age) {
    this.age = age;
  }
  
  public Student(int age, String name) {
    this(age); // dong 8
    this.name = name;
  }
  
  public void main(String[] args) { // dong 11
    Student s = new Student(); // dong 12
    System.out.println(s.age); // dong 13
  }
}`,
    options: [
      "Dòng 8",
      "Dòng 11",
      "Dòng 12",
      "Dòng 13",
      "Không dòng nào bị lỗi"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Dòng 12 bị lỗi biên dịch vì lớp Student chỉ có constructor 1 tham số và 2 tham số, không có constructor mặc định (không tham số). Dòng 11 tuy thiếu 'static' nhưng đó là lỗi runtime khi khởi chạy, chứ không vi phạm cú pháp biên dịch."
  },
  {
    id: 64,
    question: "Màn hình sẽ in ra gì khi chạy chương trình Java sau?",
    code: `public class A {
  public static void main(String args[]) {
    int a = 3;
    a = a + 2;
    System.out.println(a);
  }
}`,
    options: [
      "4",
      "5",
      "6",
      "Xuất hiện Exception"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Chương trình thực hiện phép tính đơn giản: gán a = 3, sau đó cộng thêm 2 thành 5, và in ra màn hình. Không có lỗi nào xảy ra."
  },
  {
    id: 65,
    question: "Ngôn ngữ lập trình nào là hướng đối tượng?",
    options: [
      "Java",
      "C",
      "Pascal",
      "Không có đáp án nào đưa ra ở đây là đúng"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Java là ngôn ngữ lập trình hướng đối tượng (OOP) hỗ trợ đầy đủ tính đóng gói, kế thừa, đa hình và trừu tượng. C và Pascal truyền thống là ngôn ngữ lập trình thủ tục."
  },
  {
    id: 66,
    question: "Khẩu hiệu WORE của Java có nghĩa là gì?",
    options: [
      "War on Religious Extremists",
      "Write Once, Run Everywhere",
      "Who Orders Real Estate"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "WORE viết tắt của 'Write Once, Run Everywhere' (Viết một lần, chạy mọi nơi), thể hiện khả năng độc lập nền tảng của Java nhờ cơ chế biên dịch ra bytecode và chạy trên máy ảo JVM."
  },
  {
    id: 67,
    question: "Ai được coi là cha đẻ của Ngôn ngữ lập trình Java ?",
    options: [
      "Dennis Ritchie",
      "Bjarne Stroustrup",
      "James Gosling"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "James Gosling được vinh danh là cha đẻ của Java vì ông là người đã phát triển ngôn ngữ này khi làm việc tại Sun Microsystems vào đầu những năm 1990."
  },
  {
    id: 68,
    question: "Màn hình sẽ in ra gì khi chạy chương trình Java sau?",
    code: `public class A {
  public static void main(String args[]) {
    int a = 3;
    a = a - 2;
    System.out.println(a);
  }
}`,
    options: [
      "1",
      "2",
      "3",
      "Chương trình bị lỗi biên dịch"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Chương trình gán giá trị 3 cho biến a, sau đó trừ đi 2 nên a còn lại 1. Hàm println sẽ in ra giá trị 1."
  },
  {
    id: 69,
    question: "Các tính chất quan trọng của công nghệ Hướng đối tượng là gì",
    options: [
      "Trừu tượng hóa",
      "Đóng gói",
      "Kế thừa",
      "Đa hình",
      "Không có tính chất nào nêu ra ở đây là tính chất quan trọng của HDT"
    ],
    correctAnswer: [0, 1, 2, 3],
    isMultiple: true,
    explanation: "Bốn trụ cột (tính chất cốt lõi) của lập trình hướng đối tượng là: Trừu tượng hóa (Abstraction), Đóng gói (Encapsulation), Kế thừa (Inheritance), và Đa hình (Polymorphism)."
  },
  {
    id: 70,
    question: "Cho chương trình Java được lưu trong file A.java như sau (chú ý số dòng được ghi ở ngoài lề chương trình):",
    code: `public class A {
  public static void main(String args[]) {
    abcdefghijk; // dong 3
  }
}`,
    options: [
      "Chạy thành công nhưng không in gì ra màn hình",
      "Biên dịch thành công nhưng xuất hiện Exception khi chạy",
      "Biên dịch không thành công do lỗi ở dòng 3",
      "Biên dịch không thành công do lỗi ở dòng 2"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Tại dòng 3 có một chuỗi ký tự không rõ nghĩa kết thúc bằng dấu chấm phẩy, không phải là một biểu thức hợp lệ hay lời gọi hàm, nên trình biên dịch sẽ báo lỗi."
  },
  {
    id: 71,
    question: "Với các nhận xét sau:\nNhận xét 1. Ngôn ngữ C là ngôn ngữ lập trình hướng đối tượng\nNhận xét 2. Ngôn ngữ Java không phải là ngôn ngữ lập trình hướng đối tượng\nNhận xét 3. Ngôn ngữ C ra đời sớm hơn ngôn ngữ Java\nLựa chọn nào dưới đây là đúng?",
    options: [
      "Tất cả các nhận xét đều đúng",
      "Tất cả các nhận xét đều sai",
      "Nhận xét 1 và 3 đúng, nhận xét 2 sai",
      "Nhận xét 3 đúng, nhận xét 1 và 2 sai"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Nhận xét 1 và 2 sai vì C là ngôn ngữ lập trình thủ tục, còn Java là ngôn ngữ lập trình hướng đối tượng. Chỉ có nhận xét 3 đúng vì C ra đời vào đầu những năm 1970, còn Java xuất hiện vào những năm 1990."
  },
  {
    id: 72,
    question: "Kết quả in ra màn hình khi thực thi đoạn code sau là gì",
    code: `System.out.print("Begin ");
try {
  int i = 5 / 0;
  System.out.print("Try ");
} catch (Exception ex) {
  System.out.print("Catch ");
} finally {
  System.out.print("Finally ");
}
System.out.print("End ");`,
    options: [
      "Begin End",
      "Begin Try Catch Finally End",
      "Begin Catch Finally End",
      "Begin Catch End",
      "Begin Try Catch End"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Đầu tiên in 'Begin '. Lỗi chia cho 0 xảy ra trong try nhảy sang catch in 'Catch '. Sau đó khối finally bắt buộc chạy in 'Finally '. Cuối cùng lệnh cuối in 'End '. Chuỗi hoàn chỉnh là Begin Catch Finally End."
  },
  {
    id: 73,
    question: "Đoạn mã sau nằm trong hàm main. Nó in ra gì ?",
    code: `int x = 7;
int mssv = 10;
final int z = x + mssv;
z = -1;
System.out.println("Value of z:" + z);`,
    options: [
      "Báo lỗi",
      "Value of z: 16",
      "Value of z: 17"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Biến z được khai báo là hằng số với từ khóa 'final'. Việc cố gắng gán lại giá trị cho z (z = -1) sẽ dẫn đến lỗi biên dịch."
  },
  {
    id: 74,
    question: "Những ngôn ngữ lập trình nào hỗ trợ đa thừa kế",
    options: [
      "Java",
      "Java và C#",
      "C#",
      "C++",
      "Không phải ngôn ngữ nào trong 3 ngôn ngữ Java, C#, C++ hỗ trợ đa thừa kế"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Ngôn ngữ C++ có hỗ trợ tính năng đa kế thừa (một lớp có thể trực tiếp kế thừa từ nhiều lớp cha). Java và C# không hỗ trợ đa kế thừa về mặt class, mà dùng interface thay thế."
  },
  {
    id: 75,
    question: "Chọn những phát biểu đúng về xử lý ngoại lệ trong Java",
    options: [
      "Xử lý ngoại lệ giúp chương trình đáng tin cậy hơn, tránh kết thúc bất thường",
      "Mô hình xử lý ngoại lệ với try catch giúp tách biệt khối lệnh có thể xảy ra ngoại lệ và khối lệnh xử lý ngoại lệ",
      "Khi xảy ra ngoại lệ, đối tượng ngoại lệ được tạo ra và truyền đến khối catch",
      "Khi xảy ra ngoại lệ, ngoại lệ bắt buộc phải được xử lý ngay ở phương thức xảy ra ngoại lệ"
    ],
    correctAnswer: [0, 1, 2],
    isMultiple: true,
    explanation: "Ba phát biểu đầu tiên mô tả chính xác cơ chế và tác dụng của ngoại lệ. Phát biểu 4 sai vì một ngoại lệ có thể không được xử lý ngay (try-catch) mà có thể được khai báo ném ra (throws) cho phương thức cha gọi tới nó."
  },
  {
    id: 76,
    question: "Phương thức test bị lỗi ở những đâu",
    code: `public void check1(int n) throws Exception {
  if (n < 0) throw new Exception("...");
}
public void check2(int n) throws RuntimeException {
  if (n == 5) throw new RuntimeException("...");
}
public void check3(int n) throws Exception, RuntimeException {
  check1(n);
  check2(n);
}
public void test() {
  int n = 4;
  check1(n);
  check2(n);
  check3(n);
}`,
    options: [
      "Lời gọi phương thức check1",
      "Lời gọi phương thức check2",
      "Lời gọi phương thức check3",
      "Không bị lỗi gì"
    ],
    correctAnswer: [0, 2],
    isMultiple: true,
    explanation: "Hàm check1 và check3 khai báo ném ra 'Exception' (một loại Checked Exception). Do đó, khi hàm test() gọi tới 2 hàm này, nó bắt buộc phải xử lý bằng khối try-catch hoặc thêm khai báo throws, nếu không sẽ bị lỗi biên dịch. Lời gọi check2 không lỗi vì 'RuntimeException' là Unchecked."
  },
  {
    id: 77,
    question: "Kết quả khi thực thi chương trình sau là gì",
    code: `class Test {
  public static void increase1(int[] arr) {
    for (int a : arr) a += 1;
  }
  public static void increase2(int[] arr) {
    for (int i = 0; i < arr.length; ++i) arr[i]++;
  }
  public static void main(String[] args) {
    int arr[] = {5, 6, 7};
    increase1(arr);
    increase2(arr);
    for (int a : arr) System.out.print(a + " ");
  }
}`,
    options: [
      "5 6 7",
      "6 7 8",
      "7 8 9",
      "4 5 6"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Vòng lặp for-each trong increase1 chỉ thao tác trên biến bản sao cục bộ nên mảng gốc không đổi {5, 6, 7}. Phương thức increase2 dùng vòng lặp truyền thống duyệt qua index nên làm tăng trực tiếp phần tử trong mảng gốc lên 1. Kết quả là 6 7 8."
  },
  {
    id: 78,
    question: "Chọn phát biểu đúng về lập trình tổng quát trong Java",
    options: [
      "Có thể lập trình tổng quát cho lớp",
      "Có thể lập trình tổng quát cho phương thức",
      "Một lớp có thể khai báo số lượng kiểu dữ liệu tổng quát tùy ý",
      "Một phương thức chỉ có thể khai báo tối đa 1 kiểu dữ liệu tổng quát",
      "Không thể khai báo ràng buộc kiểu dữ liệu tổng quát cho lớp (VD lớp sẽ làm việc với kiểu dữ liệu T bất kỳ, sao cho T là Person hoặc lớp con của lớp Person)"
    ],
    correctAnswer: [0, 1, 2],
    isMultiple: true,
    explanation: "Lập trình tổng quát (Generics) áp dụng cho cả lớp và phương thức. Một lớp hay phương thức có thể khai báo tùy ý số lượng kiểu (Ví dụ <K, V>). Do đó phát biểu 4 sai. Phát biểu 5 sai vì ta có thể ràng buộc giới hạn bằng từ khóa extends (VD: <T extends Person>)."
  },
  {
    id: 79,
    question: "Cho 3 lớp: lớp Person, lớp Employee kế thừa lớp Person, và lớp Manager kế thừa lớp Employee. Chọn TẤT CẢ những phát biểu đúng về đoạn code sau",
    code: `1. Person p1 = new Manager();
2. Employee e = (Employee) p1;
3. Person p2 = new Employee();
4. Manager m = (Manager) p2;`,
    options: [
      "Dòng 1 là upcasting",
      "Dòng 2 là upcasting",
      "Dòng 2 là downcasting",
      "Dòng 3 là upcasting",
      "Dòng 3 là downcasting",
      "Dòng 4 là upcasting",
      "Dòng 4 là downcasting",
      "Không dòng nào bị lỗi biên dịch",
      "Không dòng nào bị lỗi thực thi"
    ],
    correctAnswer: [0, 2, 3, 6, 7],
    isMultiple: true,
    explanation: "Dòng 1: Gán Manager cho Person (upcasting). Dòng 2: Ép kiểu ngược từ Person về Employee (downcasting). Dòng 3: Gán Employee cho Person (upcasting). Dòng 4: Ép kiểu ngược từ Person về Manager (downcasting). Cú pháp trên đều hợp lệ với trình biên dịch nên không có lỗi compile (nhưng dòng 4 sẽ sinh ngoại lệ ClassCastException lúc runtime do p2 thực thể chỉ là Employee)."
  },
  {
    id: 80,
    question: "Đoạn mã sau in ra gì?",
    code: `public class A {
  String s;
  A a;
  public A(String s) {
    this.s = s;
  }
  public static void main(String[] args) {
    A a1 = new A("first");
    A a2 = new A("second");
    a1.a = a2;
    a2.a = a1;
    System.out.print(a1.a.s);
    System.out.print(a2.a.s);
  }
}`,
    options: [
      "Báo lỗi",
      "secondfirst",
      "nullnull",
      "firstsecond"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Đối tượng a1 liên kết với a2 và ngược lại. Do đó a1.a.s tức là thuộc tính s của đối tượng a2 ('second'). Còn a2.a.s chính là thuộc tính s của a1 ('first'). Kết quả in ra liên tiếp là secondfirst."
  },
  {
    id: 81,
    question: "Sắp xếp các kiểu dữ liệu char, int, byte, short, long, float, double theo chiều nới rộng dần dữ liệu",
    options: [
      "byte short char long float double",
      "byte char short long float double",
      "byte char short float long double",
      "byte short char float long double",
      "byte -> short -> char -> int -> long -> float -> double",
      "Không phải là đáp án nào trong các đáp án còn lại"
    ],
    correctAnswer: [5],
    isMultiple: false,
    explanation: "Kích thước các kiểu nguyên thủy: byte(8) < short(16)=char(16) < int(32)=float(32) < long(64)=double(64). Về phạm vi biểu diễn, trật tự là: byte < short < char < int < long < float < double. Các phương án đều thiếu hoặc sắp xếp sai trật tự implicit casting, nên đáp án đúng nhất là Không có đáp án nào trong các đáp án còn lại."
  },
  {
    id: 82,
    question: "Đoạn mã sau khi chạy in ra gi?",
    code: `interface P {
  String p = "PPPP";
  String methodP();
}
interface Q extends P {
  String q = "QQQQ";
  String methodQ();
}
class R implements P, Q {
  public String methodP() {
    return q + p;
  }
  public String methodQ() {
    return p + q;
  }
}
public class Demo {
  public static void main(String[] ss) {
    R r = new R();
    System.out.print(r.methodP());
    System.out.print(r.methodQ());
  }
}`,
    options: [
      "QQQQPPPPPPPPQQQQ",
      "PPPPQQQQPPPPQQQQ",
      "Báo lỗi biên dịch",
      "QQQQPPPPQQQQPPPP"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Biến trong interface mặc định là `public static final`. Hàm `methodP()` trả về chuỗi nối `q+p` (QQQQPPPP), hàm `methodQ()` trả về `p+q` (PPPPQQQQ). Gọi liên tiếp 2 hàm sẽ in ra chuỗi liền nhau là QQQQPPPPPPPPQQQQ."
  },
  {
    id: 83,
    question: "Kết quả in ra của chương trình sau là gì?",
    code: `public class Test {
  public static void main(String[] ss) {
    String[] s = {"abc", "123", null};
    for (int i = 0; i < s.length; i++) {
      try {
        int a = s[i].length();
        try {
          a = Integer.parseInt(s[i]);
        } catch (NumberFormatException ex) {
          System.out.print("NumberFormatException ");
        }
      } catch(NullPointerException ex) {
        System.out.print("NullPointerException ");
      }
    }
  }
}`,
    options: [
      "NullPointerException NumberFormatException",
      "abc 123 null",
      "NumberFormatException NullPointerException",
      "abc 123"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Vòng lặp i=0 ('abc') gây lỗi NumberFormatException khi ép kiểu Integer. Vòng lặp i=1 ('123') ép kiểu thành công, không in gì. Vòng lặp i=2 (null) gọi length() gây lỗi NullPointerException. Kết quả cuối cùng là 'NumberFormatException NullPointerException '."
  },
  {
    id: 84,
    question: "Kết quả thực thi đoạn chương trình sau là gì",
    code: `public class Test {
  static int index = 0;
  void increase() {
    index++;
  }
  public static void main(String[] args) {
    increase();
    System.out.println(index);
  }
}`,
    options: [
      "In ra 1",
      "In ra 0",
      "Lỗi biên dịch ở lời gọi hàm increase trong hàm main",
      "Lỗi biên dịch ở lệnh in ra giá trị index trong hàm main"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Hàm `increase()` không được khai báo là static, nên không thể được gọi trực tiếp từ bên trong phương thức tĩnh `main()` mà không thông qua một đối tượng thể hiện. Điều này gây lỗi biên dịch."
  },
  {
    id: 85,
    question: "Chọn phát biểu đúng về xử lý sự kiện trong JavaFX",
    options: [
      "JavaFX hỗ trợ xử lý sự kiện chuột, bàn phím với 2 lớp MouseEvent và KeyEvent",
      "Để xử lý sự kiện rê chuột (drag), sử dụng lớp DragEvent",
      "JavaFX cung cấp các handlers và các filters để xử lý sự kiện",
      "Khi xử lý sự kiện, các handler được gọi trước, các filter được gọi sau",
      "Tất cả các handlers đều thực thi giao diện javafx.event.EventHandler. Trong khi đó, các filters cần thực thi một giao diện khác.",
      "Một node có thể đăng ký nhiều handler/filter"
    ],
    correctAnswer: [0, 1, 2, 5],
    isMultiple: true,
    explanation: "JavaFX cung cấp Event Handlers và Event Filters, cả hai đều implement interface EventHandler. Quá trình xử lý bao gồm capturing phase (gọi filter trước) và bubbling phase (gọi handler sau). Một node hoàn toàn có thể đăng ký nhiều filter/handler cùng lúc."
  },
  {
    id: 86,
    question: "Chọn những phát biểu đúng về 2 phương thức sau",
    code: `public void print1(ArrayList<Employee> list) {
}
public void print2(ArrayList<? extends Employee> list) {
}`,
    options: [
      "2 phương thức là hoàn toàn tương đương nhau",
      "Trong phương thức print1 không thể thêm mới phần tử vào list. Và trong phương thức print2 có thể thêm mới phần tử vào list",
      "Trong phương thức print2 không thể thêm mới phần tử vào list. Và trong phương thức print1 có thể thêm mới phần tử vào list",
      "Để gọi phương thức print2, danh sách truyền vào chỉ được chứa các đối tượng là lớp con của Employee (không tính Employee)"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Wildcard `? extends Employee` trong `print2` có nghĩa danh sách có thể chứa các lớp con, do đó Java ngăn cấm việc thêm phần tử mới (ngoại trừ null) để đảm bảo type-safety. Phương thức `print1` nhận chính xác Employee nên được phép thêm phần tử bình thường."
  },
  {
    id: 87,
    question: "Kết quả khi thực thi lớp Test là gì",
    code: `class Person {
  private int age;
  public Person(int age) { this.age = age; }
  public int getAge() { return age; }
  public void setAge(int age) { this.age = age; }
}
class Test {
  public static void increaseAge(Person p) {
    p.setAge(p.getAge() + 1);
  }
  public static void swap(Person p1, Person p2) {
    Person tmp = p1;
    p1 = p2;
    p2 = tmp;
  }
  public static void main(String[] args) {
    Person p1 = new Person(15);
    Person p2 = new Person(20);
    increaseAge(p1);
    swap(p1, p2);
    System.out.print(p1.getAge() + " ");
    System.out.print(p2.getAge() + " ");
  }
}`,
    options: [
      "16 20",
      "20 16",
      "15 20",
      "20 15"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Java truyền tham số theo giá trị (pass-by-value). Lời gọi `increaseAge` làm thay đổi nội dung đối tượng nên `p1` tăng thành 16. Tuy nhiên, hàm `swap` chỉ hoán đổi các biến tham chiếu cục bộ bên trong hàm, nên ngoài hàm `main` `p1` và `p2` không bị thay đổi vị trí. Kết quả in ra là 16 20."
  },
  {
    id: 88,
    question: "Đoạn mã sau in ra kết quả gì?",
    code: `class Person {
  protected int age;
  protected String name;
  public Person() {
    System.out.print(age + " " + name + " ");
  }
  public Person(int age, String name) {
    this.age = age;
    this.name = name;
  }
}
class Employee extends Person {
  public Employee() {
  }
  public Employee(int age, String name) {
    super(age, name);
  }
  public static void main(String[] args) {
    Employee e1 = new Employee();
    Employee e2 = new Employee(16, "Huy");
    System.out.print(e2.age + " " + e2.name);
  }
}`,
    options: [
      "0 null 16 Huy",
      "Lỗi biên dịch",
      "16 Huy 0 null",
      "0 null"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Tạo đối tượng `e1` sẽ gọi ngầm constructor mặc định của lớp cha Person, in ra giá trị mặc định `0 null`. Đối tượng `e2` sẽ gọi constructor có tham số để gán giá trị, và sau đó lệnh in trong main sẽ xuất ra `16 Huy`. Ghép lại thành '0 null 16 Huy'."
  },
  {
    id: 89,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: `class A {
  String myMethod(String s) {
    return s+s;
  }
}
class B extends A {
  String myMethod(String s, double d) {
    return myMethod(s+d);
  }
}
class C extends B {
  String myMethod(String s, double d, int i) {
    return myMethod(s, d+i);
  }
}
public class Test {
  public static void main(String[] ss) {
    C x = new C();
    System.out.println(x.myMethod("CHECK", 12.34, 56));
  }
}`,
    options: [
      "CHECK68.34CHECK68.34",
      "CHECK12.34+56CHECK12.34+56",
      "CHECK12.34+56",
      "CHECK68.34"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Hàm `myMethod` ở C gọi hàm `myMethod(String, double)` ở lớp B với tham số 12.34 + 56 = 68.34. Lớp B tiếp tục cộng chuỗi thành 'CHECK68.34' và gọi `myMethod(String)` từ lớp A. Lớp A trả về chuỗi nhân đôi, kết quả cuối cùng là CHECK68.34CHECK68.34."
  },
  {
    id: 90,
    question: "Kết quả chạy chương trình sau là gì?",
    code: `class A {}
class B extends A {}
class C extends B {}
public class Test {
  static void method(A a) {
    System.out.println("Method A");
  }
  static void method(B b) {
    System.out.println("Method B");
  }
  static void method(Object obj) {
    System.out.println("Method C");
  }
  public static void main(String[] ss) {
    C c = new C();
    method(c);
  }
}`,
    options: [
      "Method C",
      "Method B",
      "Method A",
      "Báo lỗi biên dịch"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Trình biên dịch sẽ phân giải hàm nạp chồng dựa trên nguyên tắc kiểu khớp nhất (closest match). Lớp C kế thừa trực tiếp từ lớp B, nên `method(B)` sẽ được ưu tiên chọn trước `method(A)` hay `method(Object)`."
  },
  {
    id: 91,
    question: "Cho đoạn mã sau. Chọn (các) phương thức dưới đây khi đặt vào dòng 5 trong đoạn mã trên gây ra lỗi biên dịch?",
    code: `class Super {
  public String getName() { return "Super"; }
}
public class Sub extends Super {
  // dong 5
}`,
    options: [
      "public String getTen () {}",
      "public void getName (String str) { }",
      "public String getName() { return \"Sub\"; }",
      "public void getName() {}",
      "Không có lựa chọn nào",
      "Tất cả các lựa chọn a, b, c, d"
    ],
    correctAnswer: [0, 3],
    isMultiple: true,
    explanation: "Phương án a bị lỗi vì khai báo kiểu trả về là String nhưng thiếu lệnh return. Phương án d bị lỗi do vi phạm quy tắc ghi đè (overriding): kiểu trả về void không tương thích với kiểu trả về String của lớp cha."
  },
  {
    id: 92,
    question: "Hãy khoanh tròn vào (các) chỉ định có thể sử dụng để khai báo một trường (thuộc tính):",
    options: [
      "abstract",
      "final",
      "const",
      "public",
      "private"
    ],
    correctAnswer: [1, 3, 4],
    isMultiple: true,
    explanation: "Một thuộc tính trong Java có thể đi kèm với các từ khóa truy cập (public, private, protected) hoặc không truy cập (final, static). Từ khóa `abstract` dùng cho class/method, còn `const` không được dùng trong ngôn ngữ Java."
  },
  {
    id: 93,
    question: "Cho đoạn mã về lớp OToTai kế thừa PhuongTien. (Các) lựa chọn nào sau đây là đúng?",
    code: `class BanhXe {}
class DongCo{}
abstract class PhuongTien {
  public abstract void di();
  public abstract void dungLai();
}
class OTo extends PhuongTien {
  BanhXe banhTraiTruoc = new BanhXe();
  BanhXe banhPhaiTruoc = new BanhXe();
  BanhXe banhTraiSau = new BanhXe();
  BanhXe banhPhaiSau = new BanhXe();
  DongCo dc = new DongCo();
  public DongCo getDongCo() { return dc; }
  public void lenGa() {}
  public void tangToc(){}
}
class OToTai extends OTo {
  private int trongLuongMax;
}`,
    options: [
      "Mối quan hệ giữa OToTai và PhuongTien là mối quan hệ kế thừa.",
      "Một đối tượng OtoTai (ô tô tải) kế thừa một thể hiện DongCo và 4 thể hiện của BanhXe từ lớp cha OTo.",
      "Một đối tượng OToTai có thể lên ga và tăng tốc.",
      "Mối quan hệ giữa OToTai và DongCo là quan hệ kế thừa.",
      "Tất cả các lựa chọn trên đều đúng."
    ],
    correctAnswer: [0, 1, 2],
    isMultiple: true,
    explanation: "Lớp OToTai kế thừa từ OTo (gián tiếp kế thừa PhuongTien) nên mang theo toàn bộ thuộc tính và phương thức của lớp cha, bao gồm xe, động cơ và các thao tác lên ga, tăng tốc. Mối quan hệ giữa OToTai và DongCo là quan hệ kết tập (có chứa), không phải kế thừa."
  },
  {
    id: 94,
    question: "Chọn ba loại sau đây được sử dụng để truyền tham số theo tham chiếu (theo cách Java xử lý đối tượng):",
    options: [
      "int",
      "mảng",
      "byte",
      "float",
      "String",
      "Các kiểu dữ liệu nguyên thủy"
    ],
    correctAnswer: [1, 4],
    isMultiple: true,
    explanation: "Các kiểu dữ liệu nguyên thủy (như int, byte, float) được truyền bằng giá trị trực tiếp. Mảng (Array) và chuỗi (String) là các đối tượng nên bản chất việc truyền tham số là sao chép lại địa chỉ tham chiếu đến vùng nhớ đối tượng."
  },
  {
    id: 95,
    question: "Hãy đưa ra (các) lựa chọn đúng về tính Đóng gói (Encapsulation):",
    options: [
      "Đóng gói dữ liệu được sử dụng để giúp chương trình chạy nhanh hơn.",
      "Đóng gói dữ liệu cho phép thay đổi thiết kế bên trong của một lớp mà giao diện bên ngoài không bị thay đổi theo.",
      "Đóng gói dữ liệu bảo vệ dữ liệu không bị thay đổi tùy tiện.",
      "Đóng gói dữ liệu là một dạng của che giấu dữ liệu."
    ],
    correctAnswer: [1, 2, 3],
    isMultiple: true,
    explanation: "Tính đóng gói chủ yếu giúp che giấu cấu trúc dữ liệu, bảo vệ an toàn cho thuộc tính bằng cách giới hạn quyền truy cập từ bên ngoài, và linh hoạt thay đổi mã nguồn phía trong. Tính năng này thiết kế vì bảo mật và kiến trúc, không tác động tăng tốc chương trình."
  },
  {
    id: 96,
    question: "(Các) kỹ thuật nào được hỗ trợ trong lập trình hướng đối tượng Java giúp tái sử dụng mã nguồn?",
    options: [
      "Đa kế thừa (Multiple Inheritance)",
      "Kết tập (Aggregation)",
      "Đơn kế thừa (Single Inheritance)",
      "Chồng phương thức (Method Overloading)",
      "Đóng gói (Encapsulation)"
    ],
    correctAnswer: [1, 2],
    isMultiple: true,
    explanation: "Đơn kế thừa (cho phép lớp con sử dụng lại mã của lớp cha) và Kết tập (sử dụng đối tượng của lớp khác làm thành phần) là hai phương pháp căn bản để tái sử dụng mã. Đa kế thừa với Class không được hỗ trợ trong Java."
  },
  {
    id: 97,
    question: "Chọn hai lựa chọn đúng dưới đây về phương thức khởi tạo:",
    options: [
      "Số lượng lời gọi đến phương thức khởi tạo xuất hiện trong thân lớp phải nhỏ hơn hoặc bằng số lượng phương thức khởi tạo của lớp.",
      "Một phương thức khởi tạo có thể gọi phương thức khởi tạo khác trong cùng lớp sử dụng \"this(danh_sach_tham_so);\"",
      "Một phương thức khởi tạo có thể gọi phương thức khởi tạo của lớp cha sử dụng \"super(danh_sach_tham_so);\"",
      "Một phương thức khởi tạo có thể gọi phương thức khởi tạo của lớp cha sử dụng \"this(danh_sach_tham_so);\""
    ],
    correctAnswer: [1, 2],
    isMultiple: true,
    explanation: "Trong một constructor, từ khóa `this(...)` được dùng để gọi một constructor khác cùng lớp (nhằm tái sử dụng logic khởi tạo), và `super(...)` được dùng để gọi tường minh constructor của lớp cha."
  },
  {
    id: 98,
    question: "Cho đoạn mã sau. Chọn hai phương thức chồng (overload) cho phương thức khởi tạo Student?",
    code: `public class Student {
  public Student (String name, int age) {}
}`,
    options: [
      "Student() { }",
      "protected int Student () { }",
      "private Student (int age, String name) { }",
      "public Object Student (String name, int age) { }",
      "public void Student (String name, byte age) { }"
    ],
    correctAnswer: [0, 2],
    isMultiple: true,
    explanation: "Phương thức khởi tạo (constructor) không bao giờ có kiểu trả về, do vậy việc thêm `int`, `Object`, hoặc `void` là sai cú pháp. Các constructor `Student()` và `Student(int age, String name)` hợp lệ vì thay đổi số lượng và thứ tự tham số."
  },
  {
    id: 99,
    question: "Cho đoạn mã sau. Chọn hai lựa chọn đúng dưới đây?",
    code: `class A {
  A(){}
}
class B extends A { }`,
    options: [
      "A có 2 phương thức khởi tạo, một phương thức do JVM cung cấp, một phương thức tự viết.",
      "Phương thức khởi tạo của lớp B là public.",
      "Phương thức khởi tạo của lớp B không có tham số.",
      "Phương thức khởi tạo của lớp B chứa lời gọi đến super()."
    ],
    correctAnswer: [2, 3],
    isMultiple: true,
    explanation: "Nếu lập trình viên không tự định nghĩa constructor nào, Java sẽ cung cấp constructor mặc định không tham số và tự động thêm lời gọi ngầm định `super()` đến lớp cha. Constructor mặc định mang quyền truy cập bằng với quyền của lớp (ở đây lớp B là default, không phải public)."
  },
  {
    id: 100,
    question: "Cho đoạn mã dưới đây. Hãy chọn ra hai phương thức đúng nằm trong một lớp kế thừa từ lớp A?",
    code: `class A {
  protected int method1(int a, int b) {
    return 0;
  }
}`,
    options: [
      "public int method1(int a, int b) { return 0; }",
      "private int method1(int a, int b) { return 0; }",
      "private int method1(int a, long b) { return 0; }",
      "public short method1(int a, int b) { return 0; }",
      "static protected int method1(int a, int b) { return 0; }"
    ],
    correctAnswer: [0, 2],
    isMultiple: true,
    explanation: "Phương án 1 là ghi đè hợp lệ vì quyền truy cập mở rộng từ `protected` lên `public`. Phương án 3 là nạp chồng (overloading) hợp lệ vì thay đổi kiểu tham số. Các phương án còn lại vi phạm quy tắc ghi đè do thu hẹp quyền truy cập, đổi kiểu trả về, hoặc thêm từ khóa static."
  },
  {
    id: 101,
    question: "Trong một lớp con, phương thức nào không thể được ghi đè (override)?",
    options: [
      "private",
      "public",
      "static",
      "final",
      "constructor"
    ],
    correctAnswer: [0, 2, 3, 4],
    isMultiple: true,
    explanation: "Chỉ có các phương thức public/protected/default (không dùng static/final) mới có thể ghi đè. Các phương thức private (không hiển thị ở lớp con), static (thuộc cấp độ lớp), final (cấm ghi đè) và constructor (không được kế thừa) thì không thể override."
  },
  {
    id: 102,
    question: "a, viết một giao diện có tên X chứa: thuộc tính N kiểu int có giá trị bằng 1000 và phạm vi truy cập là public.\nb, viết một giao diện có tên Y chứa: phương thức không được định nghĩa, có tên là sumOneToN không có tham số đầu vào, phạm vi truy cập là public.\nc, viết một lớp trừu tượng có tên Z chứa: thuộc tính tên là sum có kiểu int có phạm vi truy cập là protected. + phương thức có tên là printSum không có tham số đầu vào, không có đầu ra, có phạm vi truy cập protected. Phương thức này in giá trị của thuộc tính sum ra màn hình.\nd, viết một lớp thực thi có tên W kế thừa lớp trừu tượng Z và cài đặt hai giao diện X, Y và: + viết đè phương thức sumOneToN với nhiệm vụ của phương thức này là tính tổng từ 1 tới N và lưu vào thuộc tính sum.",
    options: [],
    correctAnswer: [],
    isMultiple: false,
    isEssay: true,
    explanation: "Đây là bài tập lập trình yêu cầu vận dụng giao diện (interface), lớp trừu tượng (abstract class) và kế thừa (inheritance).\n\n```java\npublic interface X {\n  public int N = 1000;\n}\n\npublic interface Y {\n  public void sumOneToN();\n}\n\npublic abstract class Z {\n  protected int sum;\n  protected void printSum() {\n    System.out.println(sum);\n  }\n}\n\npublic class W extends Z implements X, Y {\n  @Override\n  public void sumOneToN() {\n    sum = 0;\n    for (int i = 1; i <= N; i++) {\n      sum += i;\n    }\n  }\n}\n```"
  }
];
export default function QuizApp() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  // LƯU TRỮ TRẠNG THÁI HIỂN THỊ KẾT QUẢ CỦA TỪNG CÂU HỎI
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  // Xáo trộn vị trí câu hỏi khi component mount
  useEffect(() => {
    setQuestions([...initialQuestions].sort(() => Math.random() - 0.5));
  }, []);

  // Xử lý khi người dùng chọn đáp án
  const handleOptionChange = (questionId: number, optionIndex: number, isMultiple: boolean) => {
    // Nếu đã nộp bài tổng hoặc câu hỏi này đã check kết quả thì khóa không cho sửa
    if (isSubmitted || revealedQuestions[questionId]) return;

    setUserAnswers((prev) => {
      const currentAnswers = prev[questionId] ?? [];
      let updatedAnswers: number[] = [];

      if (isMultiple) {
        if (currentAnswers.includes(optionIndex)) {
          updatedAnswers = currentAnswers.filter((i) => i !== optionIndex);
        } else {
          updatedAnswers = [...currentAnswers, optionIndex].sort();
        }
      } else {
        updatedAnswers = [optionIndex];
        // TỰ ĐỘNG HIỆN KẾT QUẢ LUÔN NẾU LÀ CÂU HỎI 1 ĐÁP ÁN
        setRevealedQuestions((prevRev) => ({ ...prevRev, [questionId]: true }));
      }

      return { ...prev, [questionId]: updatedAnswers };
    });
  };

  // Hàm kích hoạt hiện kết quả thủ công (cho câu hỏi nhiều đáp án / tự luận)
  const handleCheckQuestion = (questionId: number) => {
    setRevealedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

  // Nộp bài và tính điểm tổng kết
  const handleSubmit = () => {
    let currentScore = 0;
    const allRevealed: Record<number, boolean> = {};

    questions.forEach(q => {
      allRevealed[q.id] = true; // Hiện kết quả tất cả các câu chưa check khi nộp bài
      if (q.isEssay) return;

      const selected = userAnswers[q.id] ?? [];
      const correct = q.correctAnswer.slice().sort();
      if (JSON.stringify(selected) === JSON.stringify(correct)) {
        currentScore += 1;
      }
    });

    setScore(currentScore);
    setRevealedQuestions(allRevealed);
    setIsSubmitted(true);
  };

  // Reset trạng thái làm lại từ đầu
  const handleReset = () => {
    setUserAnswers({});
    setRevealedQuestions({});
    setIsSubmitted(false);
    setScore(0);
    setQuestions([...initialQuestions].sort(() => Math.random() - 0.5));
  };

  const scorableQuestions = questions.filter(q => !q.isEssay);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-600 text-center mb-2">
            Hệ Thống Ôn Tập Cuối Kỳ OOP
          </h1>
          <p className="text-center text-gray-500 mb-8 font-medium">
            Môn: Lập trình Hướng đối tượng - Kỳ 2024.1
          </p>

          <div className="space-y-12">
            {questions.map((q, index) => {
              const selectedAnswers = userAnswers[q.id] ?? [];
              const isCorrect = !q.isEssay && JSON.stringify(selectedAnswers.sort()) === JSON.stringify(q.correctAnswer.slice().sort());
              
              // Biến kiểm tra xem CÂU HỎI NÀY đã được hiển thị kết quả chưa
              const isQuestionRevealed = isSubmitted || revealedQuestions[q.id];

              return (
                <div key={q.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-start">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm mr-3 mt-0.5">
                      Câu {index + 1}
                    </span>
                    <span className="leading-relaxed">{q.question}</span>
                  </h2>

                  {q.isMultiple && (
                    <p className="text-sm text-amber-600 mb-3 italic font-medium">
                      * Câu hỏi có nhiều đáp án đúng, hãy chọn tất cả các phương án chính xác.
                    </p>
                  )}

                  {q.code && q.code.trim() !== '' && (
                    <pre className="bg-slate-900 text-green-400 p-4 rounded-md overflow-x-auto mb-6 text-sm font-mono shadow-inner">
                      <code>{q.code}</code>
                    </pre>
                  )}

                  <div className="space-y-3">
                    {q.options.map((option, optIdx) => {
                      const isSelected = selectedAnswers.includes(optIdx);
                      const isOptionCorrect = q.correctAnswer.includes(optIdx);
                      
                      let optionClasses = "flex items-center p-3 rounded-lg border cursor-pointer transition-colors ";
                      
                      // SỬ DỤNG BIẾN ĐÃ CẬP NHẬT ĐỂ ĐỔI MÀU SẮC ĐÁP ÁN
                      if (isQuestionRevealed) {
                        optionClasses += "cursor-not-allowed ";
                        if (isOptionCorrect && isSelected) optionClasses += "bg-green-100 border-green-500 text-green-800 ";
                        else if (isOptionCorrect && !isSelected) optionClasses += "bg-green-50 border-green-400 border-dashed text-green-700 ";
                        else if (!isOptionCorrect && isSelected) optionClasses += "bg-red-100 border-red-500 text-red-800 ";
                        else optionClasses += "bg-gray-50 border-gray-200 text-gray-500 opacity-60 ";
                      } else {
                        optionClasses += isSelected ? "bg-indigo-50 border-indigo-500 text-indigo-900" : "bg-gray-50 border-gray-200 hover:bg-gray-100";
                      }

                      return (
                        <label key={optIdx} className={optionClasses}>
                          <input
                            type={q.isMultiple ? "checkbox" : "radio"}
                            name={`question-${q.id}`}
                            checked={isSelected}
                            onChange={() => handleOptionChange(q.id, optIdx, q.isMultiple)}
                            disabled={isQuestionRevealed}
                            className={`w-5 h-5 mr-3 accent-indigo-600 ${isQuestionRevealed ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          />
                          <span className="font-medium text-[15px]">{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  {/* NÚT KIỂM TRA CHO CÂU MULTIPLE-CHOICE HOẶC TỰ LUẬN */}
                  {!isQuestionRevealed && (q.isEssay || (q.isMultiple && selectedAnswers.length > 0)) && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleCheckQuestion(q.id)}
                        className="px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold rounded-md hover:bg-indigo-100 transition-colors text-sm border border-indigo-200 shadow-sm"
                      >
                        {q.isEssay ? "Xem đáp án tham khảo" : "Kiểm tra đáp án câu này"}
                      </button>
                    </div>
                  )}

                  {/* HIỂN THỊ ĐÁP ÁN & GIẢI THÍCH KHI CÂU HỎI ĐÃ ĐƯỢC REVEAL */}
                  {isQuestionRevealed && (
                    <div className={`mt-6 p-4 rounded-md border-l-4 ${
                      q.isEssay ? 'bg-blue-50 border-blue-500' : isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                    }`}>
                      <p className="font-bold mb-1 flex items-center">
                        {q.isEssay ? (
                          <span className="text-blue-600 flex items-center">💡 Đáp án tham khảo</span>
                        ) : isCorrect ? (
                          <span className="text-green-600 flex items-center">✅ Chính xác!</span>
                        ) : (
                          <span className="text-red-600 flex items-center">❌ Sai rồi!</span>
                        )}
                      </p>
                      <div className="text-gray-700 mt-2 text-sm leading-relaxed">
                        <span className="font-semibold underline">
                          {q.isEssay ? "Phân tích:" : "Giải thích:"}
                        </span> {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            {isSubmitted && (
              <div className="text-2xl font-bold mb-4 sm:mb-0">
                Điểm của bạn: <span className={score >= scorableQuestions.length / 2 ? "text-green-600" : "text-red-600"}>{score} / {scorableQuestions.length}</span>
              </div>
            )}
            
            <div className="flex space-x-4 w-full sm:w-auto">
              {isSubmitted ? (
                <button
                  onClick={handleReset}
                  className="flex-1 sm:flex-none px-8 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-900 transition-colors shadow-md"
                >
                  Làm lại từ đầu
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Nộp Bài Ngay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}