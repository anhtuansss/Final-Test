'use client';

import React, { useState } from 'react';

type QuestionType = 'single' | 'multiple';

interface Question {
  id: number;
  type: QuestionType;
  content: string;
  codeSnippet?: string;
  options: string[];
  correctAnswers: number[];
  rationale: string;
}

const questions: Question[] = [
  {
    "id": 1,
    "type": "single",
    "content": "Upcasting trong Java mang ý nghĩa gì?",
    "options": [
      "Chuyển đổi tham chiếu từ lớp cha xuống lớp con, yêu cầu ép kiểu tường minh.",
      "Chuyển đổi tham chiếu từ lớp con lên lớp cha, diễn ra tự động và an toàn.",
      "Chuyển đổi giữa hai lớp không có quan hệ kế thừa.",
      "Chuyển đổi phương thức của lớp con thành phương thức của lớp cha."
    ],
    "correctAnswers": [1],
    "rationale": "Slide 8: Upcasting là đi lên trên cây phân cấp thừa kế, nhìn nhận đối tượng thuộc lớp dẫn xuất như là đối tượng thuộc lớp cơ sở. Diễn ra tự động."
  },
  {
    "id": 2,
    "type": "single",
    "content": "Downcasting mang đặc điểm nào sau đây?",
    "options": [
      "Luôn luôn diễn ra tự động mà không cần ép kiểu.",
      "Đi lên cây phân cấp thừa kế.",
      "Bắt buộc phải ép kiểu tường minh và có thể gây lỗi ClassCastException khi Run-time nếu ép kiểu sai bản chất vùng nhớ.",
      "Được trình biên dịch kiểm tra và báo lỗi Compile-time nếu ép kiểu sai bản chất vùng nhớ."
    ],
    "correctAnswers": [2],
    "rationale": "Slide 12: Downcasting đi xuống cây thừa kế, KHÔNG tự động chuyển đổi, phải ép kiểu. Nếu đối tượng thực không tương thích sẽ lỗi Run-time (ClassCastException)."
  },
  {
    "id": 3,
    "type": "multiple",
    "content": "Những mệnh đề nào ĐÚNG khi nói về Liên kết tĩnh (Static binding / Early binding)? (Chọn nhiều đáp án)",
    "options": [
      "Được quyết định tại thời điểm biên dịch (Compile-time).",
      "Áp dụng cho các phương thức static, private và final.",
      "Áp dụng cho các phương thức được ghi đè (overridden methods).",
      "Tốc độ thực thi nhanh hơn so với Liên kết động."
    ],
    "correctAnswers": [0, 1, 3],
    "rationale": "Slide 18: Liên kết tĩnh diễn ra lúc biên dịch, áp dụng cho các hàm static (cũng như private/final không thể ghi đè), ưu điểm là tốc độ nhanh."
  },
  {
    "id": 4,
    "type": "single",
    "content": "Liên kết động (Dynamic binding / Late binding) hoạt động dựa trên nguyên tắc nào?",
    "options": [
      "Dựa vào kiểu của biến tham chiếu (Reference type) để quyết định phương thức nào được gọi tại Compile-time.",
      "Trì hoãn việc liên kết cho đến lúc chạy (Run-time), dựa vào kiểu của đối tượng thực sự (Object type) trong bộ nhớ.",
      "Dựa vào các từ khóa static và final để quyết định hàm cần gọi.",
      "Quyết định dựa trên access modifier của phương thức."
    ],
    "correctAnswers": [1],
    "rationale": "Slide 20: Liên kết động trì hoãn liên kết cho đến thời gian chạy (run-time), phiên bản của phương thức thực thi phụ thuộc vào đối tượng thực tế được gọi."
  },
  {
    "id": 5,
    "type": "single",
    "content": "Toán tử `instanceof` trả về giá trị gì nếu biến tham chiếu đang trỏ tới `null`?",
    "options": [
      "Báo lỗi NullPointerException tại thời điểm chạy.",
      "Báo lỗi biên dịch.",
      "Trả về true.",
      "Trả về false."
    ],
    "correctAnswers": [3],
    "rationale": "Slide 14: Toán tử instanceof kiểm tra đối tượng. Nếu đối tượng là null thì luôn luôn trả về false (không ném ngoại lệ)."
  },
  {
    "id": 6,
    "type": "single",
    "content": "Thuộc tính (Biến) trong Java tuân theo cơ chế liên kết nào?",
    "options": [
      "Liên kết động (Dynamic binding).",
      "Liên kết tĩnh (Static binding) - Variable Hiding.",
      "Phụ thuộc vào từ khóa ảo (virtual).",
      "Không tuân theo cơ chế nào, báo lỗi nếu trùng tên."
    ],
    "correctAnswers": [1],
    "rationale": "Thuộc tính trong Java không có tính đa hình. Chúng tuân theo liên kết tĩnh (được quyết định bởi kiểu tham chiếu tại compile-time), hiện tượng này gọi là Variable Hiding."
  },
  {
    "id": 7,
    "type": "multiple",
    "content": "Đa hình (Polymorphism) trong Java thể hiện qua những khía cạnh nào? (Chọn nhiều đáp án)",
    "options": [
      "Đa hình phương thức (Overloading).",
      "Đa hình đối tượng (Nhìn nhận đối tượng theo nhiều kiểu thông qua Upcasting/Downcasting).",
      "Đa hình thuộc tính (Ghi đè thuộc tính).",
      "Các đối tượng khác nhau cùng đáp ứng một thông điệp nhưng giải nghĩa theo cách khác nhau (Overriding & Dynamic Binding)."
    ],
    "correctAnswers": [0, 1, 3],
    "rationale": "Slide 26: Đa hình trong lập trình thể hiện qua đa hình phương thức (chồng phương thức) và đa hình đối tượng (nhìn nhận đối tượng theo nhiều kiểu, giải nghĩa thông điệp khác nhau)."
  },
  {
    "id": 8,
    "type": "single",
    "content": "Đâu là bẫy phổ biến nhất khi thực hiện Downcasting?",
    "options": [
      "Trình biên dịch luôn bắt được lỗi ép kiểu sai.",
      "Quên không Upcasting trước khi Downcasting.",
      "Gây ra lỗi biên dịch (Compile error) nếu 2 lớp nằm trên cùng cây kế thừa.",
      "Ép kiểu một tham chiếu đang trỏ tới đối tượng lớp Cha thành lớp Con, gây ra ClassCastException tại Run-time."
    ],
    "correctAnswers": [3],
    "rationale": "Slide 13: Downcasting không an toàn như Upcasting. Nếu ép kiểu đối tượng thực tế không phải là (hoặc không kế thừa từ) kiểu đích, sẽ bị lỗi Run-time ClassCastException."
  },
  {
    "id": 9,
    "type": "single",
    "content": "Sự khác biệt cốt lõi khi gọi phương thức được Overload (Nạp chồng) và phương thức được Override (Ghi đè) là gì?",
    "options": [
      "Overload dựa vào Liên kết động, Override dựa vào Liên kết tĩnh.",
      "Overload dựa vào kiểu của đối tượng thực tế lúc Run-time, Override dựa vào kiểu tham chiếu lúc Compile-time.",
      "Overload được quyết định tại Compile-time (Liên kết tĩnh), Override được quyết định tại Run-time (Liên kết động).",
      "Cả hai đều sử dụng Liên kết động."
    ],
    "correctAnswers": [2],
    "rationale": "Liên kết tĩnh quyết định hàm overload nào được gọi dựa trên kiểu biến tham chiếu lúc biên dịch. Override dùng liên kết động dựa trên object thực lúc run-time."
  },
  {
    "id": 10,
    "type": "single",
    "content": "Trong câu lệnh `System.out.println(pArr[i].getDetail());` (Slide 21), tại sao kết quả in ra lại tương ứng với từng đối tượng cụ thể (Person, Employee, Manager)?",
    "options": [
      "Vì mảng pArr chỉ chứa các đối tượng Person.",
      "Vì trình biên dịch đã sử dụng Downcasting ngầm định.",
      "Do Liên kết tĩnh quyết định phương thức getDetail() nào được gọi.",
      "Do Liên kết động (Dynamic binding) gọi phương thức getDetail() của đối tượng thực sự trong bộ nhớ lúc Run-time."
    ],
    "correctAnswers": [3],
    "rationale": "Slide 21 & 28: Các đối tượng khác nhau giải nghĩa các thông điệp theo các cách thức khác nhau nhờ Liên kết động (Dynamic Binding)."
  },
  {
    "id": 11,
    "type": "single",
    "content": "Mệnh đề nào SAI về Lớp Object trong Java?",
    "options": [
      "Lớp Object nằm trong package java.lang.",
      "Lớp Object là lớp gốc trên cùng của mọi cây phân cấp kế thừa.",
      "Mọi lớp không dùng từ khóa extends đều mặc định extends Object.",
      "Lớp Object định nghĩa sẵn phương thức `printLine()` để hỗ trợ đa hình."
    ],
    "correctAnswers": [3],
    "rationale": "Slide 30-31: Lớp Object cung cấp toString(), equals(). Không có hàm printLine()."
  },
  {
    "id": 12,
    "type": "single",
    "content": "Điều gì xảy ra nếu cố tình áp dụng Đa hình cho phương thức `private`?",
    "options": [
      "Lớp con ghi đè thành công và chạy liên kết động.",
      "Lỗi biên dịch vì phương thức private không được kế thừa, nên việc viết lại hàm đó ở lớp con chỉ là tạo một hàm mới hoàn toàn độc lập.",
      "Lớp con bắt buộc phải nâng access modifier lên public.",
      "Xảy ra lỗi Run-time."
    ],
    "correctAnswers": [1],
    "rationale": "Phương thức private không được kế thừa, do đó không có khái niệm ghi đè (overriding) cho phương thức private. Nó tuân theo liên kết tĩnh."
  },
  {
    "id": 13,
    "type": "single",
    "content": "Upcasting cho phép ta làm gì trong thiết kế phần mềm?",
    "options": [
      "Viết code xử lý chung cho lớp cha (ví dụ: mảng Person) mà vẫn tiếp nhận và xử lý được mọi đối tượng lớp con (Employee, Manager).",
      "Truy cập các phương thức đặc thù chỉ có ở lớp con thông qua biến tham chiếu của lớp cha.",
      "Hủy bỏ hoàn toàn cấu trúc kế thừa.",
      "Ghi đè phương thức static."
    ],
    "correctAnswers": [0],
    "rationale": "Slide 21: Upcasting giúp mảng Person chứa được Employee, Manager... từ đó xử lý chung bằng vòng lặp, tận dụng đa hình."
  },
  {
    "id": 14,
    "type": "multiple",
    "content": "Liên kết tĩnh (Static binding) được sử dụng để giải quyết (resolve) thành phần nào? (Chọn nhiều đáp án)",
    "options": [
      "Phương thức static.",
      "Thuộc tính (Instance variables & Static variables).",
      "Phương thức private.",
      "Phương thức được đánh dấu @Override."
    ],
    "correctAnswers": [0, 1, 2],
    "rationale": "Thuộc tính, phương thức static và private đều được resolve lúc compile-time (Static binding)."
  },
  {
    "id": 15,
    "type": "single",
    "content": "Khi nào thì xảy ra lỗi ClassCastException?",
    "options": [
      "Thực hiện Upcasting một đối tượng.",
      "Sử dụng toán tử instanceof với null.",
      "Thực hiện Downcasting một biến tham chiếu đang trỏ đến đối tượng không thuộc về (hoặc không kế thừa từ) lớp đích ép kiểu.",
      "Truyền sai tham số vào hàm Overload."
    ],
    "correctAnswers": [2],
    "rationale": "Slide 13: Downcasting đối tượng `Person p = new Employee()` sang `Manager` sẽ gây lỗi Run-time ClassCastException vì đối tượng thực sự là Employee, không phải Manager."
  },
  {
    "id": 16,
    "type": "single",
    "content": "Bản chất của thông điệp (message passing) trong Đa hình là gì?",
    "options": [
      "Các đối tượng gửi mã nguồn cho nhau để thực thi.",
      "Là việc gọi phương thức trên đối tượng, đối tượng sẽ căn cứ vào kiểu thực sự của mình lúc chạy để quyết định cách thực thi.",
      "Dịch mã nguồn thành byte code tĩnh.",
      "Chỉ áp dụng cho đa thừa kế interface."
    ],
    "correctAnswers": [1],
    "rationale": "Slide 25 & 28: Đa hình là khả năng các đối tượng khác nhau giải nghĩa các thông điệp (lời gọi hàm) theo cách thức khác nhau nhờ liên kết động."
  },
  {
    "id": 17,
    "type": "single",
    "content": "Tại sao Java lại mặc định sử dụng Liên kết động (Dynamic binding) cho các phương thức thông thường?",
    "options": [
      "Để tăng tốc độ biên dịch (Compile-time).",
      "Để tiết kiệm bộ nhớ RAM.",
      "Để hỗ trợ tính Đa hình (Polymorphism) một cách tự nhiên, cho phép Override hoạt động đúng với bản chất đối tượng.",
      "Để ngăn chặn việc thay đổi giá trị của biến."
    ],
    "correctAnswers": [2],
    "rationale": "Liên kết động là cơ sở để Đa hình hoạt động. Việc quyết định hàm lúc run-time đảm bảo đối tượng thực thi đúng phương thức đã được override."
  },
  {
    "id": 18,
    "type": "multiple",
    "content": "Lợi ích của toán tử `instanceof` là gì? (Chọn nhiều đáp án)",
    "options": [
      "Kiểm tra xem đối tượng có tương thích để Downcasting an toàn hay không.",
      "Bảo vệ chương trình khỏi lỗi ClassCastException.",
      "Tự động ép kiểu mà không cần viết cú pháp ép kiểu `(Type)`.",
      "Kiểm tra xem một đối tượng có thuộc cây kế thừa của một lớp/interface cụ thể không."
    ],
    "correctAnswers": [0, 1, 3],
    "rationale": "Slide 14: `instanceof` kiểm tra thể hiện của lớp, giúp tránh ClassCastException trước khi downcast. Không tự động ép kiểu (phải tự viết)."
  },
  {
    "id": 19,
    "type": "single",
    "content": "Biểu đồ lớp ở Slide 32 (Bài tập 2): `printLine(int)` và `printLine(String)` trong cùng lớp gọi là gì?",
    "options": [
      "Ghi đè (Overriding).",
      "Đa hình đối tượng.",
      "Nạp chồng (Overloading).",
      "Đa kế thừa."
    ],
    "correctAnswers": [2],
    "rationale": "Các hàm cùng tên, khác danh sách tham số trong cùng một lớp là Nạp chồng (Overloading)."
  },
  {
    "id": 20,
    "type": "single",
    "content": "Nếu lớp con có thuộc tính trùng tên với lớp cha, khi truy cập qua biến tham chiếu của lớp cha đang trỏ tới đối tượng lớp con, giá trị nào được lấy?",
    "options": [
      "Giá trị thuộc tính của lớp con (Liên kết động).",
      "Giá trị thuộc tính của lớp cha (Liên kết tĩnh - Variable Hiding).",
      "Gây ra lỗi biên dịch mơ hồ (Ambiguous).",
      "Lấy giá trị khởi tạo mặc định (null hoặc 0)."
    ],
    "correctAnswers": [1],
    "rationale": "Thuộc tính bị ẩn (Variable hiding) dùng Liên kết tĩnh. Kiểu tham chiếu là lớp cha nên sẽ lấy giá trị thuộc tính của lớp cha."
  },
  {
    "id": 21,
    "type": "single",
    "content": "Đoạn mã sau bị lỗi ở đâu (Bẫy Upcasting)?",
    "codeSnippet": "class Person { void eat() {} }\nclass Employee extends Person { void work() {} }\npublic class Test {\n  public static void main(String[] args) {\n    Person p = new Employee();\n    p.work();\n  }\n}",
    "options": [
      "Lỗi Runtime tại p.work().",
      "Lỗi Compile-time (Biên dịch) tại p.work() vì lớp Person không có hàm work().",
      "Không có lỗi, vì p trỏ tới Employee nên gọi được work().",
      "Lỗi tại Person p = new Employee();"
    ],
    "correctAnswers": [1],
    "rationale": "Slide 9: p là biến tham chiếu kiểu Person. Dù trỏ đến Employee, trình biên dịch chỉ kiểm tra các hàm có trong Person. Gọi p.work() gây lỗi biên dịch."
  },
  {
    "id": 22,
    "type": "single",
    "content": "Kết quả khi chạy đoạn mã Downcasting này?",
    "codeSnippet": "class Animal {}\nclass Dog extends Animal {}\nclass Cat extends Animal {}\npublic class Test {\n  public static void main(String[] args) {\n    Animal a = new Dog();\n    Cat c = (Cat) a;\n  }\n}",
    "options": [
      "Chạy bình thường, a bị biến thành Cat.",
      "Lỗi biên dịch tại dòng ép kiểu.",
      "Lỗi Runtime: ClassCastException vì a thực chất trỏ tới Dog, không thể ép thành Cat.",
      "Xảy ra lỗi NullPointerException."
    ],
    "correctAnswers": [2],
    "rationale": "Slide 13: Ép kiểu sai quy tắc trên cây kế thừa. Đối tượng thực tế là Dog không tương thích với biến Cat, ném ClassCastException lúc runtime."
  },
  {
    "id": 23,
    "type": "single",
    "content": "Kết quả in ra là gì? (Bẫy Liên kết tĩnh vs Động)",
    "codeSnippet": "class A {\n  void foo() { System.out.print(\"A\"); }\n}\nclass B extends A {\n  void foo() { System.out.print(\"B\"); }\n}\npublic class Test {\n  public static void main(String[] args) {\n    A obj1 = new B();\n    A obj2 = new A();\n    obj1.foo();\n    obj2.foo();\n  }\n}",
    "options": [
      "A A",
      "B A",
      "A B",
      "B B"
    ],
    "correctAnswers": [1],
    "rationale": "Slide 19-20 (Liên kết động): obj1 kiểu A nhưng trỏ tới B. Do foo() bị ghi đè, gọi obj1.foo() chạy hàm của B (in B). obj2 trỏ tới A, gọi foo() của A (in A). Kết quả B A."
  },
  {
    "id": 24,
    "type": "single",
    "content": "Hiện tượng Variable Hiding. In ra gì?",
    "codeSnippet": "class X { int val = 10; }\nclass Y extends X { int val = 20; }\npublic class Test {\n  public static void main(String[] args) {\n    X obj = new Y();\n    System.out.print(obj.val);\n  }\n}",
    "options": [
      "10",
      "20",
      "Lỗi biên dịch",
      "Lỗi Runtime"
    ],
    "correctAnswers": [0],
    "rationale": "Thuộc tính không đa hình (Static binding). Biến obj có kiểu tham chiếu X, do đó nó truy cập thuộc tính val của lớp X (10) dù thực tế đang trỏ đối tượng Y."
  },
  {
    "id": 25,
    "type": "single",
    "content": "Liên kết tĩnh với hàm static (Slide 19).",
    "codeSnippet": "class Human {\n  public static void walk() { System.out.print(\"H\"); }\n}\nclass Boy extends Human {\n  public static void walk() { System.out.print(\"B\"); }\n}\npublic class Test {\n  public static void main(String[] args) {\n    Human obj = new Boy();\n    obj.walk();\n  }\n}",
    "options": [
      "H",
      "B",
      "Lỗi biên dịch",
      "Lỗi Runtime"
    ],
    "correctAnswers": [0],
    "rationale": "Slide 19: Phương thức static dùng liên kết tĩnh. Kiểu tham chiếu là Human, nên trình biên dịch trỏ trực tiếp đến hàm walk() của Human. In ra H."
  },
  {
    "id": 26,
    "type": "multiple",
    "content": "Đoạn mã sau lỗi biên dịch ở dòng nào? (Bẫy Downcasting ngầm định)",
    "codeSnippet": "class Parent {}\nclass Child extends Parent {}\npublic class Test {\n  public static void main(String[] args) {\n    Parent p = new Child(); // Dòng 1\n    Child c1 = p;           // Dòng 2\n    Child c2 = (Child) p;   // Dòng 3\n  }\n}",
    "options": [
      "Dòng 1",
      "Dòng 2",
      "Dòng 3",
      "Chương trình chạy không lỗi"
    ],
    "correctAnswers": [1],
    "rationale": "Slide 12: Downcasting không tự động diễn ra. Dòng 2 gán p (kiểu Parent) cho c1 (kiểu Child) mà không ép kiểu tường minh sẽ bị lỗi biên dịch."
  },
  {
    "id": 27,
    "type": "single",
    "content": "Kết quả của toán tử `instanceof` (Slide 33): `System.out instanceof Object`",
    "options": [
      "Lỗi biên dịch vì Object không phải là interface.",
      "true",
      "false",
      "Lỗi Runtime"
    ],
    "correctAnswers": [1],
    "rationale": "Slide 33 (Quiz): System.out là đối tượng của PrintStream. Mọi class (bao gồm PrintStream) đều kế thừa Object. Suy ra System.out instanceof Object là true."
  },
  {
    "id": 28,
    "type": "single",
    "content": "Sự kết hợp Overloading và Static Binding (Bài tập 2 - Slide 32 mô phỏng):",
    "codeSnippet": "class Test {\n  void print(Object o) { System.out.print(\"Object\"); }\n  void print(String s) { System.out.print(\"String\"); }\n  public static void main(String[] args) {\n    Object str = \"Java\";\n    new Test().print(str);\n  }\n}",
    "options": [
      "Object",
      "String",
      "Lỗi mơ hồ (Ambiguous)",
      "Java"
    ],
    "correctAnswers": [0],
    "rationale": "Bẫy cực khó: Overloading được phân giải bằng Liên kết tĩnh (kiểu biến tham chiếu). Biến str có kiểu khai báo là Object. Dù trỏ đến chuỗi, trình biên dịch vẫn map vào hàm print(Object). In \"Object\"."
  },
  {
    "id": 29,
    "type": "single",
    "content": "Bẫy null với instanceof:",
    "codeSnippet": "Employee e = null;\nif (e instanceof Person) {\n  System.out.print(\"Yes\");\n} else {\n  System.out.print(\"No\");\n}",
    "options": [
      "Yes",
      "No",
      "Lỗi NullPointerException",
      "Lỗi biên dịch"
    ],
    "correctAnswers": [1],
    "rationale": "Toán tử instanceof trả về false nếu toán hạng bên trái là null."
  },
  {
    "id": 30,
    "type": "single",
    "content": "Chạy đoạn mã Đa hình kết hợp Mảng (Mô phỏng Slide 21):",
    "codeSnippet": "Person[] arr = new Person[2];\narr[0] = new Employee();\narr[1] = new Manager();\narr[0].setName(\"A\");",
    "options": [
      "Lỗi tại arr[0] = new Employee();",
      "Lỗi tại arr[1] = new Manager();",
      "Lỗi tại arr[0].setName(\"A\");",
      "Không có lỗi, biên dịch và chạy thành công."
    ],
    "correctAnswers": [3],
    "rationale": "Mảng Person lưu được các lớp con nhờ Upcasting. setName là hàm của Person nên gọi an toàn."
  },
  {
    "id": 31,
    "type": "single",
    "content": "Bẫy Overriding với ném ngoại lệ (Nâng cao):",
    "codeSnippet": "class Cha {\n  void doTask() throws Exception {}\n}\nclass Con extends Cha {\n  void doTask() throws RuntimeException {}\n}",
    "options": [
      "Lỗi biên dịch vì lớp con phải throws y hệt lớp cha.",
      "Lỗi biên dịch vì lớp con không được throws gì cả.",
      "Chạy bình thường, lớp con được phép ném ngoại lệ hẹp hơn (sub-class) so với lớp cha.",
      "Lỗi Runtime."
    ],
    "correctAnswers": [2],
    "rationale": "Luật ghi đè: lớp con được phép ném ngoại lệ hẹp hơn hoặc không ném, miễn không phải ngoại lệ checked rộng hơn cha."
  },
  {
    "id": 32,
    "type": "single",
    "content": "Giá trị của hàm khi bị ép kiểu trong lúc truyền tham số:",
    "codeSnippet": "class Animal { void sound() { System.out.print(\"A\"); } }\nclass Dog extends Animal { void sound() { System.out.print(\"D\"); } }\npublic class Main {\n  public static void main(String[] args) {\n    Animal a = new Dog();\n    ((Animal)a).sound();\n  }\n}",
    "options": [
      "A",
      "D",
      "Lỗi biên dịch",
      "Lỗi ClassCastException"
    ],
    "correctAnswers": [1],
    "rationale": "Bẫy Đa hình: Ép kiểu `a` về `Animal` không làm mất tính đa hình của hàm `sound()`. Đối tượng vùng nhớ vẫn là Dog, liên kết động vẫn gọi hàm `sound()` của Dog. In ra D."
  },
  {
    "id": 33,
    "type": "multiple",
    "content": "Đoạn mã có lỗi Compile-time ở dòng nào? (Giả định Manager kế thừa Employee, Employee kế thừa Person)",
    "codeSnippet": "Person p = new Employee();\nEmployee e = (Employee) p; // Dòng 1\nManager m = (Manager) p;   // Dòng 2\nString s = (String) p;     // Dòng 3",
    "options": [
      "Dòng 1",
      "Dòng 2",
      "Dòng 3",
      "Tất cả đều biên dịch được, nhưng Dòng 2 ném Runtime Error."
    ],
    "correctAnswers": [2, 3],
    "rationale": "Dòng 3 lỗi biên dịch (Compile-time) vì String và Person không nằm trên cùng cây kế thừa. Dòng 2 biên dịch được (vì cùng cây kế thừa) nhưng ném Runtime Error. Đáp án đúng cho 'lỗi Compile-time' là Dòng 3."
  },
  {
    "id": 34,
    "type": "single",
    "content": "Bẫy Constructor trong Đa hình:",
    "codeSnippet": "class Parent {\n  Parent() { print(); }\n  void print() { System.out.print(\"P\"); }\n}\nclass Child extends Parent {\n  int i = 5;\n  void print() { System.out.print(i); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    new Child();\n  }\n}",
    "options": [
      "P",
      "5",
      "0",
      "Lỗi biên dịch"
    ],
    "correctAnswers": [2],
    "rationale": "Siêu bẫy: Khi gọi `new Child()`, constructor Parent chạy trước. Parent gọi `print()`. Do đa hình, nó nhảy xuống `print()` của Child. Nhưng lúc này biến `i` chưa được khởi tạo gán giá trị 5 (do Child chưa build xong), nên lấy giá trị mặc định là 0. In ra 0."
  },
  {
    "id": 35,
    "type": "single",
    "content": "Chuyển đổi kiểu dữ liệu tham chiếu xảy ra khi nào?",
    "codeSnippet": "class Base {}\nclass Derived extends Base {}\n// Xử lý đa hình",
    "options": [
      "Chỉ khi kiểu dữ liệu tham chiếu (lớp) tương thích và nằm trên cùng một cây phân cấp kế thừa.",
      "Khi ép kiểu mọi Object sang String.",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Slide 7: Kiểu dữ liệu tham chiếu chỉ có thể được chuyển đổi khi chúng tương thích, tức là nằm trên cùng một cây phân cấp kế thừa."
  },
  {
    "id": 36,
    "type": "single",
    "content": "Câu hỏi phân tích lỗi Upcasting gián tiếp:",
    "codeSnippet": "Object obj = new String(\"HUST\");\nStringBuffer sb = (StringBuffer) obj;",
    "options": [
      "Chương trình chạy bình thường.",
      "Sai (Lỗi Compile: incompatible types)",
      "Sai (Lỗi Runtime: ClassCastException)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [2],
    "rationale": "Biến obj là Object, có thể ép kiểu sang bất cứ tham chiếu nào kế thừa từ Object lúc compile-time. Nhưng lúc runtime, vùng nhớ thực sự là String, không thể ép thành StringBuffer -> ClassCastException."
  },
  {
    "id": 37,
    "type": "single",
    "content": "Đa hình không áp dụng cho cấu trúc nào?",
    "codeSnippet": "class A { int x = 10; static void show() {} }\nclass B extends A { int x = 20; static void show() {} }",
    "options": [
      "Thuộc tính và phương thức static.",
      "Phương thức ghi đè.",
      "Phương thức từ interface.",
      "Constructor."
    ],
    "correctAnswers": [0],
    "rationale": "Đa hình (liên kết động) chỉ hỗ trợ cho non-static methods (instance methods). Thuộc tính và static methods đều sử dụng liên kết tĩnh."
  },
  {
    "id": 38,
    "type": "single",
    "content": "Cú pháp kiểm tra kiểu dữ liệu với instanceof:",
    "codeSnippet": "if (a instanceof Dog) { ((Dog) a).bark(); }",
    "options": [
      "Luôn đúng.",
      "Ngăn chặn lỗi ClassCastException khi Downcasting.",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [1],
    "rationale": "Toán tử instanceof được thiết kế để đảm bảo đối tượng thực sự có kiểu tương thích trước khi dùng lệnh Downcasting, tránh lỗi Runtime."
  },
  {
    "id": 39,
    "type": "single",
    "content": "Hàm khởi tạo (Constructor) có tính Đa hình không?",
    "codeSnippet": "class Base {}\nclass Derived extends Base {}",
    "options": [
      "Có, nếu có nhiều constructor khác tham số.",
      "Không, Constructor không được thừa kế nên không thể ghi đè (overriding), không có tính đa hình.",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [1],
    "rationale": "Đa hình yêu cầu ghi đè. Constructor không bao giờ được thừa kế -> không bao giờ bị ghi đè -> không có tính đa hình (chỉ có Overloading - liên kết tĩnh)."
  },
  {
    "id": 40,
    "type": "single",
    "content": "Phân biệt Downcasting và Upcasting ở ví dụ Slide 13:",
    "codeSnippet": "Person p = new Manager();\nEmployee e = (Employee) p;",
    "options": [
      "Hợp lệ, đối tượng thực sự là Manager (kế thừa từ Employee), ép kiểu về Employee là an toàn.",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Slide 13: Manager là con của Employee. Khi p trỏ tới Manager, việc ép kiểu p về Employee là hợp lệ theo sơ đồ thừa kế, không gây lỗi."
  },
  {
    "id": 41,
    "type": "single",
    "content": "Toán tử instanceof với cây phân cấp sâu:",
    "codeSnippet": "class A {}\nclass B extends A {}\nclass C extends B {}\nA obj = new C();\nboolean res = obj instanceof B;",
    "options": [
      "res = true",
      "res = false",
      "Lỗi biên dịch",
      "Lỗi runtime"
    ],
    "correctAnswers": [0],
    "rationale": "Đối tượng vùng nhớ là C. C là con của B. Do đó, obj instanceof B sẽ là true (bất kỳ đối tượng con nào cũng là một instance của lớp cha)."
  },
  {
    "id": 42,
    "type": "single",
    "content": "Gọi phương thức nào nếu bị ẩn (Hidden)?",
    "codeSnippet": "class Super { void show() {} }\nclass Sub extends Super { void show(int a) {} }",
    "options": [
      "Đây là Overloading chứ không phải Overriding, do đó không có Đa hình tại hàm show().",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Khác tham số -> Overload. Khi thực hiện Super s = new Sub(); s.show(1) sẽ báo lỗi vì liên kết tĩnh kiểm tra hàm show(int) không có trong Super."
  },
  {
    "id": 43,
    "type": "single",
    "content": "Ép kiểu liên tục:",
    "codeSnippet": "Object o = new String(\"BKHN\");\nString s = (String) (Object) (String) o;",
    "options": [
      "Đúng, cú pháp hợp lệ và không lỗi lúc chạy do vùng nhớ thực vẫn là String.",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Bất kể ép kiểu bao nhiêu lần trên các biến trung gian, miễn là vùng nhớ gốc (String) không vi phạm với kiểu ép cuối cùng, sẽ không có ClassCastException."
  },
  {
    "id": 44,
    "type": "single",
    "content": "Lỗi do không tương thích mảng tham chiếu:",
    "codeSnippet": "Person[] p = new Employee[5];\np[0] = new Manager();",
    "options": [
      "Mảng Employee không thể chứa Manager (giả định Manager và Employee là anh em).",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime: ArrayStoreException)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [2],
    "rationale": "Mảng Employee chỉ chứa Employee. Dù khai báo Person[], JVM nhớ vùng nhớ là Employee[]. Gán Manager vào (nếu Manager không phải con của Employee) sẽ tung ArrayStoreException."
  },
  {
    "id": 45,
    "type": "single",
    "content": "Lý do sinh ra ClassCastException là gì?",
    "codeSnippet": "// Phân tích JVM",
    "options": [
      "JVM nhận thấy đối tượng thực tế không khớp với cấu trúc bộ nhớ mà lớp ép kiểu yêu cầu (không nằm trên chuỗi thừa kế).",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Khi Downcast, JVM kiểm tra cây phả hệ của đối tượng trên Heap. Nếu kiểu đích không nằm trong phả hệ của đối tượng này, sẽ văng ClassCastException."
  },
  {
    "id": 46,
    "type": "single",
    "content": "Gán null cho toán tử đa hình:",
    "codeSnippet": "Employee e = null;\nPerson p = e;",
    "options": [
      "Hợp lệ, con trỏ null có thể gán cho bất kỳ biến tham chiếu lớp cha nào.",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Null là giá trị mặc định của mọi reference type. Việc gán null qua lại giữa các lớp kế thừa không gây lỗi gì cả."
  },
  {
    "id": 47,
    "type": "single",
    "content": "Đa hình có làm thay đổi tham chiếu this không?",
    "codeSnippet": "class A { void test() { System.out.print(this.getClass().getName()); } }\nclass B extends A {}",
    "options": [
      "This luôn đại diện cho vùng nhớ thực tế. Gọi new B().test() sẽ in ra B.",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Từ khóa `this` mang tính đa hình. Dù nằm ở code lớp cha, khi chạy cho đối tượng B, `this` vẫn trỏ tới đối tượng B."
  },
  {
    "id": 48,
    "type": "single",
    "content": "Trường hợp duy nhất không thể Upcasting:",
    "codeSnippet": "class Base {}\nclass Derived extends Base {}",
    "options": [
      "Khi giữa hai lớp không có quan hệ IS-A (Không kế thừa hoặc implement).",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Không thể Upcast một String thành Integer vì chúng không nằm trên cùng một nhánh thừa kế (mặc dù cùng con Object)."
  },
  {
    "id": 49,
    "type": "single",
    "content": "Cơ chế nào đóng vai trò cốt lõi nhất để Java thực hiện được Liên kết động?",
    "codeSnippet": "// Phân tích cơ chế JVM",
    "options": [
      "Bảng phương thức ảo (Virtual Method Table / vtable).",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "JVM sử dụng V-Table (Bảng phương thức ảo) được gán vào mỗi object lúc run-time để tra cứu và gọi đúng phương thức bị ghi đè."
  },
  {
    "id": 50,
    "type": "single",
    "content": "Đa hình hoạt động ra sao nếu gọi hàm qua interface?",
    "codeSnippet": "interface Action { void run(); }\nclass Robot implements Action { public void run() {} }",
    "options": [
      "Tương tự Abstract class, Interface sử dụng liên kết động để tìm phương thức đã được override tại lớp thực thi (Robot).",
      "Sai (Lỗi Compile)",
      "Sai (Lỗi Runtime)",
      "Mơ hồ (Ambiguous)"
    ],
    "correctAnswers": [0],
    "rationale": "Interface reference type (`Action a = new Robot()`) cũng áp dụng nguyên tắc Upcasting và liên kết động y hệt các class thông thường."
  }
];

export default function PolymorphismQuiz() {
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qId: number, optionIndex: number, type: QuestionType) => {
    if (submitted) return;
    
    setAnswers(prev => {
      const current = prev[qId] || [];
      if (type === 'single') {
        return { ...prev, [qId]: [optionIndex] };
      } else {
        if (current.includes(optionIndex)) {
          return { ...prev, [qId]: current.filter(i => i !== optionIndex) };
        } else {
          return { ...prev, [qId]: [...current, optionIndex].sort() };
        }
      }
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach(q => {
      const userAns = answers[q.id] || [];
      if (userAns.length === q.correctAnswers.length && userAns.every(v => q.correctAnswers.includes(v))) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8 sticky top-0 z-10 border-b-4 border-indigo-600">
          <div className="p-6 bg-indigo-700 text-white flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">HUST - Bài thi OOP (Bài 8: Đa Hình)</h1>
            {submitted && (
              <div className="text-xl font-bold bg-white text-indigo-700 px-4 py-2 rounded-full shadow">
                Điểm: {score}/{questions.length}
              </div>
            )}
          </div>
          <div className="w-full bg-gray-200 h-2">
            <div className="bg-emerald-500 h-2 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          {!submitted && (
            <div className="p-2 text-center text-sm text-gray-500 bg-gray-100">
              Tiến độ: {Object.keys(answers).length} / {questions.length} câu
            </div>
          )}
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => {
            const userAns = answers[q.id] || [];
            const isCorrect = userAns.length === q.correctAnswers.length && userAns.every(v => q.correctAnswers.includes(v));

            return (
              <div key={q.id} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${submitted ? (isCorrect ? 'border-emerald-500' : 'border-rose-500') : 'border-slate-300'}`}>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 leading-relaxed">
                  <span className="text-indigo-600 mr-2">Câu {index + 1}:</span> 
                  {q.content} {q.type === 'multiple' && <span className="text-sm font-normal text-sky-500 ml-1">(Chọn nhiều đáp án)</span>}
                </h3>
                
                {q.codeSnippet && (
                  <pre className="bg-slate-800 text-emerald-400 p-4 rounded-md overflow-x-auto text-sm my-4 font-mono shadow-inner">
                    <code>{q.codeSnippet}</code>
                  </pre>
                )}

                <div className="space-y-3 mt-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAns.includes(optIdx);
                    const isCorrectOpt = q.correctAnswers.includes(optIdx);
                    
                    let optionClasses = "flex items-center p-3 rounded-md border transition-all ";
                    
                    if (!submitted) {
                      optionClasses += isSelected 
                        ? "bg-indigo-50 border-indigo-300 shadow-sm text-indigo-900 font-medium" 
                        : "border-slate-200 hover:bg-slate-50 cursor-pointer text-slate-800";
                    } else {
                      if (isCorrectOpt) {
                        optionClasses += "bg-emerald-100 border-emerald-500 text-emerald-800 font-bold ";
                      } else if (isSelected && !isCorrectOpt) {
                        optionClasses += "bg-rose-100 border-rose-500 text-rose-800 line-through font-medium ";
                      } else {
                        optionClasses += "opacity-50 border-slate-200 bg-slate-50 text-slate-800 ";
                      }
                    }

                    return (
                      <div 
                        key={optIdx} 
                        className={optionClasses}
                        onClick={() => handleSelect(q.id, optIdx, q.type)}
                      >
                        <div className="flex-shrink-0 mr-3">
                          {q.type === 'single' ? (
                            <input 
                              type="radio" 
                              checked={isSelected}
                              readOnly
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                            />
                          ) : (
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              readOnly
                              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                            />
                          )}
                        </div>
                        <span className="text-sm md:text-base">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-5 p-4 rounded-md text-sm ${isCorrect ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
                    <p className="font-bold mb-2 flex items-center">
                      {isCorrect ? (
                        <><span className="text-emerald-600 text-lg mr-2">✓</span> Trả lời chính xác</>
                      ) : (
                        <><span className="text-rose-600 text-lg mr-2">✗</span> Sai bản chất</>
                      )}
                    </p>
                    <p className="text-slate-700 leading-relaxed"><span className="font-bold text-slate-900">Giải thích chuyên sâu:</span> {q.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-10 text-center">
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Nộp Bài & Chấm Điểm
            </button>
          </div>
        )}
        
        {submitted && (
          <div className="mt-10 p-6 bg-white rounded-lg shadow-xl text-center space-y-4 border-t-4 border-indigo-600">
             <div className="text-3xl font-bold text-slate-800">
               Kết quả của bạn: <span className={score >= 40 ? 'text-emerald-600' : 'text-rose-600'}>{score} / {questions.length}</span>
             </div>
             <p className="text-slate-600 text-lg">
               {score >= 45 ? 'Xuất sắc! Bạn xứng đáng đạt điểm A+ bộ môn OOP.' 
                : score >= 35 ? 'Khá tốt! Hãy chú ý hơn vào các bẫy ép kiểu và liên kết động.' 
                : 'Bạn đang bị rỗng bản chất Đa hình. Hãy đọc kỹ lại slide bài giảng nhé!'}
             </p>
             <button 
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-4 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                Làm Lại Bài Thi
              </button>
          </div>
        )}
      </div>
    </div>
  );
}