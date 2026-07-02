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

// Dữ liệu trích xuất từ tài liệu OOP
const initialQuestions: Question[] = [
  {
    id: 1,
    question: "Kết quả của đoạn code sau là gì?",
    code: "public class Test {\n  public static void main(String[] args) {\n    byte b = 6;\n    b += 8;\n    System.out.println(b);\n    b = b + 7;\n    System.out.println(b);\n  }\n}",
    options: [
      "14 21",
      "14 13",
      "Lỗi biên dịch tại dòng 6",
      "Lỗi biên dịch tại dòng 4"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Dòng b += 8; hợp lệ do có cơ chế ép kiểu ngầm định. Dòng b = b + 7; gây lỗi biên dịch vì không có ép kiểu tường minh từ int về byte. Có thể sửa lỗi bằng cách ép kiểu tường minh: b = (byte)(b + 7)."
  },
  {
    id: 2,
    question: "Cho 3 lớp Person, Employee và Manager như sau. Những lớp nào sẽ bị lỗi biên dịch?",
    code: "abstract class Person {\n  protected String name;\n  public abstract String print();\n}\n\nabstract class Employee extends Person {\n  public String print() {\n    return name;\n  }\n}\n\nclass Manager extends Employee {\n  protected String print() {\n    return \"Manager\" + name;\n  }\n}",
    options: [
      "Lớp Person",
      "Lớp Employee",
      "Lớp Manager",
      "Không lớp nào bị lỗi biên dịch"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Lỗi biên dịch xảy ra tại lớp Manager, vì trong Java, khi ghi đè phương thức, phạm vi truy cập không được giảm. Phương thức gốc (print() trong Employee) là public, thì phương thức ghi đè trong Manager cũng phải là public (ở đây đang khai báo là protected)."
  },
  {
    id: 3,
    question: "Cho chương trình như dưới đây được lưu toàn bộ trong file B.java. Lựa chọn nào là chính xác?",
    code: "class A {\n  int a = 5;\n  protected int b = 6;\n  public int c = 7;\n}\n\npublic class B {\n  public static void main(String[] args) {\n    A a = new A();\n    System.out.print(a.a);\n    System.out.print(a.b);\n    System.out.println(a.c);\n  }\n}",
    options: [
      "Lỗi khi biên dịch ở dòng 10",
      "Lỗi khi biên dịch ở dòng 11",
      "Chương trình không lỗi biên dịch nhưng khi chạy xuất hiện exception",
      "Chương trình chạy thành công và in ra màn hình 567"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "B nằm trong cùng package với A (do không có khai báo package nào). Vì vậy, B có quyền truy cập: a (package-private), b (protected) và c (public). Chương trình sẽ chạy thành công và in ra 5, 6, 7."
  },
  {
    id: 4,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: "public class Main {\n  public Main(int i, int j) {\n    System.out.println(method(i, j));\n  }\n  int method(int i, int j) {\n    return i++ + ++j;\n  }\n  public static void main(String[] ss) {\n    Main main = new Main(123, 456);\n  }\n}",
    options: ["581", "579", "580"],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "i++ là hậu tố nên trả về giá trị ban đầu là 123 (sau đó i mới tăng). ++j là tiền tố nên tăng j trước thành 457 rồi mới trả về. Kết quả: 123 + 457 = 580."
  },
  {
    id: 5,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: "class X {\n  int method(int i) { return i *= i; }\n}\nclass Y extends X {\n  double method(double d) { return d /= d; }\n}\nclass Z extends Y {\n  float method(float f) { return f += f; }\n}\npublic class Test {\n  public static void main(String[] ss) {\n    Z z = new Z();\n    System.out.println(z.method(210.2));\n  }\n}",
    options: ["1.0", "Báo lỗi biên dịch", "210.2", "420.4"],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Biến z là một đối tượng của lớp Z. Khi gọi z.method(210.2), trình biên dịch tìm kiếm phương thức phù hợp nhất. Vì 210.2 là double, Java sẽ chọn method(double d) trong lớp Y. Giá trị trả về là 210.2 / 210.2 = 1.0."
  },
  {
    id: 6,
    question: "Chọn phát biểu đúng về lớp trừu tượng (abstract class)",
    options: [
      "Không thể tạo thể hiện trực tiếp của lớp trừu tượng.",
      "Lớp trừu tượng thường chưa hoàn thiện, được dùng làm lớp cơ sở để các lớp khác kế thừa.",
      "Lớp trừu tượng phải có ít nhất 1 phương thức trừu tượng.",
      "Lớp trừu tượng không cần có phương thức khởi dựng."
    ],
    correctAnswer: [0, 1, 3],
    isMultiple: true,
    explanation: "Phát biểu 3 sai vì trong Java, bạn có thể khai báo một lớp là abstract dù nó không chứa bất kỳ phương thức trừu tượng nào. Các phát biểu còn lại đều đúng."
  },
  {
    id: 7,
    question: "Có thể dùng những chỉ định truy cập nào với phương thức khởi tạo?",
    options: [
      "public",
      "package (default)",
      "protected",
      "private"
    ],
    correctAnswer: [0, 1, 2, 3],
    isMultiple: true,
    explanation: "Tất cả các Access Modifiers (public, protected, default, private) đều có thể được sử dụng cho phương thức khởi tạo (constructor)."
  },
  {
    id: 8,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: "class M {\n  int i = 50;\n  public M(int j) {\n    System.out.print(i);\n    this.i = j * 10;\n  }\n}\nclass N extends M {\n  public N(int j) {\n    super(j);\n    System.out.print(i);\n    this.i = j * 20;\n  }\n}\npublic class Test {\n  public static void main(String[] ss) {\n    N n = new N(25);\n    System.out.print(n.i);\n  }\n}",
    options: ["02500500", "0500", "505050", "50250500"],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "1. Gọi N(25) -> gọi super(25) -> vào M(25) -> in i ban đầu (50) -> gán i = 250. 2. Quay lại N(25) -> in i (lúc này là 250) -> gán i = 500. 3. main in n.i (500). Kết quả in ra: 50250500."
  },
  {
    id: 9,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: "class A {\n  int i = 200;\n}\nclass B extends A {\n  int i = 100;\n}\npublic class Test {\n  public static void main(String[] ss) {\n    B a = new B();\n    System.out.println(a.i);\n  }\n}",
    options: ["100", "Báo lỗi biên dịch", "200"],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Ở lớp B, trường i được khai báo lại với giá trị 100, làm che khuất trường i của lớp A. Khi gọi a.i với a là kiểu B, trường được lấy là của lớp B. Kết quả in ra là 100."
  },
  {
    id: 10,
    question: "Kết quả in ra màn hình khi thực thi đoạn code sau là gì?",
    code: "public class Person {\n  private int age;\n  private String name;\n  public Person(int age, String name) {\n    this.age = age;\n    this.name = name;\n  }\n  public static void main(String[] args) {\n    Person p1 = new Person(20, \"Hung\");\n    Person p2 = new Person(20, \"Hung\");\n    Person p3 = p2;\n    System.out.print((p1 == p2) + \" \");\n    System.out.print(p1.equals(p2) + \" \");\n    System.out.print((p1 == p3) + \" \");\n    System.out.print((p2 == p3) + \" \");\n  }\n}",
    options: [
      "false false false true",
      "true true false true",
      "true true true true",
      "false false false false",
      "false false true true",
      "true true false false"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "(p1 == p2) so sánh địa chỉ -> false. p1.equals(p2) chưa override nên so sánh địa chỉ -> false. (p1 == p3) -> false. (p2 == p3) cùng trỏ 1 đối tượng -> true."
  },
  {
    id: 11,
    question: "Cho chương trình Java sau được lưu toàn bộ trong file Test.java. Nhận định nào sau đây đúng:",
    code: "class A {}\nclass B extends A {}\npublic class Test {\n  public static void main(String[] args) {\n    A a = new A();\n    B b = new B();\n    a = b;\n  }\n}",
    options: [
      "Câu lệnh gán a=b; là chuyển đổi kiểu dữ liệu tham chiếu upcasting",
      "Câu lệnh gán a=b; là chuyển đổi kiểu dữ liệu tham chiếu downcasting",
      "Câu lệnh gán a=b; là chuyển đổi kiểu dữ liệu tham chiếu clientservercasting",
      "Câu lệnh gán a=b; là chuyển đổi kiểu dữ liệu tham chiếu peertopeercasting"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Upcasting là gán một đối tượng của lớp con (B) cho một biến của lớp cha (A). Quá trình này không cần ép kiểu tường minh."
  },
  {
    id: 12,
    question: "Cho 4 hàm f là nạp chồng của nhau như sau. Kết quả khi lần lượt thực thi độc lập các lệnh f((byte)5); f(6); f('c'); f(5.5); f(7L); là gì?",
    code: "public static void f(int i) { p(\"int\"); }\npublic static void f(char c) { p(\"char\"); }\npublic static void f(long l) { p(\"long\"); }\npublic static void f(float f) { p(\"float\"); }\npublic static void p(String s) { System.out.print(s + \" \"); }",
    options: [
      "int, int, char, float, long",
      "int, int, char, lỗi biên dịch, long",
      "char, int, char, float, long",
      "char, int, char, lỗi biên dịch, long"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "byte -> int. 6 -> int. 'c' -> char. 5.5 là double mặc định, không tự động chuyển xuống float được nên f(5.5) gây lỗi biên dịch. 7L -> long."
  },
  {
    id: 13,
    question: "Biết rằng lớp B kế thừa lớp A, lớp C kế thừa lớp B. Chọn những phát biểu đúng về đoạn code sau:",
    code: "1. ArrayList<B> list1 = new ArrayList<B>();\n2. ArrayList<A> list2 = (ArrayList<A>) list1;\n3. ArrayList<C> list3 = (ArrayList<C>) list1;",
    options: [
      "Dòng 2 không có lỗi biên dịch, nhưng có lỗi thực thi (runtime error)",
      "Dòng 3 không có lỗi biên dịch, nhưng có lỗi thực thi (runtime error)",
      "Dòng 2 có lỗi biên dịch",
      "Dòng 3 có lỗi biên dịch",
      "Không có lỗi biên dịch hay thực thi nào"
    ],
    correctAnswer: [2, 3],
    isMultiple: true,
    explanation: "Java không cho phép ép kiểu trực tiếp giữa các kiểu có tham số generics khác nhau để bảo đảm sự an toàn về kiểu (type safety). Do đó cả dòng 2 và 3 đều gây lỗi biên dịch."
  },
  {
    id: 14,
    question: "Đoạn mã sau khi chạy in ra gì ?",
    code: "public class Demo {\n  public static void main(String[] s) {\n    try {\n      nestedTry();\n    } catch (Exception ex) {\n      System.out.println(\"AAA\");\n    }\n  }\n  static void nestedTry() {\n    try {\n      int i = Integer.parseInt(\"abc\");\n    } catch (NullPointerException ex) {\n      System.out.println(\"BBB \");\n    }\n  }\n}",
    options: ["BBB", "Không in ra gì", "AAA", "BBBAAA"],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Integer.parseInt(\"abc\") ném ra NumberFormatException. Khối catch trong nestedTry chỉ bắt NullPointerException nên ngoại lệ bị ném ra ngoài. Main bắt được Exception và in ra \"AAA\"."
  },
  {
    id: 15,
    question: "Những khai báo mảng nào trong JAVA bị lỗi?",
    options: [
      "boolean[] bit = new boolean[5];",
      "float[] value = new float[2*3];",
      "int[] number1 = {10,9,8,7,6};",
      "int[] number2 = new int[]{10, 9};",
      "int[][] number3 = { {1,2}, {1,2}, {1,2} };",
      "int[][] number4[] = { {1,2}, {1,2}, {1,2} };",
      "Tất cả khai báo đều đúng."
    ],
    correctAnswer: [6],
    isMultiple: false,
    explanation: "Tất cả các khai báo trên đều đúng cú pháp và hợp lệ trong ngôn ngữ Java."
  },
  {
    id: 16,
    question: "Chọn những phát biểu đúng về kỹ thuật ghi đè (overriding)",
    options: [
      "Phương thức ở lớp con hoàn toàn giống về chữ ký với phương thức kế thừa ở lớp cha",
      "Phương thức lớp con KHÔNG bắt buộc có cùng kiểu trả về với phương thức kế thừa trong lớp cha (có thể là covariant return type)",
      "Chỉ định truy cập của phương thức ở lớp con KHÔNG giới hạn chặt hơn chỉ định truy cập của phương thức kế thừa trong lớp cha",
      "Phương thức lớp con KHÔNG tung ra kiểu ngoại lệ mới so với phương thức kế thừa trong lớp cha"
    ],
    correctAnswer: [0, 1, 2, 3],
    isMultiple: true,
    explanation: "Tất cả các phát biểu đều đúng. Chữ ký (tên + tham số) phải giống. Kiểu trả về có thể là subtype. Access modifier không được thu hẹp. Ngoại lệ ném ra không được rộng hơn cha."
  },
  {
    id: 17,
    question: "Đối tượng trong chương trình Java thông thường sẽ được cấp phát trong loại bộ nhớ nào?",
    options: [
      "Bộ nhớ RAM",
      "Bộ nhớ ROM",
      "Bộ nhớ Cache",
      "Các đáp án đưa ra ở đây đều không đúng"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Khi một đối tượng được tạo ra trong Java, nó được cấp phát trong bộ nhớ heap (heap memory), mà bộ nhớ heap nằm trong bộ nhớ RAM."
  },
  {
    id: 18,
    question: "Chọn phát biểu đúng về giao diện (interface)",
    options: [
      "Là kiểu dữ liệu trừu tượng, được dùng để đặc tả các hành vi mà các lớp phải thực thi",
      "Giao diện chỉ chứa các phương thức public (Từ Java 9 trở đi thì có thể có thêm phương thức static và phương thức default)",
      "Giao diện giúp mô phỏng đa thừa kế",
      "Sử dụng giao diện giúp mã nguồn ít bị phụ thuộc vào nhau hơn"
    ],
    correctAnswer: [0, 1, 2, 3],
    isMultiple: true,
    explanation: "Tất cả các đáp án đều đúng. Giao diện giúp định nghĩa hành vi, giảm phụ thuộc và cho phép một lớp mô phỏng đa kế thừa bằng cách implements nhiều interface cùng lúc."
  },
  {
    id: 19,
    question: "Chương trình Java sau được lưu toàn bộ trong file Test.java sẽ cho kết quả gì?",
    code: "public class Test {\n  public static void main(String args[]) {\n    if(args.length > 0)\n      System.out.println(args.length);\n  }\n}",
    options: [
      "Chương trình chạy thành công, không in gì hoặc in một số nguyên > 0 ra màn hình",
      "Chương trình chạy thành công và in xâu kí tự Infinity ra màn hình",
      "Chương trình chạy thành công và in xâu kí tự NaN ra màn hình",
      "Chương trình biên dịch thành công nhưng xuất hiện exception khi chạy",
      "Lỗi biên dịch"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Chương trình đúng cú pháp. Nếu chạy không truyền tham số, args.length == 0 nên không in gì. Nếu truyền tham số thì in ra số lượng. Không hề có lỗi biên dịch hay runtime."
  },
  {
    id: 20,
    question: "Chương trình Java dưới đây được lưu toàn bộ trong file Test.java. Nhận định nào dưới đây là đúng với chương trình này?",
    code: "final class A {\n  int i;\n}\nclass B extends A {\n  int j;\n  void display() {\n    System.out.println(j + \" \" + i);\n  }\n}\npublic class Test {\n  public static void main(String args[]) {\n    B obj = new B();\n    B.i = 2;\n    B.j = 3;\n    obj.display();\n  }\n}",
    options: [
      "Chương trình chạy thành công và in ra màn hình 2 3",
      "Chương trình chạy thành công và in ra màn hình 3 2",
      "Lỗi khi chạy chương trình",
      "Lỗi khi biên dịch chương trình"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "1) final class A không thể bị kế thừa. 2) i và j là biến instance nhưng trong main() lại truy cập như biến static (B.i và B.j). Cả 2 lỗi này đều dẫn tới lỗi biên dịch."
  },
  {
    id: 21,
    question: "Kết quả khi thực thi lớp Test là gì?",
    code: "class Person {\n  private int age;\n  public Person(int age) { this.age = age; }\n  public int getAge() { return age; }\n  public void setAge(int age) { this.age = age; }\n}\nclass Test {\n  public static void increaseAge (Person p) {\n    p.setAge(p.getAge() + 1);\n  }\n  public static void swap (Person p1, Person p2) {\n    Person tmp = p1;\n    p1 = p2;\n    p2 = tmp;\n  }\n  public static void main(String[] args) {\n    Person p1 = new Person(15);\n    Person p2 = new Person(20);\n    increaseAge (p1);\n    swap (p1, p2);\n    System.out.print(p1.getAge() + \" \");\n    System.out.print(p2.getAge() + \" \");\n  }\n}",
    options: ["15 20", "16 20", "20 15", "20 16"],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "increaseAge() thay đổi giá trị thuộc tính bên trong đối tượng p1 thành 16. swap() chỉ hoán đổi bản sao của tham chiếu, không ảnh hưởng đến biến p1, p2 gốc ở main(). Kết quả là 16 20."
  },
  {
    id: 22,
    question: "Hai phương thức sau có chồng nhau không (Overloading)?",
    code: "class A {\n  public int method(int a) {\n    return a;\n  }\n}\nclass B {\n  public int method(int a, int b) {\n    return a + b;\n  }\n}",
    options: ["Có", "Không"],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Không. Hai phương thức này nằm ở hai lớp độc lập (A và B) không có quan hệ kế thừa. Nạp chồng (Overloading) phải xảy ra trong cùng một lớp hoặc thông qua kế thừa."
  },
  {
    id: 23,
    question: "Phát biểu nào đúng về gói (package) trong Java?",
    options: [
      "Mỗi gói sẽ có một thư mục tương ứng",
      "Tên gói theo quy ước nên dùng chữ viết thường",
      "Sử dụng dấu . trong tên gói sẽ tạo quan hệ gói cha gói con",
      "Kết hợp với chỉ định truy cập của lớp, gói giúp xác định phạm vi hoạt động của lớp",
      "Cho lớp nào vào gói nào là tùy ý, không cần chú ý tổ chức...",
      "Gói giúp tạo các lớp có tên giống nhau",
      "Gói giúp tổ chức và xác định vị trí lớp dễ dàng"
    ],
    correctAnswer: [0, 1, 2, 3, 5, 6],
    isMultiple: true,
    explanation: "Phát biểu 'Cho lớp nào vào gói nào là tùy ý...' là sai vì thực tế ta nên tổ chức các lớp có quan hệ với nhau vào chung một gói. Các phát biểu còn lại đều đúng."
  },
  {
    id: 24,
    question: "Từ khóa được dùng để định nghĩa một giao diện là:",
    options: ["intf", "Intf", "interface", "Interface"],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Từ khóa chuẩn trong Java là 'interface' (viết thường toàn bộ)."
  },
  {
    id: 25,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: "public class Test {\n  static int method() {\n    int i = 0;\n    try {\n      i = 1;\n      return i;\n    } catch (Exception e) {\n      i = 2;\n      return i;\n    } finally {\n      i = 3;\n    }\n  }\n  public static void main(String[] ss) {\n    System.out.println(method());\n  }\n}",
    options: ["1", "2", "3"],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Trong khối try, i=1 và lệnh return lưu giá trị 1 để trả về. Khối finally vẫn chạy và đổi i=3, nhưng không ghi đè giá trị đã được chốt ở lệnh return trước đó. Kết quả in ra 1."
  },
  {
    id: 26,
    question: "Cho 2 interface như sau. Lớp Person sau bị lỗi ở những dòng nào?",
    code: "interface Printable { public void print(); }\ninterface Stringable { String stringify(); }\n\nclass Person implements Printable, Stringable {\n  protected String name;\n  public String stringify() { return name; }\n  public void print() { System.out.println(name); }\n\n  public static void main(String[] args) {\n    Printable p1 = new Printable(); // Dòng 10\n    Printable p2 = new Person();    // Dòng 11\n    String name = p2.stringify();   // Dòng 12\n  }\n}",
    options: ["Dòng 1", "Dòng 6", "Dòng 10", "Dòng 11", "Dòng 12"],
    correctAnswer: [2, 4],
    isMultiple: true,
    explanation: "Dòng 10 lỗi vì Interface không thể khởi tạo trực tiếp bằng từ khóa new. Dòng 12 lỗi vì p2 có kiểu khai báo là Printable, mà Printable không định nghĩa phương thức stringify()."
  },
  {
    id: 27,
    question: "Đoạn mã sau khi chạy in ra gì?",
    code: "public class Test {\n  static void m1(String s1) { s1.toLowerCase(); System.out.print(s1); }\n  static void m2(String s1) { s1 = s1.toUpperCase(); System.out.print(s1); }\n  static void m3(StringBuffer s1) { s1.delete(0,1); System.out.print(s1); }\n  static void m4(StringBuffer s1) { s1 = s1.delete(0,1); System.out.print(s1); }\n  public static void main(String[] s) {\n    String s1 = \"Ab\";\n    StringBuffer s2 = new StringBuffer(\"CdE\");\n    m1(s1); System.out.print(s1 + \" \");\n    m2(s1); m3(s2); m4(s2); System.out.print(s2);\n  }\n}",
    options: [
      "abABAB DEEE",
      "AbABAb dEEE",
      "abABAB dEdEdE",
      "AbABAB DEEE",
      "AbAb ABdEEE"
    ],
    correctAnswer: [4],
    isMultiple: false,
    explanation: "m1 in 'Ab' (vì string immutable). main in 'Ab '. m2 in 'AB' (gán cục bộ). m3 xóa 'C' in 'dE' (StringBuffer mutable). m4 xóa 'd' in 'E'. main in 'E'. Gộp lại: AbAb ABdEEE."
  },
  {
    id: 28,
    question: "Cho 5 lớp như sau. Những lớp nào bị lỗi biên dịch?",
    code: "abstract class Writer { public abstract void write(String s) throws RuntimeException; }\nclass HTMLWriter extends Writer { public void write(String s) throws RuntimeException {} }\nclass CSVWriter extends Writer { public void write(String s) throws Exception {} }\nclass JSONWriter { public void write(String s) throws Exception {} }\nclass TEXTWriter extends Writer { public void write(String s) throws ArithmeticException {} }",
    options: [
      "HTMLWriter",
      "CSVWriter",
      "JSONWriter",
      "TEXTWriter"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Phương thức ghi đè trong CSVWriter ném ra Exception. Exception là lớp cha của RuntimeException, làm mở rộng phạm vi ngoại lệ (không hợp lệ khi ghi đè). JSONWriter không kế thừa nên hợp lệ."
  },
  {
    id: 29,
    question: "Cho chương trình như dưới đây được lưu toàn bộ trong file HelloWorld.java. Nhận định nào sau đây là đúng với chương trình này?",
    code: "public class Hello {\n  static int add(int i, int j) {\n    return i + j;\n  }\n}\npublic class HelloWorld extends Hello {\n  public static void main(String argv[]) {\n    short sNum = 10;\n    System.out.println(add(sNum, 6));\n  }\n}",
    options: [
      "Chương trình chạy và in 16 ra màn hình",
      "Lỗi khi biên dịch",
      "Lỗi khi chạy chương trình",
      "Chương trình chạy và in 6 ra màn hình"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Lỗi biên dịch do có hai lớp đánh dấu public (Hello và HelloWorld) trong cùng một file .java. Trong Java, mỗi file chỉ được chứa tối đa 1 lớp public và tên file phải trùng với tên lớp public."
  },
  {
    id: 30,
    question: "Chương trình Java sau được lưu toàn bộ trong file Output.java sẽ cho kết quả là gì?",
    code: "public class Output {\n  public static void main(String args[]) {\n    double a, b, c;\n    a = 3.0 / 0;\n    b = 0 / 4.0;\n    c = 0 / 0.0;\n    System.out.println(\"a=\" + a + \" b=\" + b + \" c=\" + c);\n  }\n}",
    options: [
      "Lỗi khi chạy chương trình",
      "Lỗi khi biên dịch chương trình",
      "Chương trình chạy thành công và in ra màn hình a=NaN b=0.0 c=Infinity",
      "Chương trình chạy thành công và in ra màn hình a=0.0 b=Infinity c=NaN",
      "Chương trình chạy thành công và in ra màn hình a=Infinity b=0.0 c=NaN"
    ],
    correctAnswer: [4],
    isMultiple: false,
    explanation: "Phép chia số thực cho 0 (3.0/0) trả về Infinity. 0 chia cho số thực (0/4.0) trả về 0.0. Phép chia 0/0.0 trả về NaN (Not a Number)."
  },
  {
    id: 31,
    question: "Cho trước lớp Employee. Kết quả in ra màn hình khi thực thi đoạn chương trình sau là gì?",
    code: "System.out.print(\"Begin \");\nEmployee e;\ntry {\n  System.out.println(e.toString());\n} catch (Exception ex) {\n  System.out.print(\"Ex \");\n} catch (RuntimeException ex) {\n  System.out.print(\"RunEx \");\n}\nSystem.out.println(\"End \");",
    options: [
      "Begin Ex End",
      "Begin RunEx End",
      "Begin End",
      "Không biên dịch được nên không thực thi được"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Lỗi biên dịch vì 2 lý do: 1) Khối catch(RuntimeException) đặt sau catch(Exception) (lớp con đặt sau lớp cha là lỗi Unreachable code). 2) Biến cục bộ 'e' chưa được khởi tạo đã sử dụng gọi e.toString()."
  },
  {
    id: 32,
    question: "Cho 3 lớp: lớp Person, lớp Employee, và lớp Manager như sau. Kết quả thực thi in ra màn hình gì?",
    code: "class Person { public void getDetail() { System.out.print(\"P \"); } }\nclass Employee extends Person { public void getDetail() { System.out.print(\"E \"); } }\nclass Manager extends Employee { public void getDetail() { System.out.print(\"M \"); } }\n\n// Trong main:\nPerson o1 = new Employee();\nEmployee o2 = new Manager();\nPerson o3 = new Person();\no1.getDetail();\no2.getDetail();\no3.getDetail();",
    options: [
      "Bị lỗi biên dịch liên quan tới ép kiểu downcasting",
      "Bị lỗi thực thi liên quan tới ép kiểu downcasting",
      "PEM",
      "EMP"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Do tính chất đa hình (Polymorphism): o1 mang đối tượng thực là Employee -> in E. o2 mang đối tượng thực là Manager -> in M. o3 là Person -> in P. Kết quả: E M P."
  },
  {
    id: 33,
    question: "Những phát biểu nào sau đây là đúng về nguyên lý đóng gói (Encapsulation)",
    options: [
      "Đóng gói là đưa dữ liệu và các phương thức thao tác tới dữ liệu đó vào một đơn vị duy nhất",
      "Đóng gói giúp hạn chế truy cập tới một số thành phần của đối tượng",
      "Các phương thức getter và setter không phải là một phần của kỹ thuật đóng gói",
      "Các phương thức getter và setter giúp thực hiện che giấu thông tin (information hidding)",
      "Đóng gói giúp mã nguồn an toàn hơn với người dùng cuối (end user)",
      "Đóng gói giúp mã nguồn an toàn hơn với lập trình viên khác (developer)"
    ],
    correctAnswer: [0, 1, 3, 5],
    isMultiple: true,
    explanation: "Phát biểu 3 sai vì getter/setter chính là công cụ của đóng gói. Phát biểu 5 sai vì end-user chỉ thao tác UI không đụng vào code. Đóng gói bảo vệ trạng thái của đối tượng với các developer khác."
  },
  {
    id: 34,
    question: "Cho chương trình như dưới đây được lưu toàn bộ trong file Student.java. Lựa chọn nào nêu ra là đúng?",
    code: "public class Student {\n  int marks;\n  public Student() {}\n  public Student(int x) {\n    marks = x;\n  }\n  public static void main(String[] args) {\n    Student s1 = new Student(100);\n    Student s2 = new Student();\n    Student s3;\n  }\n}",
    options: [
      "Chương trình bị lỗi khi biên dịch",
      "Chương trình chạy và xuất hiện ngoại lệ (exception)",
      "Chương trình chạy thành công và 2 thể hiện (instance) của lớp Student được khởi tạo ra (instantiated)",
      "Chương trình chạy thành công và 3 thể hiện (instance) của lớp Student được khởi tạo ra (instantiated)"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Chương trình biên dịch bình thường. Chỉ có 2 lần gọi từ khóa 'new' tương ứng 2 thể hiện (s1, s2). Biến s3 chỉ khai báo tham chiếu mà chưa khởi tạo (chưa cấp phát bộ nhớ)."
  },
  {
    id: 35,
    question: "Đoạn mã sau bị lỗi biên dịch ở những dòng nào?",
    code: "class A {\n  public int check (double a) { return (int) a; }\n  public double check (double a) { return a; } // Dòng 5\n}\nclass B {\n  private int check (double a, int b) { return (int) a + b; }\n  private double check (double a, int b) { return a + b; } // Dòng 13\n}",
    options: ["Dòng 2", "Dòng 3", "Dòng 5", "Dòng 6", "Dòng 10", "Dòng 11", "Dòng 13", "Dòng 14"],
    correctAnswer: [2, 6],
    isMultiple: true,
    explanation: "Lỗi ở Dòng 5 và 13 vì Java không hỗ trợ nạp chồng phương thức (method overloading) mà chỉ khác nhau ở kiểu trả về. Các phương thức bị trùng hoàn toàn về tên và danh sách tham số."
  },
  {
    id: 36,
    question: "Phát biểu nào đúng về lớp trong Java",
    options: [
      "Khai báo lớp có thể đặt trước khai báo package",
      "Các chỉ định truy cập có thể dùng cho lớp là public, private, default, protected",
      "Các chỉ định truy cập có thể dùng cho lớp là public, private, default",
      "Các chỉ định truy cập có thể dùng cho lớp là public, private",
      "Các chỉ định truy cập có thể dùng cho lớp là public, default",
      "Chỉ định truy cập cho lớp xác định phạm vi sử dụng của lớp",
      "Bên trong thân lớp phải có ít nhất một thuộc tính hoặc phương thức gì đó"
    ],
    correctAnswer: [4, 5],
    isMultiple: true,
    explanation: "Lớp mức cao nhất (top-level class) chỉ có thể mang từ khóa public hoặc default. Bên trong lớp có thể rỗng. Package phải luôn khai báo ở đầu file (trước class)."
  },
  {
    id: 37,
    question: "Cho các giao diện và lớp như sau. Có những lỗi ở dòng nào?",
    code: "interface Printable { void print(); }\ninterface Stringable extends Printable { String stringify(); } // Dòng 4\nclass Person implements Stringable { // Dòng 7\n  protected String name;\n  public String stringify() { return name; } // Dòng 9\n}",
    options: [
      "Dòng 4, do một giao diện không được kế thừa một giao diện khác",
      "Dòng 5, do phương thức trong interface bắt buộc phải có chỉ định truy cập là public",
      "Dòng 7",
      "Dòng 9"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Dòng 7 bị lỗi vì lớp Person cài đặt (implements) Stringable (interface này lại extends Printable) nhưng Person mới chỉ triển khai stringify() mà chưa triển khai hàm print() của Printable."
  },
  {
    id: 38,
    question: "Đoạn code sau bị lỗi biên dịch ở những dòng nào?",
    code: "public class Person {\n  private int age;\n  private String name;\n  public void Person(int age) {\n    this.age = age;\n  }\n  public static void main(String[] args) {\n    Person p = new Person(15); // Dòng 8\n    p.name = \"Peter\";\n  }\n}",
    options: ["Dòng 4", "Dòng 5", "Dòng 8", "Dòng 9", "Không có lỗi biên dịch nào"],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Việc thêm kiểu trả về 'void' vào hàm Person biến nó thành một hàm thường thay vì constructor. Do đó ở dòng 8 lệnh new Person(15) sẽ báo lỗi vì trình biên dịch không tìm thấy constructor nào nhận tham số int."
  },
  {
    id: 39,
    question: "Câu hỏi tự luận 1: Nêu và phân tích 4 nguyên lý chính của lập trình hướng đối tượng.",
    code: "",
    options: [],
    correctAnswer: [],
    isMultiple: false,
    isEssay: true,
    explanation: "- Tính Đóng gói (Encapsulation): Che giấu dữ liệu, chỉ cho truy cập qua phương thức công khai. Giúp bảo vệ dữ liệu nội bộ.\n- Tính Kế thừa (Inheritance): Lớp con sử dụng lại hoặc mở rộng đặc điểm của lớp cha, giúp tái sử dụng mã nguồn.\n- Tính Đa hình (Polymorphism): Phương thức có nhiều hình thức khác nhau (tĩnh - overloading, động - overriding), giúp mã linh hoạt.\n- Tính Trừu tượng (Abstraction): Ẩn chi tiết phức tạp, chỉ cung cấp những gì cần thiết qua abstract class hoặc interface."
  },
  {
    id: 40,
    question: "Câu hỏi tự luận 2: Phân biệt sự giống và khác nhau giữa Interface và Abstract Class.",
    code: "",
    options: [],
    correctAnswer: [],
    isMultiple: false,
    isEssay: true,
    explanation: "- Giống nhau: Cả hai đều trừu tượng, không thể khởi tạo đối tượng trực tiếp. Lớp con phải kế thừa/triển khai các phương thức định nghĩa.\n- Khác nhau:\n + Interface: Chỉ chứa hằng số (public static final) và hàm abstract (hoặc default method từ Java 8). Không có constructor hay biến instance. Hỗ trợ đa kế thừa.\n + Abstract Class: Chứa biến instance, có constructor, có thể có phương thức chứa nội dung, có đủ access modifier (private, protected...). Chỉ hỗ trợ đơn kế thừa."
  },
  {
    id: 41,
    question: "Câu hỏi tự luận 3: Vẽ biểu đồ lớp mô tả hệ thống cho nhà hàng (Main Dish, Drink, Order...)",
    code: "",
    options: [],
    correctAnswer: [],
    isMultiple: false,
    isEssay: true,
    explanation: "- Quan hệ kế thừa (Inheritance): Tạo lớp cha MenuItem chứa chung name, price, displayInfo(). Lớp MainDish và Drink kế thừa MenuItem (bổ sung portion, calories, size, isCold...).\n- Quan hệ kết hợp (Association/Aggregation): Lớp Order có mối quan hệ 1-nhiều với MenuItem (Order chứa List<MenuItem>). Order chứa các hàm addItem(), displayOrder(), calculateTotal()."
  }
];

export default function QuizApp() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Xáo trộn vị trí câu hỏi khi component mount
  useEffect(() => {
    setQuestions([...initialQuestions].sort(() => Math.random() - 0.5));
  }, []);

  // Xử lý khi người dùng chọn đáp án
  const handleOptionChange = (questionId: number, optionIndex: number, isMultiple: boolean) => {
    if (isSubmitted) return;

    setUserAnswers((prev) => {
      const currentAnswers = prev[questionId] ?? [];
      if (isMultiple) {
        if (currentAnswers.includes(optionIndex)) {
          return { ...prev, [questionId]: currentAnswers.filter((i) => i !== optionIndex) };
        } else {
          return { ...prev, [questionId]: [...currentAnswers, optionIndex].sort() };
        }
      } else {
        return { ...prev, [questionId]: [optionIndex] };
      }
    });
  };

  // Nộp bài và tính điểm
  const handleSubmit = () => {
    let currentScore = 0;
    questions.forEach(q => {
      if (q.isEssay) {
        return;
      }
      const selected = userAnswers[q.id] ?? [];
      const correct = q.correctAnswer.slice().sort();
      // So sánh 2 mảng xem có khớp hoàn toàn không
      if (JSON.stringify(selected) === JSON.stringify(correct)) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
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
                      
                      if (isSubmitted) {
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
                            disabled={isSubmitted}
                            className={`w-5 h-5 mr-3 accent-indigo-600 ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          />
                          <span className="font-medium text-[15px]">{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  {isSubmitted && (
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