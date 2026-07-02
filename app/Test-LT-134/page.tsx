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
    "content": "Tính chất WORA (Write Once, Run Anywhere) của Java đạt được chủ yếu nhờ vào cơ chế nào?",
    "options": [
      "Mã nguồn Java được biên dịch trực tiếp thành mã máy (machine code) tương thích với mọi hệ điều hành.",
      "Mã nguồn Java được biên dịch thành Bytecode, sau đó JVM (Java Virtual Machine) trên từng nền tảng sẽ thông dịch Bytecode này thành mã máy tương ứng.",
      "Trình biên dịch Java tự động nhận diện hệ điều hành và sinh ra tệp thực thi độc lập.",
      "Java sử dụng bộ thu gom rác tự động (Garbage Collection) giúp giải phóng bộ nhớ trên mọi nền tảng."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 1: Java compiler biên dịch source code (.java) thành bytecode (.class). JVM trên mỗi hệ điều hành sẽ thông dịch (interpret) bytecode này, tạo nên tính chất WORA."
  },
  {
    "id": 2,
    "type": "multiple",
    "content": "Phát biểu nào sau đây ĐÚNG khi phân biệt JDK, JRE và JVM? (Chọn nhiều đáp án)",
    "options": [
      "JRE (Java Runtime Environment) bao gồm JVM và các thư viện cốt lõi (Core libraries) để chạy ứng dụng Java.",
      "JDK (Java Development Kit) chỉ chứa các công cụ biên dịch (như javac) mà không bao gồm JRE.",
      "JVM là một máy ảo trừu tượng có nhiệm vụ thực thi Bytecode.",
      "Để chạy một ứng dụng Java đã được biên dịch, người dùng cuối bắt buộc phải cài đặt JDK."
    ],
    "correctAnswers": [
      0,
      2
    ],
    "rationale": "Bài 1: JDK bao gồm JRE + Development tools. JRE bao gồm JVM + Core Libraries. Người dùng cuối chỉ cần JRE để CHẠY ứng dụng."
  },
  {
    "id": 3,
    "type": "single",
    "content": "Sự khác biệt bản chất giữa 'Gửi thông điệp' (Message passing) trong OOP và 'Gọi hàm' (Function call) trong lập trình thủ tục là gì?",
    "options": [
      "Gửi thông điệp yêu cầu phải biết trước địa chỉ vùng nhớ của đối tượng nhận.",
      "Gọi hàm luôn sử dụng liên kết động (Dynamic binding), còn gửi thông điệp sử dụng liên kết tĩnh (Static binding).",
      "Trong gọi hàm, mã thực thi được xác định cố định tại Compile-time. Trong gửi thông điệp, đối tượng nhận sẽ tự quyết định cách thức phản hồi (phương thức thực thi) dựa vào trạng thái và kiểu thực sự của nó lúc Run-time.",
      "Không có sự khác biệt bản chất, gửi thông điệp chỉ là tên gọi khác của gọi hàm trong Java."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Bài 1: Message passing (Gửi thông điệp) mang tính đa hình. Đối tượng nhận thông điệp sẽ quyết định phương thức nào được gọi dựa vào kiểu thực tế của nó (Dynamic binding)."
  },
  {
    "id": 4,
    "type": "single",
    "content": "Tệp có đuôi `.class` trong Java chứa nội dung gì?",
    "options": [
      "Mã nguồn Java (Source code) đã được mã hóa.",
      "Mã máy (Machine code) tương thích với hệ điều hành Windows.",
      "Tập lệnh Bytecode độc lập với nền tảng phần cứng.",
      "Thư viện liên kết động (DLL)."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Bài 1: Trình biên dịch javac sẽ biên dịch file .java thành file .class chứa Bytecode độc lập với nền tảng."
  },
  {
    "id": 5,
    "type": "single",
    "content": "Sự khác biệt giữa Trừu tượng hóa dữ liệu (Data Abstraction) và Trừu tượng hóa điều khiển (Control Abstraction) là gì?",
    "options": [
      "Data Abstraction che giấu cách các thao tác được thực hiện, Control Abstraction che giấu cách dữ liệu được lưu trữ.",
      "Data Abstraction tập trung vào việc định nghĩa các cấu trúc dữ liệu và che giấu chi tiết cài đặt bên trong (ví dụ: dùng class). Control Abstraction tập trung vào việc che giấu chi tiết của các chuỗi lệnh/luồng thực thi (ví dụ: dùng phương thức/hàm).",
      "Control Abstraction chỉ có ở C++, Data Abstraction chỉ có ở Java.",
      "Cả hai khái niệm là một, đều mô tả quá trình thiết kế interface."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 3: Trừu tượng hoá dữ liệu xác định kiểu dữ liệu và tập phép toán mà không bận tâm chi tiết biểu diễn. Trừu tượng hoá điều khiển là việc sử dụng các chương trình con/phương thức để che giấu độ phức tạp của thuật toán."
  },
  {
    "id": 6,
    "type": "multiple",
    "content": "Đóng gói (Encapsulation) mang lại những lợi ích gì? (Chọn nhiều đáp án)",
    "options": [
      "Bảo vệ trạng thái bên trong của đối tượng khỏi những can thiệp không hợp lệ từ bên ngoài.",
      "Cho phép thay đổi cấu trúc cài đặt bên trong (ví dụ đổi kiểu dữ liệu) mà không làm ảnh hưởng đến các đối tượng khác đang sử dụng nó.",
      "Tự động giải phóng bộ nhớ khi đối tượng không còn được sử dụng.",
      "Cung cấp một giao diện giao tiếp rõ ràng và có kiểm soát (thông qua getter/setter)."
    ],
    "correctAnswers": [
      0,
      1,
      3
    ],
    "rationale": "Bài 3: Đóng gói (Che giấu dữ liệu) giúp bảo vệ dữ liệu, dễ bảo trì, dễ sửa đổi cài đặt nội bộ mà không phá vỡ interface bên ngoài."
  },
  {
    "id": 7,
    "type": "single",
    "content": "Mức độ truy cập (Access Modifier) `default` (khi không ghi từ khóa nào) trong Java có phạm vi như thế nào?",
    "options": [
      "Có thể truy cập từ bất kỳ đâu (giống public).",
      "Chỉ có thể truy cập bên trong cùng một lớp (giống private).",
      "Có thể truy cập từ các lớp nằm trong cùng một gói (Package-private).",
      "Có thể truy cập từ các lớp trong cùng gói và các lớp con (subclasses) ở gói khác."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Bài 3: Khi không khai báo modifier, nó là default (package-private), chỉ truy cập được từ các class trong cùng package. Kể cả lớp con ở package khác cũng KHÔNG truy cập được."
  },
  {
    "id": 8,
    "type": "single",
    "content": "Từ khóa `protected` cho phép truy cập từ đâu?",
    "options": [
      "Chỉ trong cùng package.",
      "Cùng lớp, cùng package, và các lớp con (subclasses) dù ở bất kỳ package nào.",
      "Chỉ các lớp con mới được truy cập.",
      "Toàn bộ chương trình."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 3: protected cho phép truy cập nội bộ package và mở rộng cho các lớp con (kế thừa) nằm ở package khác."
  },
  {
    "id": 9,
    "type": "single",
    "content": "Lợi ích chính của việc sử dụng Gói (Package) trong Java là gì?",
    "options": [
      "Tăng tốc độ thực thi của Bytecode.",
      "Tránh xung đột tên (Name collision) giữa các lớp trùng tên, và hỗ trợ kiểm soát quyền truy cập.",
      "Giảm dung lượng file .class.",
      "Biến mã nguồn thành mã mở (open-source)."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 3: Package là một không gian tên (namespace) giúp tổ chức các class, tránh xung đột tên (ví dụ 2 class `Student` ở 2 package khác nhau) và hỗ trợ access modifier."
  },
  {
    "id": 10,
    "type": "single",
    "content": "Quy tắc định nghĩa file mã nguồn (.java) nào sau đây là ĐÚNG?",
    "options": [
      "Một file .java có thể chứa nhiều public class.",
      "Tên file .java phải trùng với tên của public class được định nghĩa bên trong nó.",
      "Một file .java không được chứa phương thức main.",
      "Package declaration (khai báo gói) phải được đặt ở cuối file."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 3: Mỗi file .java chỉ được phép có tối đa 1 public class, và tên file phải trùng hoàn toàn (phân biệt hoa thường) với tên public class đó."
  },
  {
    "id": 11,
    "type": "multiple",
    "content": "Đặc điểm của Phương thức khởi tạo (Constructor) là gì? (Chọn nhiều đáp án)",
    "options": [
      "Bắt buộc phải trùng tên với tên lớp.",
      "Không có kiểu trả về, kể cả `void`.",
      "Có thể được gọi trực tiếp bằng cú pháp `objectName.ConstructorName()` sau khi đối tượng đã được khởi tạo.",
      "Trình biên dịch sẽ tự động cung cấp Default Constructor (không tham số) nếu lớp ĐÓ KHÔNG CÓ bất kỳ Constructor nào được lập trình viên định nghĩa."
    ],
    "correctAnswers": [
      0,
      1,
      3
    ],
    "rationale": "Bài 4: Constructor trùng tên lớp, không có kiểu trả về. Nó được gọi qua toán tử `new`, không thể gọi lại trên đối tượng đã khởi tạo. Default constructor chỉ sinh ra khi dev CHƯA khai báo constructor nào."
  },
  {
    "id": 12,
    "type": "single",
    "content": "Sự khác biệt bản chất giữa bộ nhớ Stack và Heap trong Java là gì?",
    "options": [
      "Stack lưu trữ đối tượng (Object), Heap lưu trữ biến cục bộ.",
      "Stack lưu trữ các biến nguyên thủy (primitive local variables) và biến tham chiếu (reference variables), trong khi Heap lưu trữ bản thân các đối tượng (Object) được tạo bởi từ khóa `new`.",
      "Cả Stack và Heap đều được dọn dẹp bởi Garbage Collector.",
      "Stack chia sẻ bộ nhớ cho tất cả các luồng (threads), Heap là cục bộ cho mỗi luồng."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 4: Stack dùng cho execution luồng (lưu biến cục bộ, tham chiếu). Heap dùng để cấp phát động cho Objects. GC chỉ quét trên Heap."
  },
  {
    "id": 13,
    "type": "single",
    "content": "Toán tử `==` dùng để so sánh hai biến tham chiếu đối tượng (ví dụ: `obj1 == obj2`) sẽ trả về true khi nào?",
    "options": [
      "Khi tất cả các thuộc tính của 2 đối tượng có giá trị giống nhau.",
      "Khi 2 biến tham chiếu đó cùng trỏ vào một vùng nhớ (cùng địa chỉ) trên Heap.",
      "Khi 2 đối tượng cùng một lớp.",
      "Khi phương thức `equals()` của chúng trả về true."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 4: Toán tử == với kiểu đối tượng sẽ so sánh tham chiếu (địa chỉ bộ nhớ). Nó chỉ true khi cả 2 tham chiếu trỏ cùng vào 1 object."
  },
  {
    "id": 14,
    "type": "single",
    "content": "Phương thức `equals()` mặc định (được kế thừa từ lớp Object) hoạt động như thế nào nếu KHÔNG được override (ghi đè)?",
    "options": [
      "So sánh từng thuộc tính (deep comparison) của đối tượng.",
      "Hoạt động giống hệt toán tử `==` (so sánh địa chỉ bộ nhớ).",
      "Luôn trả về true nếu 2 đối tượng cùng class.",
      "Ném ra ngoại lệ NullPointerException."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 4: Trong lớp `Object`, hàm `equals()` được cài đặt mặc định là `return (this == obj);`. Do đó, nếu không ghi đè, nó chỉ so sánh địa chỉ."
  },
  {
    "id": 15,
    "type": "single",
    "content": "Khi nào một đối tượng trên Heap trở thành mục tiêu (eligible) để thu gom rác (Garbage Collection)?",
    "options": [
      "Ngay sau khi phương thức tạo ra nó kết thúc.",
      "Khi không còn bất kỳ biến tham chiếu nào (đang hoạt động) trỏ đến nó.",
      "Khi lập trình viên gọi lệnh `System.gc()`.",
      "Khi thuộc tính của đối tượng bằng null."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 4: Unreachable object. Khi không còn đường dẫn từ Stack (hoặc rễ) nào tới Object trên Heap, nó sẽ bị coi là rác."
  },
  {
    "id": 16,
    "type": "single",
    "content": "Lệnh `System.gc()` có ý nghĩa gì trong Java?",
    "options": [
      "Bắt buộc JVM phải lập tức dọn dẹp bộ nhớ ngay tại dòng code đó.",
      "Xóa toàn bộ đối tượng trên Heap.",
      "Đưa ra một ĐỀ NGHỊ (suggestion) cho JVM rằng hãy thực hiện thu gom rác, nhưng JVM có quyền quyết định chạy hay không.",
      "Giải phóng bộ nhớ Stack."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Bài 4: System.gc() chỉ là một lời đề nghị. Máy ảo Java (JVM) sẽ tự quyết định thời điểm thực sự chạy Garbage Collector."
  },
  {
    "id": 17,
    "type": "single",
    "content": "Phương thức `finalize()` trong Java có đặc điểm gì nổi bật?",
    "options": [
      "Giống hệt Destructor trong C++, lập trình viên phải tự gọi nó để giải phóng đối tượng.",
      "Được Garbage Collector gọi tự động TRƯỚC KHI đối tượng bị thu hồi bộ nhớ, dùng để dọn dẹp tài nguyên (như đóng file, ngắt kết nối mạng). Tuy nhiên, không có gì đảm bảo nó sẽ chắc chắn được gọi.",
      "Luôn được đảm bảo chạy ngay lập tức khi gán tham chiếu bằng null.",
      "Dùng để ép kiểu (Casting) đối tượng."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 4: `finalize()` là một hàm callback trước khi object bị destroy bởi GC. Java không khuyến khích dùng nó vì thời điểm gọi là không xác định, hoặc có thể không bao giờ được gọi nếu chương trình tắt trước khi GC chạy."
  },
  {
    "id": 18,
    "type": "multiple",
    "content": "Biến tham chiếu (Reference variable) `this` đại diện cho điều gì? (Chọn nhiều đáp án)",
    "options": [
      "Đại diện cho đối tượng hiện tại đang thực thi phương thức.",
      "Đại diện cho lớp cha của đối tượng hiện tại.",
      "Được sử dụng để giải quyết sự nhập nhằng (shadowing) khi tham số truyền vào trùng tên với thuộc tính của lớp.",
      "Có thể được sử dụng bên trong các phương thức `static`."
    ],
    "correctAnswers": [
      0,
      2
    ],
    "rationale": "Bài 4: `this` trỏ tới instance hiện tại. Nó được dùng để phân biệt tham số và thuộc tính (vd `this.name = name`). KHÔNG được dùng trong ngữ cảnh `static` vì phương thức static thuộc về class, không có instance."
  },
  {
    "id": 19,
    "type": "single",
    "content": "Nếu một biến tham chiếu đối tượng không được trỏ vào bất kỳ đối tượng nào, giá trị mặc định của nó là gì?",
    "options": [
      "0",
      "Rỗng (Empty string)",
      "undefined",
      "null"
    ],
    "correctAnswers": [
      3
    ],
    "rationale": "Bài 4: Giá trị mặc định của mọi biến tham chiếu trong Java (chưa được khởi tạo) là `null`."
  },
  {
    "id": 20,
    "type": "single",
    "content": "Trong quá trình truyền tham số vào phương thức, Java sử dụng cơ chế nào?",
    "options": [
      "Truyền tham chiếu (Pass-by-reference) đối với các Object.",
      "Luôn luôn truyền giá trị (Pass-by-value). Đối với Object, giá trị được truyền là BẢN SAO của địa chỉ tham chiếu.",
      "Truyền tham chiếu cho tất cả các kiểu dữ liệu.",
      "Do lập trình viên tự định nghĩa bằng từ khóa `ref`."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bài 4 (và Bài 5): Java CHỈ CÓ Pass-by-value. Khi truyền object, nó truyền bản sao của cái reference. Thay đổi thuộc tính thì ảnh hưởng object gốc, nhưng gán reference bằng `new` bên trong hàm sẽ không ảnh hưởng ra ngoài."
  },
  {
    "id": 21,
    "type": "single",
    "content": "Bẫy Constructor: Đoạn code sau in ra gì?\n```java\nclass Student {\n  String name;\n  void Student() { \n    this.name = \"HUST\"; \n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Student s = new Student();\n    System.out.println(s.name);\n  }\n}\n```",
    "options": [
      "HUST",
      "null",   
      "Lỗi biên dịch",
      "Lỗi Runtime"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bẫy: `void Student()` có kiểu trả về là `void`, do đó trình biên dịch hiểu nó là một PHƯƠNG THỨC BÌNH THƯỜNG, không phải Constructor. Lớp Student sẽ dùng Default Constructor của JVM (không làm gì cả). Do đó, `s.name` là `null`."
  },
  {
    "id": 22,
    "type": "single",
    "content": "Bẫy Mảng đối tượng: Lỗi sẽ xảy ra ở dòng nào?\n```java\nclass Point { int x, y; }\npublic class Main {\n  public static void main(String[] args) {\n    Point[] arr = new Point[5]; // Dòng 1\n    System.out.println(arr.length); // Dòng 2\n    arr[0].x = 10; // Dòng 3\n  }\n}\n```",
    "options": [
      "Dòng 1",
      "Dòng 2",
      "Dòng 3 (Ném ra NullPointerException)",
      "Không có lỗi, in ra 5 và chương trình kết thúc thành công."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Bẫy: `new Point[5]` mới chỉ tạo ra một mảng lưu trữ 5 BIẾN THAM CHIẾU, tất cả đều đang trỏ tới `null`. Chưa có đối tượng Point nào được tạo ra. Gọi `arr[0].x` gây `NullPointerException`."
  },
  {
    "id": 23,
    "type": "single",
    "content": "Bẫy Từ khóa `this`: Kết quả của đoạn code sau?\n```java\nclass Test {\n  int val = 10;\n  static void printVal() {\n    System.out.println(this.val);\n  }\n}\n```",
    "options": [
      "10",
      "0",
      "Lỗi biên dịch (Compile-time Error)",
      "Lỗi Runtime"
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Bẫy: Không thể sử dụng từ khóa `this` bên trong một phương thức `static`. Phương thức static thuộc về Class, không thuộc về bất kỳ Instance (đối tượng) cụ thể nào, nên không có `this`."
  },
  {
    "id": 24,
    "type": "single",
    "content": "Bẫy So sánh String: Kết quả in ra là gì?\n```java\nString s1 = new String(\"Java\");\nString s2 = new String(\"Java\");\nSystem.out.print((s1 == s2) + \" \");\nSystem.out.print(s1.equals(s2));\n```",
    "options": [
      "true true",
      "false true",
      "true false",
      "false false"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bẫy: Dùng từ khóa `new` ép buộc tạo ra 2 object String mới ở 2 vùng nhớ khác nhau trên Heap. Do đó `s1 == s2` so sánh địa chỉ sẽ trả về `false`. `equals()` so sánh nội dung chuỗi nên trả về `true`."
  },
  {
    "id": 25,
    "type": "single",
    "content": "Bẫy Access Modifier giữa các Package: Đoạn code sau bị lỗi ở đâu?\n```java\n// File: pkg1/A.java\npackage pkg1;\npublic class A {\n  int number = 100;\n}\n\n// File: pkg2/B.java\npackage pkg2;\nimport pkg1.A;\npublic class B {\n  public static void main(String[] args) {\n    A obj = new A();\n    System.out.println(obj.number); // Dòng X\n  }\n}\n```",
    "options": [
      "Lỗi ở `import pkg1.A;`",
      "Lỗi ở `A obj = new A();`",
      "Lỗi ở Dòng X do biến `number` có access modifier là `default` (package-private).",
      "Không có lỗi, in ra 100."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Bẫy: Biến `number` không ghi gì, tức là `default`. Nó chỉ được truy cập nội bộ trong `pkg1`. Class B ở `pkg2` dù import vẫn KHÔNG thể truy cập biến này -> Lỗi biên dịch."
  },
  {
    "id": 26,
    "type": "single",
    "content": "Bẫy Khởi tạo đối tượng: In ra giá trị nào?\n```java\nclass Counter {\n  int count;\n  Counter() { count = 5; }\n  Counter(int c) { count = c; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Counter c1 = new Counter();\n    Counter c2 = new Counter(10);\n    System.out.println(c1.count + c2.count);\n  }\n}\n```",
    "options": [
      "15",
      "5",
      "10",
      "Lỗi biên dịch"
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Cơ bản Constructor Overloading. c1 gọi constructor không tham số -> count=5. c2 gọi constructor có tham số -> count=10. Tổng = 15."
  },
  {
    "id": 27,
    "type": "single",
    "content": "Bẫy Biến cục bộ (Local variable): Lỗi ở dòng nào?\n```java\npublic class Main {\n  public static void main(String[] args) {\n    int x; // Dòng 1\n    if (true) {\n      x = 10; // Dòng 2\n    }\n    System.out.println(x); // Dòng 3\n  }\n}\n```",
    "options": [
      "Dòng 1",
      "Dòng 2",
      "Dòng 3",
      "Không có lỗi, in ra 10."
    ],
    "correctAnswers": [
      3
    ],
    "rationale": "Bẫy lừa: Trình biên dịch Java đủ thông minh để biết luồng `if (true)` luôn chạy, nên biến cục bộ `x` chắc chắn được khởi tạo trước khi dùng ở Dòng 3. Không có lỗi."
  },
  {
    "id": 28,
    "type": "single",
    "content": "Bẫy Biến cục bộ chưa khởi tạo: Nhưng nếu đổi thành:\n```java\npublic class Main {\n  public static void main(String[] args) {\n    int x; // Dòng 1\n    boolean flag = true;\n    if (flag) {\n      x = 10;\n    }\n    System.out.println(x); // Dòng X\n  }\n}\n```",
    "options": [
      "Lỗi biên dịch tại Dòng X (variable x might not have been initialized).",
      "In ra 10.",
      "In ra 0.",
      "Lỗi Runtime."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Bẫy: Vì `flag` là biến, trình biên dịch không chắc chắn nhánh `if` có được chạy hay không. Biến cục bộ `x` có nguy cơ chưa được khởi tạo. Báo lỗi `Compile-time`."
  },
  {
    "id": 29,
    "type": "multiple",
    "content": "Bẫy Quản lý rác (Garbage Collection): Khi nào đối tượng `new Book()` trong code sau biến thành RÁC (Unreachable)?\n```java\npublic void test() {\n  Book b1 = new Book(\"Java\"); // Lệnh 1\n  Book b2 = new Book(\"C++\"); // Lệnh 2\n  b1 = b2; // Lệnh 3\n  b2 = null; // Lệnh 4\n}\n```\n(Chọn các đáp án đúng)",
    "options": [
      "Đối tượng Book(\"Java\") thành rác sau Lệnh 3.",
      "Đối tượng Book(\"Java\") thành rác sau Lệnh 4.",
      "Đối tượng Book(\"C++\") thành rác sau Lệnh 4.",
      "Đối tượng Book(\"C++\") KHÔNG thành rác sau Lệnh 4."
    ],
    "correctAnswers": [
      0,
      3
    ],
    "rationale": "Tại Lệnh 3, `b1` trỏ sang đối tượng \"C++\". Đối tượng \"Java\" không còn ai trỏ tới -> Thành rác. Tại Lệnh 4, `b2` = null, nhưng đối tượng \"C++\" vẫn đang được `b1` trỏ tới -> KHÔNG thành rác."
  },
  {
    "id": 30,
    "type": "single",
    "content": "Bẫy Overloading Constructor và `this()`: Kết quả in ra?\n```java\nclass Box {\n  Box() {\n    System.out.print(\"Empty \");\n  }\n  Box(int a) {\n    this();\n    System.out.print(a);\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Box b = new Box(5);\n  }\n}\n```",
    "options": [
      "5 Empty",
      "Empty 5",
      "Lỗi biên dịch",
      "Empty"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`this()` gọi Constructor không tham số TRƯỚC (in \"Empty \"). Sau đó quay lại thực hiện tiếp lệnh in ra tham số `a` (in \"5\"). Output: Empty 5."
  },
  {
    "id": 31,
    "type": "single",
    "content": "Bẫy Private Access: Lỗi tại đâu?\n```java\nclass Secret {\n  private int code = 7;\n  public int getCode() { return code; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Secret s = new Secret();\n    s.code = 10; // Dòng X\n    System.out.println(s.getCode());\n  }\n}\n```",
    "options": [
      "Lỗi tại Dòng X vì biến `code` là `private`, không thể truy cập từ lớp `Main`.",
      "In ra 10",
      "In ra 7",
      "Lỗi ở dòng `new Secret()`"
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Tính Đóng gói: Biến `private` bị che giấu hoàn toàn khỏi các lớp khác. Cố tình truy cập trực tiếp `s.code` sẽ gây lỗi Compile-time."
  },
  {
    "id": 32,
    "type": "single",
    "content": "Bẫy String Pool: Kết quả in ra?\n```java\nString a = \"Hello\";\nString b = \"Hello\";\nSystem.out.println(a == b);\n```",
    "options": [
      "true",
      "false",
      "Lỗi biên dịch",
      "Lỗi Runtime"
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Bẫy: Không dùng từ khóa `new`. Các chuỗi khai báo bằng Literal (dấu nháy kép) sẽ được đưa vào String Pool. Vì nội dung giống nhau, Java cho `a` và `b` trỏ CHUNG vào 1 object trong Pool. `a == b` là true."
  },
  {
    "id": 33,
    "type": "single",
    "content": "Bẫy truyền tham chiếu (Pass-by-value of reference):\n```java\nclass Num { int x; }\npublic class Main {\n  static void change(Num n) {\n    n = new Num();\n    n.x = 20;\n  }\n  public static void main(String[] args) {\n    Num obj = new Num();\n    obj.x = 10;\n    change(obj);\n    System.out.println(obj.x);\n  }\n}\n```",
    "options": [
      "10",
      "20",
      "0",
      "Lỗi biên dịch"
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Bẫy kinh điển: Trong hàm `change`, `n` là BẢN SAO của tham chiếu `obj`. Lệnh `n = new Num()` làm bản sao `n` trỏ sang object mới, không ảnh hưởng đến object gốc `obj` ngoài `main`. Output vẫn là 10."
  },
  {
    "id": 34,
    "type": "single",
    "content": "Nhưng nếu đổi hàm `change` thành:\n```java\n  static void change(Num n) {\n    n.x = 20;\n  }\n```\nKết quả ở hàm `main` sẽ là gì?",
    "options": [
      "10",
      "20",
      "0",
      "Lỗi"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Vì `n` trỏ CÙNG vào object trên Heap với `obj`. Lệnh `n.x = 20` thay đổi trực tiếp dữ liệu của object gốc. Output là 20."
  },
  {
    "id": 35,
    "type": "multiple",
    "content": "Bẫy Constructor mặc định: Đoạn code nào bị lỗi biên dịch?\n(1) `class A { }` \n(2) `class B { B(int x) {} }` \nNếu thực hiện:\n`A objA = new A();` // Lệnh 1\n`B objB = new B();` // Lệnh 2",
    "options": [
      "Lệnh 1 lỗi",
      "Lệnh 2 lỗi",
      "Cả 2 đều lỗi",
      "Cả 2 không lỗi"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bẫy: Lớp B ĐÃ ĐƯỢC khai báo một constructor `B(int x)`. Do đó, JVM KHÔNG sinh ra Default Constructor (không tham số) nữa. Lệnh `new B()` sẽ bị lỗi."
  },
  {
    "id": 36,
    "type": "single",
    "content": "Bẫy Lệnh gọi `this()` sai vị trí:\n```java\nclass MyClass {\n  MyClass() { \n    System.out.println(\"A\");\n    this(10); // Dòng X\n  }\n  MyClass(int a) { }\n}\n```",
    "options": [
      "In ra A rồi gọi constructor thứ 2.",
      "Lỗi biên dịch tại Dòng X vì this() bắt buộc phải là lệnh ĐẦU TIÊN trong constructor.",
      "Lỗi Runtime (StackOverflow).",
      "Chương trình bỏ qua Dòng X."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Java bắt buộc các lời gọi constructor cùng lớp `this(...)` hoặc lớp cha `super(...)` phải nằm ở CÂU LỆNH ĐẦU TIÊN trong block của constructor."
  },
  {
    "id": 37,
    "type": "single",
    "content": "Bẫy `==` với kiểu nguyên thủy và đối tượng Wrapper:\n```java\nint x = 5;\nInteger y = new Integer(5);\nSystem.out.println(x == y);\n```",
    "options": [
      "true",
      "false",
      "Lỗi biên dịch vì khác kiểu",
      "Lỗi Runtime"
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Khi dùng `==` giữa kiểu nguyên thủy (int) và object Wrapper (Integer), Java sẽ tự động Unboxing object thành kiểu nguyên thủy để so sánh giá trị. Kết quả là `5 == 5` -> true."
  },
  {
    "id": 38,
    "type": "single",
    "content": "Bẫy Gán trực tiếp Object:\n```java\nclass Data { int val; }\npublic class Main {\n  public static void main(String[] args) {\n    Data d1 = new Data(); d1.val = 1;\n    Data d2 = d1;\n    d2.val = 2;\n    System.out.println(d1.val);\n  }\n}\n```",
    "options": [
      "1",
      "2",
      "Lỗi",
      "0"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`d2 = d1` gán tham chiếu, không phải tạo bản sao mới của đối tượng. `d1` và `d2` trỏ chung vào 1 vùng nhớ. `d2` đổi thành 2 thì `d1` cũng thành 2."
  },
  {
    "id": 39,
    "type": "multiple",
    "content": "Trong Java, các thành phần nào sau đây được lưu trữ trên bộ nhớ Stack? (Chọn nhiều đáp án)\n```java\npublic void process() {\n  int age = 20;\n  Student stu = new Student();\n}\n```",
    "options": [
      "Biến cục bộ `age` (kèm giá trị 20)",
      "Biến tham chiếu `stu`",
      "Đối tượng thực tế của `Student` chứa dữ liệu",
      "Tất cả các thuộc tính bên trong lớp `Student`"
    ],
    "correctAnswers": [
      0,
      1
    ],
    "rationale": "Stack lưu các biến cục bộ (primitive) và các biến tham chiếu (reference variables). Còn bản thân Object (được tạo bằng lệnh `new`) thì nằm trên Heap."
  },
  {
    "id": 40,
    "type": "single",
    "content": "Bẫy `NullPointerException` ẩn:\n```java\nclass Node { Node next; }\npublic class Main {\n  public static void main(String[] args) {\n    Node n = new Node();\n    System.out.println(n.next.next);\n  }\n}\n```",
    "options": [
      "In ra địa chỉ bộ nhớ",
      "In ra null",
      "Lỗi biên dịch",
      "Lỗi Runtime (NullPointerException)"
    ],
    "correctAnswers": [
      3
    ],
    "rationale": "`new Node()` tạo ra đối tượng, thuộc tính `next` (kiểu đối tượng) khởi tạo mặc định là `null`. Việc gọi `null.next` (tức `n.next.next`) sẽ ném ra NullPointerException."
  },
  {
    "id": 41,
    "type": "single",
    "content": "Bẫy Lệnh `finalize()`:\n```java\nclass MyResource {\n  protected void finalize() { System.out.print(\"Clean \"); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    MyResource r = new MyResource();\n    r = null;\n    System.out.print(\"End \");\n  }\n}\n```\nKết quả NÀO LÀ CÓ KHẢ NĂNG NHẤT xảy ra?",
    "options": [
      "End Clean",
      "Clean End",
      "Chỉ in ra: End",
      "Lỗi biên dịch"
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Mặc dù `r` thành rác, GC thường không chạy ngay lập tức đối với các chương trình nhỏ tắt rất nhanh. Do đó `finalize()` hầu như không kịp được gọi. Khả năng cao nhất chỉ in \"End \"."
  },
  {
    "id": 42,
    "type": "single",
    "content": "Phương thức `System.gc()` làm gì?",
    "options": [
      "Ép buộc dọn rác ngay lập tức",
      "Chỉ gợi ý (suggest) JVM chạy bộ thu gom rác, không có sự đảm bảo",
      "Dọn dẹp bộ nhớ Stack",
      "Hủy toàn bộ ứng dụng Java"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bản chất `System.gc()` chỉ là lời gọi gợi ý. JVM có thuật toán riêng để quyết định thời điểm dọn rác tối ưu nhất."
  },
  {
    "id": 43,
    "type": "single",
    "content": "Gán đối tượng bằng null để làm gì?\n```java\nScanner sc = new Scanner(System.in);\n// Xử lý...\nsc = null; \n```",
    "options": [
      "Để đóng luồng Input",
      "Xóa bỏ đối tượng khỏi bộ nhớ ngay lập tức",
      "Gỡ bỏ tham chiếu, giúp đối tượng đủ điều kiện (eligible) cho Garbage Collection dọn dẹp sau này",
      "Gây lỗi chương trình"
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Việc gán `null` cắt đứt đường nối từ Stack tới Heap. Đối tượng cũ trở thành Unreachable và sẽ bị GC dọn trong tương lai."
  },
  {
    "id": 44,
    "type": "single",
    "content": "So sánh 2 object bằng `equals()` mặc định:\n```java\nclass Car { String color = \"Red\"; }\npublic class Main {\n  public static void main(String[] args) {\n    Car c1 = new Car(); Car c2 = new Car();\n    System.out.println(c1.equals(c2));\n  }\n}\n```",
    "options": [
      "true",
      "false",
      "Lỗi biên dịch",
      "Lỗi runtime"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Vì lớp `Car` CHƯA ghi đè phương thức `equals()`, nó sẽ kế thừa từ `Object`. Hàm `equals` của Object so sánh bằng toán tử `==` (so sánh địa chỉ). 2 object new ra 2 vùng nhớ khác nhau -> false."
  },
  {
    "id": 45,
    "type": "single",
    "content": "Bẫy rác vòng (Circular reference):\n```java\nclass Node { Node link; }\n// Trong main:\nNode n1 = new Node(); Node n2 = new Node();\nn1.link = n2; n2.link = n1;\nn1 = null; n2 = null;\n```\nSau các lệnh này, 2 đối tượng Node có bị thu gom rác không?",
    "options": [
      "Không, vì chúng vẫn trỏ lẫn nhau (reference count > 0).",
      "Có, thuật toán GC của Java (Mark and Sweep) có thể phát hiện các cụm đối tượng cô lập (island of isolation) và dọn dẹp chúng.",
      "Chỉ đối tượng n1 bị thu gom.",
      "Lỗi Runtime vì lặp vô hạn."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Khác với các hệ thống Reference Counting cổ điển, Java dùng thuật toán Mark and Sweep từ Root (Stack). Vì n1, n2 ngoài stack bị null, cả cụm đảo rác này không thể reach từ Root -> bị dọn sạch."
  },
  {
    "id": 46,
    "type": "single",
    "content": "Phân biệt `this` và `Class`:\n```java\nclass A {\n  int val = 1;\n  void print() { \n    int val = 2;\n    System.out.print(val + \" \" + this.val);\n  }\n}\n```",
    "options": [
      "1 1",
      "2 2",
      "1 2",
      "2 1"
    ],
    "correctAnswers": [
      3
    ],
    "rationale": "Biến cục bộ che lấp (shadow) thuộc tính. `val` in ra biến cục bộ = 2. `this.val` chỉ định rõ lấy thuộc tính của đối tượng = 1. Kết quả: 2 1."
  },
  {
    "id": 47,
    "type": "single",
    "content": "Package và tính Đóng gói:\nNếu một class được đánh dấu là `public`, các thuộc tính bên trong nó không đánh dấu gì (default). Các class khác package có thể truy cập thuộc tính đó không?",
    "options": [
      "Có, vì class là public.",
      "Không, vì thuộc tính là default (chỉ nội bộ package).",
      "Có, nhưng phải import.",
      "Chỉ truy cập được nếu kế thừa."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Access Modifier được tính riêng cho Class và Members. Dù Class là `public`, nhưng Members là `default` thì cũng chỉ dùng được ở nội bộ package."
  },
  {
    "id": 48,
    "type": "single",
    "content": "Bẫy Static variables: \n```java\nclass Employee {\n  static String company = \"HUST\";\n}\npublic class Main {\n  public static void main(String[] args) {\n    Employee e1 = new Employee();\n    Employee e2 = new Employee();\n    e1.company = \"FPT\";\n    System.out.println(e2.company);\n  }\n}\n```",
    "options": [
      "HUST",
      "FPT",
      "Lỗi biên dịch",
      "null"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`static` variable là tài sản chung của toàn bộ Class, không phụ thuộc vào từng instance. `e1` đổi `company` thành FPT, thì khi `e2` truy cập, nó cũng thấy FPT."
  },
  {
    "id": 49,
    "type": "multiple",
    "content": "Lợi thế chính của việc sử dụng các phương thức Setter và Getter là gì? (Chọn nhiều đáp án)",
    "options": [
      "Tăng tốc độ chạy của chương trình.",
      "Kiểm soát và xác thực (validate) dữ liệu đầu vào trước khi gán cho thuộc tính.",
      "Làm cho thuộc tính trở thành Read-only (chỉ cung cấp Getter, không cung cấp Setter).",
      "Tránh phải khởi tạo đối tượng bằng từ khóa new."
    ],
    "correctAnswers": [
      1,
      2
    ],
    "rationale": "Getter/Setter (Tính đóng gói) giúp bảo vệ dữ liệu (validation) và cung cấp tính linh hoạt (vd: làm thuộc tính read-only). Nó thường làm code chạy chậm hơn một chút xíu do tốn chi phí gọi hàm, nhưng đáng đổi lấy an toàn."
  },
  {
    "id": 50,
    "type": "single",
    "content": "Chương trình Java bắt đầu thực thi từ phương thức nào?",
    "options": [
      "`public void main(String args[])`",
      "`public static void main(String[] args)`",
      "`static public void main()`",
      "`void start()`"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Điểm bắt đầu chuẩn của JVM là phương thức `public static void main(String[] args)`."
  }
];

export default function HUSTOOPQuiz() {
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden mb-10 sticky top-0 z-50 border-t-4 border-red-600">
          <div className="p-6 bg-red-700 text-white flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">HUST - Bài thi OOP Tổng Hợp</h1>
              <p className="text-red-100 mt-1">Nội dung: Bài 1, Bài 3, Bài 4 (50 Câu Hỏi Đánh Đố)</p>
            </div>
            {submitted && (
              <div className="mt-4 md:mt-0 text-xl font-bold bg-white text-red-700 px-6 py-2 rounded-full shadow-lg">
                Điểm: {score}/{questions.length}
              </div>
            )}
          </div>
          <div className="w-full bg-gray-200 h-2">
            <div className="bg-green-500 h-2 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          {!submitted && (
            <div className="p-2 text-center text-sm text-gray-500 bg-gray-100 font-medium">
              Đã hoàn thành: <span className="text-red-600 font-bold">{Object.keys(answers).length}</span> / {questions.length} câu
            </div>
          )}
        </div>

        <div className="space-y-8">
          {questions.map((q, index) => {
            const userAns = answers[q.id] || [];
            const isCorrect = userAns.length === q.correctAnswers.length && userAns.every(v => q.correctAnswers.includes(v));

            return (
              <div key={q.id} className={`bg-white rounded-xl shadow-md p-6 border-l-4 transition-all duration-300 ${submitted ? (isCorrect ? 'border-green-500 bg-green-50/20' : 'border-red-500 bg-red-50/20') : 'border-gray-300 hover:shadow-lg'}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-relaxed whitespace-pre-line">
                  <span className="text-red-600 mr-2 bg-red-100 px-3 py-1 rounded-full text-sm">Câu {index + 1}</span> 
                  {q.content} {q.type === 'multiple' && <span className="inline-block text-xs font-normal text-blue-600 bg-blue-100 px-2 py-1 rounded ml-1">(Chọn nhiều đáp án)</span>}
                </h3>
                
                {q.codeSnippet && (
                  <div className="relative my-4">
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono shadow-inner leading-relaxed">
                      <code>{q.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                <div className="space-y-3 mt-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAns.includes(optIdx);
                    const isCorrectOpt = q.correctAnswers.includes(optIdx);
                    
                    let optionClasses = "flex items-start p-3 rounded-lg border-2 transition-all cursor-pointer ";
                    
                    if (!submitted) {
                      optionClasses += isSelected 
                        ? "bg-red-50 border-red-300 shadow-sm text-red-900 font-medium" 
                        : "border-transparent hover:border-gray-200 hover:bg-gray-50 text-gray-700 bg-gray-50/50";
                    } else {
                      if (isCorrectOpt) {
                        optionClasses += "bg-green-100 border-green-500 text-green-900 font-bold ";
                      } else if (isSelected && !isCorrectOpt) {
                        optionClasses += "bg-red-100 border-red-500 text-red-900 line-through font-medium opacity-80 ";
                      } else {
                        optionClasses += "opacity-50 border-transparent bg-gray-50 text-gray-500 ";
                      }
                    }

                    return (
                      <div 
                        key={optIdx} 
                        className={optionClasses}
                        onClick={() => handleSelect(q.id, optIdx, q.type)}
                      >
                        <div className="flex-shrink-0 mt-0.5 mr-3">
                          {q.type === 'single' ? (
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected && !submitted ? 'border-red-600' : submitted && isCorrectOpt ? 'border-green-600' : submitted && isSelected ? 'border-red-600' : 'border-gray-400'}`}>
                              {(isSelected || (submitted && isCorrectOpt)) && <div className={`w-2.5 h-2.5 rounded-full ${submitted && isCorrectOpt ? 'bg-green-600' : 'bg-red-600'}`}></div>}
                            </div>
                          ) : (
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected && !submitted ? 'border-red-600 bg-red-50' : submitted && isCorrectOpt ? 'border-green-600 bg-green-600' : submitted && isSelected ? 'border-red-600 bg-red-600' : 'border-gray-400'}`}>
                              {(isSelected || (submitted && isCorrectOpt)) && <svg className={`w-3.5 h-3.5 ${submitted ? 'text-white' : 'text-red-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                          )}
                        </div>
                        <span className="text-[15px] leading-snug pt-px">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-5 p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    <p className={`font-bold mb-2 flex items-center ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? (
                        <><svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Trả lời chính xác!</>
                      ) : (
                        <><svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg> Sai rồi!</>
                      )}
                    </p>
                    <p className="text-gray-700 leading-relaxed"><span className="font-semibold text-gray-900 bg-white px-2 py-1 rounded shadow-sm mr-2 text-sm border">Giải thích chuyên sâu:</span> {q.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-12 mb-24 text-center">
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-4 px-12 rounded-full shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg tracking-wide"
            >
              Nộp Bài & Xem Điểm
            </button>
          </div>
        )}
        
        {submitted && (
          <div className="mt-12 mb-24 p-8 bg-white rounded-2xl shadow-2xl text-center space-y-6 border-t-8 border-red-600">
             <h2 className="text-2xl font-bold text-gray-600">Tổng kết bài thi</h2>
             <div className="text-5xl font-black text-gray-800">
               <span className={score >= 40 ? 'text-green-600' : 'text-red-600'}>{score}</span> 
               <span className="text-gray-400 text-4xl"> / {questions.length}</span>
             </div>
             <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
               {score >= 45 ? '🎉 Xuất sắc! Bạn đã nắm vững toàn bộ kiến thức khởi đầu của Lập trình Hướng đối tượng.' 
                : score >= 35 ? '🔥 Rất tốt! Bạn hiểu bản chất, nhưng hãy chú ý hơn vào các bẫy liên quan đến quản lý bộ nhớ.' 
                : '📚 Bạn đang hổng kiến thức khá nhiều. Hãy đọc kỹ lại slide bài giảng về Đóng gói và Khởi tạo đối tượng nhé!'}
             </p>
             <button 
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-6 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-10 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Làm Lại Bài Thi
              </button>
          </div>
        )}
      </div>
    </div>
  );
}
