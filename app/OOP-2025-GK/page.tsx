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
    question: "Chọn một đáp án. Chương trình sẽ in ra gì?",
    code: "public class Main {\n  static void print(Object... a) {\n    System.out.print(a.length);\n  }\n  public static void main(String[] args) {\n    String arr = {{\"a\",\"b\"},{\"c\",\"d\"}};\n    print((Object)arr);\n    print((Object[])arr);\n    print(arr);\n  }\n}",
    options: [
      "Chương trình sẽ in ra 123",
      "Chương trình sẽ in ra 234",
      "Chương trình sẽ in ra 12 rồi báo lỗi",
      "Chương trình vẫn chạy được, nhưng không in ra gì cả",
      "Chương trình bị lỗi cú pháp",
      "Đáp án tùy thuộc vào phiên bản Java"
    ],
    correctAnswer: [4],
    isMultiple: false,
    explanation: "Dòng `String arr = {{\"a\",\"b\"},{\"c\",\"d\"}};` bị lỗi cú pháp vì khai báo sai kiểu dữ liệu mảng 2 chiều (phải là `String[][] arr`). Do đó chương trình sẽ không thể biên dịch thành công."
  },
  {
    id: 2,
    question: "Điều gì xảy ra khi bạn khai báo một biến cục bộ (trong hàm) mà không gán giá trị đầu nhưng lại sử dụng nó?",
    options: [
      "Xảy ra lỗi Runtime",
      "Xảy ra lỗi biên dịch",
      "Biến nhận giá trị 0",
      "Biến nhận giá trị null"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Trong Java, các biến cục bộ (local variables) không được gán giá trị mặc định. Nếu bạn cố gắng sử dụng một biến cục bộ chưa được khởi tạo, trình biên dịch (Compiler) sẽ báo lỗi ngay lập tức (Variable might not have been initialized)."
  },
  {
    id: 3,
    question: "Mã nguồn này thuộc file A.java. Hãy chọn đáp án đúng về mã nguồn trên (được phép chọn nhiều)",
    code: "public class A {\n  private int x=0;\n  private int y, z=0;\n  public A(int x) {\n    this.x = x;\n    y = x;\n    z = x + y;\n  }\n}",
    options: [
      "Mã nguồn trên không bị lỗi cú pháp nào cả",
      "Mã nguồn trên bị lỗi vì không có PTKD mặc định",
      "Mã nguồn trên bị lỗi vì phép khai báo y và gán z lại ở trên cùng một dòng",
      "Đáp án khác"
    ],
    correctAnswer: [0],
    isMultiple: true,
    explanation: "Đoạn code hoàn toàn hợp lệ. Khai báo `private int y, z=0;` là hợp lệ (y chưa khởi tạo, z=0). Phương thức khởi dựng (PTKD) mặc định không bắt buộc phải có mặt trừ khi có lớp con gọi `super()` mặc định. Các phép gán trong constructor đều đúng cú pháp."
  },
  {
    id: 4,
    question: "Có thể sử dụng kiểu dữ liệu nguyên thủy (primitive) như int, double làm tham số Generic được không? (Ví dụ: List<int>)?",
    options: [
      "Không, phải dùng lớp bao (Wrapper Class) như Integer, Double.",
      "Có, nếu dùng Java phiên bản mới nhất.",
      "Có, thoải mái.",
      "Chỉ dùng được với kiểu int."
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Generics trong Java hoạt động dựa trên cơ chế Type Erasure, chỉ làm việc với các Object (Reference Type). Do đó, các kiểu nguyên thủy (primitive types) không thể dùng trực tiếp mà phải sử dụng các Wrapper Class tương ứng."
  },
  {
    id: 5,
    question: "Hãy chọn đáp án đúng về mã nguồn sau:",
    code: "public class Test {\n  public static int plus(int... arr) {\n    int result = 0;\n    for (int i: arr) {\n      result += 1;\n    }\n    return result;\n  }\n  public static int plus(int arr) {\n    return 0;\n  }\n  public static void main(String[] args) {\n    System.out.println(plus(null));\n  }\n}",
    options: [
      "Chương trình báo lỗi cú pháp vì int... không thể có ở hàm static",
      "Chương trình báo lỗi vì JVM không biết chọn hàm plus nào",
      "Chương trình sẽ in ra 1",
      "Chương trình sẽ in ra 0",
      "Đáp án khác",
      "Chương trình báo lỗi vì hai hàm giống hệt nhau",
      "Chương trình báo lỗi vì không có hàm nào phù hợp với tham số null",
      "Chương trình báo lỗi vì truy cập phải đối tượng null ở hàm plus(int arr)",
      "Chương trình báo lỗi vì truy cập phải đối tượng null ở hàm plus(int... arr)"
    ],
    correctAnswer: [8],
    isMultiple: false,
    explanation: "Do truyền `null`, tham số nguyên thủy `int` không thể nhận giá trị null, nên hàm `plus(int arr)` bị loại. Hàm `plus(int... arr)` nhận một mảng (kiểu tham chiếu) nên có thể nhận `null`. Tuy nhiên, khi vào trong vòng lặp foreach `for (int i: arr)`, việc lấy dữ liệu từ mảng `null` sẽ ném ra ngoại lệ NullPointerException."
  },
  {
    id: 6,
    question: "Cho mảng int[] arr = new int[5];. Chỉ số (index) hợp lệ cuối cùng của mảng này là bao nhiêu?",
    options: ["4", "6", "0", "5"],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Mảng có kích thước là 5 phần tử. Chỉ số của mảng trong Java bắt đầu từ 0, do đó chỉ số hợp lệ cuối cùng là kích thước mảng - 1 (tức là 4)."
  },
  {
    id: 7,
    question: "Hãy chọn đáp án đúng về mã nguồn sau:",
    code: "public class Test {\n  public static int plus(int... arr) {\n    int result = 0;\n    for (int i: arr) {\n      result += i;\n    }\n    return result;\n  }\n  public static int plus(int arr) {\n    return 0;\n  }\n  public static void main(String[] args) {\n    System.out.println(plus());\n  }\n}",
    options: [
      "Chương trình báo lỗi cú pháp vì int... không thể có ở hàm static",
      "Chương trình báo lỗi vì JVM không biết chọn hàm plus nào",
      "Chương trình sẽ in ra 1",
      "Chương trình sẽ in ra 0 vì gọi hàm plus(int... arr)",
      "Chương trình sẽ in ra 0 vì gọi hàm plus(int arr)",
      "Đáp án khác"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Lệnh `plus()` truyền vào 0 tham số. Hàm `plus(int arr)` yêu cầu đúng 1 tham số. Hàm `plus(int... arr)` sử dụng varargs cho phép nhận từ 0 đến n tham số. Do đó, hàm varargs được gọi với mảng rỗng, vòng lặp không chạy, trả về `result = 0`."
  },
  {
    id: 8,
    question: "Từ khóa static gắn vào một phương thức có ý nghĩa gì?",
    options: [
      "Thuộc về lớp (Class)",
      "Hàm không thể thay đổi",
      "Tự động xóa bộ nhớ",
      "Dùng cho đa luồng"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Từ khóa `static` cho biết thành viên (biến hoặc phương thức) đó thuộc về bản thân Lớp (Class) chứ không phải thuộc về một thể hiện (Instance/Object) cụ thể nào."
  },
  {
    id: 9,
    question: "Chương trình in ra gì? (Sysout là viết tắt của System.out.print)",
    code: "public class Program {\n  public static void show(int x) { System.out.print(1); }\n  public static void show(String x) { System.out.print(2); }\n  public static void main(String args[]) {\n    show(null);\n  }\n}",
    options: [
      "null",
      "1",
      "2",
      "Lỗi cú pháp vì không tìm thấy hàm nào phù hợp với kiểu dữ liệu null",
      "Tất cả đều sai"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "`null` không thể được gán cho một kiểu nguyên thủy (primitive) như `int`. Tuy nhiên, `null` có thể được truyền cho bất kỳ đối tượng nào (Reference Type), ở đây là `String`. Do đó, hàm `show(String x)` được gọi, in ra 2."
  },
  {
    id: 10,
    question: "Điểm khác biệt chính giữa vòng lặp while và do-while là gì?",
    options: [
      "Tốc độ thực thi lệnh",
      "Kiểu dữ liệu điều kiện",
      "Cách dùng biến đếm",
      "Số lần chạy tối thiểu"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Khác biệt duy nhất: `while` kiểm tra điều kiện trước khi chạy (có thể chạy 0 lần). `do-while` chạy khối lệnh ít nhất 1 lần rồi mới kiểm tra điều kiện (số lần chạy tối thiểu là 1)."
  },
  {
    id: 11,
    question: "Nếu truyền tham số có từ khoá final đằng trước tên kiểu thì có làm thay đổi giá trị của thuộc tính trong đối tượng? (Chỉ chọn một)",
    code: "class A {\n  public int x;\n}\n\n// Trong phương thức:\npublic static void m(final A obj) {\n  obj.x = 3;\n}",
    options: [
      "Không thể khai báo final như trên được, chương trình sẽ báo lỗi cú pháp",
      "Không thể sửa được thuộc tính của đối tượng final",
      "Sửa được với điều kiện thêm từ khóa static trước final",
      "Chương trình vẫn chạy được với từ khoá static trước final",
      "Vẫn thay đổi được, thậm chí gán lại cho obj là đối tượng mới",
      "Chỉ thay đổi được thuộc tính x",
      "Đáp án khác"
    ],
    correctAnswer: [5],
    isMultiple: false,
    explanation: "Từ khóa `final` áp dụng cho tham chiếu đối tượng (`obj`) có nghĩa là bạn không thể gán lại đối tượng đó thành một thể hiện hoàn toàn mới (vd: `obj = new A()`). Tuy nhiên, bạn VẪN CÓ THỂ thay đổi trạng thái (thuộc tính) bên trong đối tượng đó. Do đó, gán `obj.x = 3` hoàn toàn hợp lệ."
  },
  {
    id: 12,
    question: "Trong Java, một lớp có thể kế thừa trực tiếp từ bao nhiêu lớp cha khác?",
    options: [
      "Duy nhất một lớp cha",
      "Hai lớp cha bất kỳ",
      "Không giới hạn số lớp",
      "Tùy vào bộ nhớ RAM"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Java không hỗ trợ đa kế thừa đối với Lớp (Class) để tránh vấn đề Diamond Problem. Một lớp chỉ có thể `extends` duy nhất một lớp cha."
  },
  {
    id: 13,
    question: "Khi chuyển từ giai đoạn Phân tích hướng đối tượng (OOA) sang Thiết kế hướng đối tượng (OOD), phát biểu nào sau đây mô tả chính xác nhất sự thay đổi của các Lớp (Classes)?",
    options: [
      "Các lớp trong OOA bị loại bỏ hoàn toàn và thay thế bằng các lớp giao diện (Interface) trong OOD.",
      "Các khái niệm trong OOA được ánh xạ thành các lớp thực thi; các ràng buộc, tối ưu hóa và đặc tả chi tiết được thêm vào để xây dựng hệ thống.",
      "OOD chỉ tập trung vào việc chuẩn hóa cấu trúc dữ liệu (Normalization) cho CSDL chứ không can thiệp vào cấu trúc hành vi của lớp đã định nghĩa ở OOA.",
      "Các quan hệ thừa kế trong OOA bắt buộc phải bị loại bỏ trong OOD để đảm bảo hiệu năng chương trình."
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Trong quy trình phần mềm, OOA tập trung vào khái niệm nghiệp vụ (nhận diện lớp, thuộc tính). Khi sang OOD, các khái niệm này được chuyển đổi chi tiết hơn, thêm các ràng buộc kỹ thuật, tối ưu hóa thiết kế hệ thống và định nghĩa thực thi cụ thể."
  },
  {
    id: 14,
    question: "Khối lệnh finally trong cấu trúc try-catch-finally sẽ được thực thi khi nào?",
    options: [
      "Luôn luôn được thực thi",
      "Khi có lệnh return gọi",
      "Khi không có lỗi xảy ra",
      "Khi chỉ có lỗi xảy ra"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Khối `finally` luôn được thực thi bất kể khối `try` có xảy ra ngoại lệ (exception) hay không, trừ trường hợp hiếm hoi như hệ thống bị ép tắt `System.exit()`."
  },
  {
    id: 15,
    question: "Lợi ích chính và cốt lõi nhất của việc sử dụng Lớp trừu tượng đối với đặc tính Đa hình là gì?",
    options: [
      "Ép buộc các lớp con phải cung cấp cài đặt riêng biệt cho một tập hợp hành vi chung, tạo ra một hợp đồng thiết kế nhất quán.",
      "Cung cấp một khuôn mẫu (template) tham chiếu chung, cho phép một biến thuộc kiểu cha trừu tượng có thể trỏ đến và gọi phương thức của đối tượng lớp con cụ thể.",
      "Đảm bảo rằng việc ánh xạ thông điệp tới phiên bản phương thức được ghi đè phải được giải quyết tại thời điểm chạy (Runtime - Dynamic Binding).",
      "Cho phép tái sử dụng các phương thức đã cài đặt trong lớp cha trừu tượng mà không cần viết lại mã nguồn trong mọi lớp con."
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Đa hình (Polymorphism) hoạt động mạnh mẽ nhất khi chúng ta sử dụng một kiểu tham chiếu chung (Lớp cha/Trừu tượng) đại diện cho nhiều đối tượng thực tế (Lớp con) khác nhau. Khả năng Upcasting này giúp mã linh hoạt."
  },
  {
    id: 16,
    question: "Giả sử bạn đang xây dựng một thư viện xử lý file. Chọn phương án SAI khi viết mã sử dụng phương thức readFile:",
    code: "public class FileCorrupException extends Exception {\n  public FileCorrupException(String msg) { super(msg); }\n}\n\npublic void readFile(String path) throws FileCorrupException {\n  if (path == null) throw new NullPointerException();\n  if (path.contains(\"bad\")) throw new FileCorrupException(\"Bad file\");\n}",
    options: [
      "Không có phương án nào sai cả",
      "Nếu sửa định nghĩa lớp thành class FileCorrupException extends RuntimeException, thì khi gọi readFile không bắt buộc phải xử lý ngoại lệ này.",
      "Trong khối catch, bạn có thể bắt FileCorrupException trước, sau đó bắt Exception sau để đảm bảo không bị lỗi biên dịch 'unreachable code'.",
      "Dòng lệnh throw new NullPointerException() trong readFile sẽ gây lỗi biên dịch vì phương thức chưa khai báo throws NullPointerException."
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Phương án D sai vì `NullPointerException` là một Unchecked Exception (kế thừa từ RuntimeException). Do đó, bạn hoàn toàn có thể ném (throw) nó mà không bắt buộc phải khai báo nó trong mệnh đề `throws` của chữ ký hàm."
  },
  {
    id: 17,
    question: "Chương trình sẽ in ra gì?",
    code: "class A {\n  public A() { System.out.print(\"1\"); }\n}\nclass B extends A {\n  public B(String s) { super(); System.out.print(\"2\"); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    new B(\"Test\");\n  }\n}",
    options: [
      "12",
      "21",
      "2 (Lỗi biên dịch vì không gọi super())",
      "Lỗi Runtime"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Khi tạo đối tượng `new B(\"Test\")`, constructor của B được gọi, bên trong gọi rõ ràng `super()` để vào constructor của lớp cha A. A in ra '1'. Sau đó trở về B in ra '2'. Kết quả: 12."
  },
  {
    id: 18,
    question: "Lớp nào là lớp cha cao nhất (root) của tất cả các ngoại lệ và lỗi trong Java?",
    options: [
      "Throwable",
      "Exception",
      "RuntimeException",
      "Error"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "`java.lang.Throwable` là gốc của toàn bộ hệ thống xử lý ngoại lệ trong Java. `Exception` và `Error` là hai lớp con trực tiếp của nó."
  },
  {
    id: 19,
    question: "Hãy chọn đáp án đúng:",
    code: "class Parent {\n  public Parent() {\n    print();\n  }\n  public final void print() {\n    System.out.print(\"Parent\");\n  }\n}\nclass Child extends Parent {\n  public void print() {\n    System.out.print(\"Child\");\n  }\n}\npublic class Main {\n  public static void main(String[] args) {\n    new Child();\n  }\n}",
    options: [
      "Lỗi biên dịch (Child.print không thể ghi đè final)",
      "Biên dịch và in ra Child",
      "Biên dịch và in ra Parent",
      "Lỗi Runtime"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Phương thức `print()` trong lớp Parent được khai báo bằng từ khóa `final`. Do đó, lớp con (Child) không được phép ghi đè (override) phương thức này. Gây lỗi biên dịch."
  },
  {
    id: 20,
    question: "Từ khóa nào được dùng để chủ động tạo ra và ném một đối tượng ngoại lệ cụ thể?",
    options: [
      "catch",
      "throws",
      "throw",
      "finally"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Từ khóa `throw` (không có chữ 's') dùng bên trong thân hàm để chủ động ném đi 1 đối tượng ngoại lệ cụ thể (ví dụ: `throw new Exception();`). Còn `throws` dùng ở chữ ký hàm."
  },
  {
    id: 21,
    question: "Khai báo lớp như này có hợp lệ không?",
    code: "abstract class A {\n  public abstract static void run();\n}",
    options: [
      "Có (vì static thuộc về lớp)",
      "Không (vì abstract yêu cầu override trên instance)",
      "Có, nhưng lớp con phải cài đặt",
      "Lỗi Runtime"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Trong Java, phương thức `static` không thể bị ghi đè (override) bởi cơ chế đa hình động, trong khi mục đích duy nhất của từ khóa `abstract` là buộc lớp con phải ghi đè nó. Do đó, tổ hợp từ khóa `abstract static` là bất hợp pháp và gây lỗi biên dịch."
  },
  {
    id: 22,
    question: "Trong cấu trúc try-catch, bạn có thể có bao nhiêu khối catch cho một khối try duy nhất?",
    options: [
      "Không giới hạn",
      "Tối đa là 3",
      "Phải có ít nhất 2",
      "Duy nhất 1"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Một khối `try` có thể theo sau bởi số lượng khối `catch` không giới hạn, dùng để bắt và xử lý riêng biệt cho từng loại ngoại lệ khác nhau (với điều kiện lớp ngoại lệ con phải đứng trước lớp cha)."
  },
  {
    id: 23,
    question: "Hãy chọn đáp án đúng",
    code: "class Rectangle {\n  protected int width, height;\n  public void setWidth(int w) { width = w; }\n  public void setHeight(int h) { height = h; }\n  public int getArea() { return width * height; }\n}\nclass Square extends Rectangle {\n  @Override\n  public void setWidth(int w) { width = height = w; }\n  @Override\n  public void setHeight(int h) { width = height = h; }\n}\npublic class Main {\n  static void resize(Rectangle r) {\n    r.setWidth(5);\n    r.setHeight(10);\n    assert r.getArea() == 50; // Expectation\n  }\n  public static void main(String[] args) {\n    resize(new Rectangle()); // Line X\n    resize(new Square());    // Line Y\n  }\n}",
    options: [
      "Cả hai assertions đều pass",
      "Line X pass, Line Y fail (area = 100)",
      "Cả hai assertions đều fail",
      "Compile error"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Ở Line X, với Rectangle thông thường: width=5, height=10 -> Area=50 (Pass). Ở Line Y, Square vi phạm Liskov Substitution Principle (LSP). Hàm `setHeight(10)` sẽ set cả width=10. Do đó Area = 10*10 = 100, làm Assertion bị Fail."
  },
  {
    id: 24,
    question: "Kết quả của System.out.println(s3==s4) là gì?",
    code: "String s1 = \"100\";\nString s2 = \"20\";\nString s3 = s1 + s2;\nString s4 = \"10020\";\nSystem.out.println(s3 == s4);",
    options: [
      "true",
      "false",
      "Lỗi biên dịch",
      "Lỗi Runtime"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "`s4` là String literal nên được lưu trong String Pool. Phép cộng `s1 + s2` là ghép chuỗi từ các biến (không phải từ hằng số trực tiếp), nên Java sẽ tạo một đối tượng String HOÀN TOÀN MỚI trên bộ nhớ Heap. Do đó hai đối tượng trỏ tới vùng nhớ khác nhau -> `false`."
  },
  {
    id: 25,
    question: "Biểu đồ UML (Mô phỏng code dưới đây). Các lựa chọn nào sau đây KHÔNG đúng?",
    code: "class BanhXe{}\nclass DongCo{}\nabstract class PhuongTien { public abstract void di(); public abstract void dungLai(); }\nclass OTo extends PhuongTien {\n  BanhXe banhTraiTruoc = new BanhXe(), banhPhaiTruoc = new BanhXe();\n  BanhXe banhTraiSau = new BanhXe(), banhPhaiSau = new BanhXe();\n  DongCo dc = new DongCo();\n  public DongCo getDongCo() {return dc;}\n  public void lenGa() {}\n  public void tangToc() {}\n}\nclass OToKhach extends OTo {\n  private int soLuongMax;\n}",
    options: [
      "Một đối tượng OtoKhach kế thừa một thể hiện DongCo và 4 thể hiện của BanhXe từ lớp cha OTO.",
      "Mối quan hệ giữa OtoKhach và PhuongTien là mối quan hệ kế thừa.",
      "Một đối tượng OtoKhach có thể lên ga và tăng tốc.",
      "Mối quan hệ giữa OtoKhach và DongCo là quan hệ kế thừa.",
      "Tất cả các lựa chọn trên đều đúng."
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Lớp Oto (và OtoKhach) SỞ HỮU (Aggregation/Composition - quan hệ HAS-A) DongCo và BanhXe thông qua các thuộc tính. Đây KHÔNG phải là quan hệ kế thừa (IS-A) bằng từ khóa `extends`."
  },
  {
    id: 26,
    question: "Thứ tự bắt các ngoại lệ nào sau đây là đúng để tránh lỗi 'unreachable code'?",
    options: [
      "Thứ tự nào cũng được",
      "Lớp con trước, cha sau",
      "Chỉ được bắt lớp cha",
      "Exception trước, con sau"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Do tính chất Đa hình, khối catch bắt Ngoại lệ cha cũng sẽ bắt luôn tất cả Ngoại lệ con. Nếu đặt Cha trước, Con sau thì khối catch của Con sẽ không bao giờ được chạm tới (Unreachable code). Luôn phải xếp: Catch(Con), Catch(Cha)."
  },
  {
    id: 27,
    question: "Chương trình sẽ in ra gì?",
    code: "class A {\n  public static void m() { System.out.print(\"0\"); }\n}\nclass B extends A {\n  public static void m() { System.out.print(\"1\"); }\n}\npublic class Main {\n  public static void main(String args[]){\n    A obj = new B();\n    B x = new B();\n    obj.m();\n    x.m();\n  }\n}",
    options: [
      "in ra 00",
      "in ra 01",
      "in ra 10",
      "in ra 11",
      "Mã nguồn không chạy được vì viết A obj = new B() là sai"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Phương thức `static` không hỗ trợ ghi đè (no polymorphism/dynamic binding). Quá trình gọi hàm tĩnh dựa trên KIỂU DỮ LIỆU ĐƯỢC KHAI BÁO (Reference Type) tại thời điểm biên dịch. Biến `obj` khai báo là kiểu A -> gọi A.m() in '0'. Biến `x` khai báo kiểu B -> gọi B.m() in '1'. Kết quả: 01."
  },
  {
    id: 28,
    question: "Hãy chọn đáp án đúng",
    code: "public class Main {\n  public static void process(final int value) {\n    value = 20; // Dòng 1\n    int temp = value;\n    temp = 30;  // Dòng 2\n    System.out.println(temp);\n  }\n  public static void main(String[] args) {\n    process(10);\n  }\n}",
    options: [
      "Biên dịch thành công, in ra 30",
      "Lỗi biên dịch ở Dòng 1",
      "Lỗi biên dịch ở Dòng 2",
      "Lỗi Runtime"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Tham số `value` được khai báo là `final int value`. Do vậy nó hoạt động như một hằng số và không thể bị gán lại giá trị mới trong hàm. Dòng `value = 20;` sẽ gây lỗi biên dịch."
  },
  {
    id: 29,
    question: "Chương trình in ra gì?",
    code: "class Item {\n  String name;\n  Item(String name) { this.name = name; }\n}\npublic class Main {\n  public static void main(String[] args) {\n    Item[] arr = new Item[3];\n    Item temp = new Item(\"A\");\n    for (int i = 0; i < arr.length; i++) {\n      temp.name += i;\n      arr[i] = temp;\n    }\n    System.out.print(arr[0].name + \" | \" + arr[2].name);\n  }\n}",
    options: [
      "A0 | A2",
      "A A",
      "A0A0",
      "A012 | A012"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Tất cả các ô trong mảng (`arr[0]`, `arr[1]`, `arr[2]`) đều trỏ chung vào cùng MỘT đối tượng duy nhất `temp`. Vòng lặp liên tục sửa chuỗi `temp.name`: Lần 1 thành 'A0', lần 2 'A01', lần 3 'A012'. Khi in ra, cả 2 index đều trỏ tới đối tượng này nên đều in 'A012'."
  },
  {
    id: 30,
    question: "Chương trình sẽ in ra gì?",
    code: "public class Main {\n  public static void main(String[] args) {\n    float f = 10.0f;\n    int i = 10;\n    if (f = i) {\n      f = f * 0.1f;\n      if (f * 10.0f == i) {\n        System.out.println(\"Yes\");\n      } else {\n        System.out.println(\"No\");\n      }\n    }\n  }\n}",
    options: [
      "Lỗi biên dịch",
      "Lỗi Runtime",
      "No",
      "Yes"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Trong lệnh if đầu tiên: `if (f = i)` sử dụng phép GÁN `=` thay vì phép so sánh `==`. Phép gán này sẽ trả về giá trị kiểu `float` (10.0f). Mà trong Java, biểu thức điều kiện của lệnh `if` bắt buộc phải là kiểu `boolean`. Do đó lỗi cú pháp."
  },
  {
    id: 31,
    question: "Tại sao câu lệnh x instanceof A luôn trả về false khi x = null?",
    options: [
      "Vì null không tham chiếu đến object nào",
      "Vì instanceof không hỗ trợ null",
      "Vì A là class",
      "Vì null chỉ dùng được với interface"
    ],
    correctAnswer: [0],
    isMultiple: false,
    explanation: "Toán tử `instanceof` kiểm tra xem đối tượng tại vùng nhớ thực tế có phải là một thể hiện của lớp đích hay không. Khi một biến bằng `null`, nó không trỏ tới bất kỳ đối tượng nào ở vùng nhớ Heap, nên nó không thể 'is-a' bất kỳ kiểu nào cả."
  },
  {
    id: 32,
    question: "Khối finally sẽ KHÔNG chạy trong trường hợp hiếm hoi nào dưới đây?",
    options: [
      "Khi ngoại lệ không bắt được",
      "Khi gọi System.exit(0)",
      "Khi có lệnh return",
      "Khi dùng lệnh break"
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "`System.exit(0)` sẽ ngắt hoàn toàn quá trình thực thi của Máy ảo Java (JVM) ngay lập tức. Các khối lệnh return, break, hoặc throw ngoại lệ thì finally vẫn sẽ chạy trước khi thoát."
  },
  {
    id: 33,
    question: "Lợi ích lớn nhất của việc dùng finally là gì?",
    options: [
      "Thay thế hoàn toàn catch",
      "Làm code chạy nhanh hơn",
      "Đảm bảo đóng tài nguyên",
      "Tự động sửa lỗi chương trình"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Mục đích lớn nhất của finally là đảm bảo các thao tác dọn dẹp hệ thống (đóng file, ngắt kết nối database, giải phóng tài nguyên mạng) luôn được diễn ra bất chấp trước đó có ngoại lệ hay return sớm."
  },
  {
    id: 34,
    question: "Sự khác biệt giữa Error và Exception là gì?",
    options: [
      "Chỉ Exception mới có thông báo",
      "Exception nặng hơn Error",
      "Error không thể bắt được",
      "Error dùng cho lỗi toán học"
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Đây là một cách nói phổ biến: Trong khi Exception (Ngoại lệ) là các lỗi liên quan logic lập trình có thể/nên bắt (catch) để xử lý phục hồi; Error đại diện cho lỗi hệ thống nghiêm trọng (Out of Memory, Stack Overflow) mà ứng dụng thường 'không thể bắt' để xử lý tiếp mà phải ngừng hoạt động."
  },
  {
    id: 35,
    question: "Trong biểu đồ lớp, một thuộc tính hoặc phương thức được gạch chân (underlined) mang ý nghĩa gì?",
    options: [
      "Đó là thành phần Private (riêng tư), chỉ sử dụng nội bộ.",
      "Đó là phương thức trừu tượng (Abstract), bắt buộc lớp con phải cài đặt.",
      "Đó là thành phần có phạm vi Classifier.",
      "Đó là thuộc tính khóa (Key attribute) dùng để định danh đối tượng."
    ],
    correctAnswer: [2],
    isMultiple: false,
    explanation: "Trong UML Class Diagram, phần tử được gạch dưới (underlined) đại diện cho thành phần tĩnh (static member) hay còn gọi là Classifier scope - thuộc về toàn bộ lớp thay vì thuộc về một thể hiện cụ thể."
  },
  {
    id: 36,
    question: "Hãy chọn đáp án đúng về câu chương trình sẽ in ra",
    code: "class A {\n  void process(A arg) { System.out.println(\"A->A\"); }\n  void process(B arg) { System.out.println(\"A->B\"); }\n}\nclass B extends A {\n  void process(A arg) { System.out.println(\"B->A\"); }\n  void process(B arg) { System.out.println(\"B->B\"); }\n}\npublic class Main {\n  public static void main(String[] args) {\n    A ref = new B();\n    A arg = new B();\n    ref.process(arg);\n  }\n}",
    options: [
      "A->B",
      "B->B",
      "A->A",
      "B->A",
      "Chương trình báo lỗi cú pháp",
      "Chương trình báo lỗi run-time"
    ],
    correctAnswer: [3],
    isMultiple: false,
    explanation: "Đây là bẫy kết hợp nạp chồng (Overloading) và ghi đè (Overriding). 1) Ở Compile-time (Overloading quyết định): Compiler nhìn thấy `ref` khai báo kiểu A, và truyền tham số `arg` khai báo kiểu A -> Quyết định chọn chữ ký hàm `process(A)`. 2) Ở Run-time (Overriding quyết định): Do đối tượng thực sự là B, hàm `process(A)` bị ghi đè ở lớp B sẽ được kích hoạt. Kết quả chạy hàm `process(A)` ở class B -> In ra 'B->A'."
  },
  {
    id: 37,
    question: "Phát biểu nào sau đây là đúng về việc mô tả PTKD (Phương thức khởi dựng - Constructor) trong biểu đồ lớp? (Được phép chọn nhiều)",
    options: [
      "PTKD không có chỉ định truy cập trong biểu đồ lớp",
      "PTKD không có kiểu giá trị trả về trong biểu đồ lớp",
      "PTKD không có tham số trong biểu đồ lớp",
      "PTKD không có mặt trong biểu đồ lớp vì nó không được xem là thành viên lớp",
      "Tất cả đều sai",
      "PTKD có kiểu trả về void trong khai báo"
    ],
    correctAnswer: [1],
    isMultiple: true,
    explanation: "Trong biểu đồ UML, Constructor (Phương thức khởi dựng) là một phương thức đặc biệt trùng tên với Lớp, CÓ thể có phạm vi truy cập (public +...), CÓ thể chứa tham số, nhưng đặc điểm quan trọng nhất là KHÔNG CÓ kiểu giá trị trả về (kể cả void)."
  },
  {
    id: 38,
    question: "Nếu Interface A extends B, C (đa kế thừa interface), và cả B, C đều có phương thức void print() (abstract), thì Interface A có lỗi không?",
    options: [
      "Có, lỗi duplicate method.",
      "Không.",
      "Có, lỗi xung đột.",
      "Chỉ lỗi nếu B và C có kiểu trả về khác nhau."
    ],
    correctAnswer: [1],
    isMultiple: false,
    explanation: "Hoàn toàn không lỗi. Vì các phương thức trong interface là trừu tượng, không có phần thân/nội dung cài đặt (implementation). Việc thừa kế hai chữ ký hàm giống hệt nhau đơn giản chỉ là ghép chúng lại làm một, không gây ra hiệu ứng xung đột logic code."
  },
  {
    id: 39,
    question: "Đâu là cách tạo ra bytecode và kết quả của bytecode từ một mã nguồn Java:",
    options: [
      "Chạy lệnh jac và lấy file .byte",
      "Chạy lệnh javac và lấy file .code",
      "Chạy lệnh jvc và lấy file class",
      "Chạy lệnh java và lấy file bc",
      "Chạy lệnh javac và lấy file bytecode",
      "Chạy lệnh javac và lấy file class",
      "Chạy lệnh javap và lấy file bytecode",
      "Chạy lệnh javap và lấy file .class",
      "Chạy lệnh jav và lấy file class",
      "Chạy lệnh jav và lấy file bytecode"
    ],
    correctAnswer: [5],
    isMultiple: false,
    explanation: "Trình biên dịch Java Command-line (`javac`) chuyển đổi mã nguồn dạng văn bản (.java) sang ngôn ngữ Bytecode và được lưu dưới định dạng tệp có đuôi mở rộng là `.class`."
  },
  {
    id: 40,
    question: "abstract final class A{} Hãy chọn phát biểu đúng (được phép chọn nhiều)",
    options: [
      "Mã nguồn trên hoàn toàn hợp lệ",
      "Mã nguồn trên lỗi vì không có phương thức final",
      "Mã nguồn trên lỗi vì không có phương thức abstract",
      "Mã nguồn trên lỗi vì để abstract trước final, viết đúng là final abstract",
      "Mã nguồn trên lỗi vì viết đúng phải là abstract const",
      "Mã nguồn trên lỗi cú pháp"
    ],
    correctAnswer: [5],
    isMultiple: true,
    explanation: "Một lớp không thể mang đồng thời từ khóa `abstract` và `final`. `abstract` có nghĩa là 'lớp này được thiết kế để buộc lớp khác kế thừa', trong khi `final` mang ý nghĩa tuyệt đối là 'cấm bất kỳ lớp nào kế thừa'. Sự đối nghịch này khiến Trình biên dịch báo Lỗi Cú pháp."
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