'use client';

import React, { useState } from 'react';

type QuestionType = 'single' | 'multiple';

interface Question {
  id: number;
  type: QuestionType;
  content: string;
  codeSnippet?: string;
  options: string[];
  correctAnswers: number[]; // Array of correct option indices
  rationale: string;
}

const questions: Question[] = [
  // --- CHỦ ĐỀ 1: CHỒNG PHƯƠNG THỨC (OVERLOADING) & THIS ---
  {
    id: 1,
    type: 'single',
    content: 'Chữ ký của một phương thức (method signature) trong Java bao gồm những thành phần nào?',
    options: [
      'Tên phương thức, kiểu trả về và danh sách tham số.',
      'Tên phương thức và danh sách tham số (số lượng và kiểu dữ liệu).',
      'Tên phương thức, danh sách tham số và các ngoại lệ (exceptions) throws ra.',
      'Kiểu trả về, danh sách tham số và phạm vi truy cập (access modifier).'
    ],
    correctAnswers: [1],
    rationale: 'Theo slide 5, chữ ký phương thức chỉ bao gồm tên phương thức, số lượng và kiểu dữ liệu của các đối số. Kiểu trả về không thuộc chữ ký.'
  },
  {
    id: 2,
    type: 'single',
    content: 'Điều kiện BẮT BUỘC để hai phương thức được coi là nạp chồng (overloaded) trong cùng một lớp là gì?',
    options: [
      'Cùng tên, khác danh sách tham số, cùng kiểu trả về.',
      'Cùng tên, khác danh sách tham số, không quan tâm kiểu trả về.',
      'Khác tên, cùng danh sách tham số, cùng kiểu trả về.',
      'Cùng tên, cùng danh sách tham số nhưng khác access modifier.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 6 nhấn mạnh chồng phương thức yêu cầu cùng tên nhưng khác danh sách tham số. Trình biên dịch không dùng kiểu trả về để phân biệt.'
  },
  {
    id: 3,
    type: 'multiple',
    content: 'Cho phương thức: `public double test(String a, int b)`. Những phương thức nào sau đây hợp lệ để nạp chồng (overload) phương thức trên?',
    codeSnippet: 'public double test(String a, int b)',
    options: [
      'void test(String b, int a)',
      'public int test(String a, int b)',
      'private int test(int b, String a)',
      'public double test(String a, long b)'
    ],
    correctAnswers: [2, 3],
    rationale: 'Đáp án 1 sai vì cùng kiểu (String, int). Đáp án 2 sai vì trùng chữ ký (String, int). Đáp án 3 và 4 đổi thứ tự (int, String) và đổi kiểu (String, long) nên hợp lệ (Slide 10).'
  },
  {
    id: 4,
    type: 'single',
    content: 'Kết quả của đoạn mã sau là gì?',
    codeSnippet: 'class MyClass {\n  public void myMethod(int a, long b) { System.out.print("1"); }\n  public void myMethod(long a, int b) { System.out.print("2"); }\n}\npublic class Test {\n  public static void main(String args[]) {\n    MyClass m = new MyClass();\n    m.myMethod(9, 10);\n  }\n}',
    options: [
      'In ra 1',
      'In ra 2',
      'Lỗi biên dịch do không tìm thấy phương thức phù hợp.',
      'Lỗi biên dịch do có 2 phiên bản phương thức đều phù hợp (ambiguous).'
    ],
    correctAnswers: [3],
    rationale: 'Slide 13: Cả 2 tham số 9 và 10 đều là kiểu int. Nó có thể upcast tham số thứ 1 lên long hoặc tham số 2 lên long. Trình biên dịch không biết chọn cái nào nên báo lỗi ambiguous.'
  },
  {
    id: 5,
    type: 'single',
    content: 'Đoạn mã sau sẽ gọi phương thức nào?',
    codeSnippet: 'void f1(int x) { System.out.print("int"); }\nvoid f1(float x) { System.out.print("float"); }\n// Gọi:\nchar x = \'a\';\nf1(x);',
    options: [
      'Lỗi biên dịch',
      'In ra "int"',
      'In ra "float"',
      'Báo lỗi runtime'
    ],
    correctAnswers: [1],
    rationale: 'Slide 11: Kiểu char có thể tự động upcast lên int. Do không có hàm f1(char), nó sẽ gọi f1(int).'
  },
  {
    id: 6,
    type: 'single',
    content: 'Từ khóa `this` có thể được sử dụng để làm gì? (Chọn câu SAI)',
    options: [
      'Tham chiếu đến đối tượng hiện tại.',
      'Gọi một constructor khác trong cùng lớp.',
      'Phân biệt thuộc tính của lớp và tham số trùng tên của phương thức.',
      'Truy cập trực tiếp vào các biến static từ một ngữ cảnh static.'
    ],
    correctAnswers: [3],
    rationale: 'Slide 16: `this` đại diện cho instance (đối tượng hiện tại), không thể dùng trong ngữ cảnh static (phương thức static) để truy cập biến.'
  },
  {
    id: 7,
    type: 'single',
    content: 'Đâu là cú pháp đúng để gọi một phương thức khởi tạo (constructor) khác từ bên trong một constructor của cùng lớp?',
    options: [
      'ClassName();',
      'this();',
      'super();',
      'new ClassName();'
    ],
    correctAnswers: [1],
    rationale: 'Slide 16: Sử dụng `this(danh_sach_tham_so);` để gọi constructor khác trong cùng lớp.'
  },
  {
    id: 8,
    type: 'multiple',
    content: 'Đoạn code sau có lỗi biên dịch ở đâu? (Chọn nhiều đáp án)',
    codeSnippet: 'public class Ship {\n  private String name;\n  public Ship() { }\n  public Ship(String name) {\n    this.name = name;\n    this(); // Dòng 1\n  }\n  public Ship(String name, double x) {\n    this(name); // Dòng 2\n    super(); // Dòng 3\n  }\n}',
    options: [
      'Dòng 1',
      'Dòng 2',
      'Dòng 3',
      'Không có lỗi'
    ],
    correctAnswers: [0, 2],
    rationale: 'Lời gọi constructor `this()` hoặc `super()` phải là câu lệnh ĐẦU TIÊN trong constructor. Dòng 1 gọi `this()` sau lệnh gán nên lỗi. Dòng 3 gọi `super()` sau `this()` cũng lỗi vì chỉ được gọi một hàm tạo chuỗi ở dòng đầu.'
  },
  {
    id: 9,
    type: 'single',
    content: 'Đoạn code sau xuất ra kết quả gì?',
    codeSnippet: 'void f2(int x) { System.out.print("int"); }\nvoid f2(long x) { System.out.print("long"); }\n// Gọi:\nf2(5.5);',
    options: [
      'int',
      'long',
      'Lỗi biên dịch không tìm thấy symbol',
      'Ném ngoại lệ IllegalArgumentException'
    ],
    correctAnswers: [2],
    rationale: 'Slide 12: 5.5 là kiểu double mặc định. Không có hàm f2(double) nào, và double không tự downcast xuống int/long được nên lỗi biên dịch.'
  },
  {
    id: 10,
    type: 'single',
    content: 'Việc nạp chồng (overloading) constructor mang lại lợi ích gì?',
    options: [
      'Giảm thiểu bộ nhớ khi khởi tạo đối tượng.',
      'Cho phép đối tượng được khởi tạo theo nhiều trạng thái ban đầu khác nhau.',
      'Ghi đè lại các thuộc tính kế thừa từ lớp cha.',
      'Ngăn chặn việc tạo đối tượng bằng constructor mặc định.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 14: Trong nhiều tình huống cần khởi tạo đối tượng theo nhiều cách khác nhau, do đó cần overloading constructor.'
  },
  
  // --- CHỦ ĐỀ 2: THÀNH VIÊN STATIC & FINAL ---
  {
    id: 11,
    type: 'single',
    content: 'Phát biểu nào sau đây đúng về thành viên `static`?',
    options: [
      'Mỗi đối tượng có một bản sao riêng của biến static.',
      'Biến static chỉ có thể được truy cập thông qua một đối tượng đã khởi tạo.',
      'Biến static thuộc về lớp, tất cả các đối tượng đều chia sẻ chung một bản sao.',
      'Phương thức static có thể gọi trực tiếp phương thức non-static cùng lớp.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 24 & 29: Thành viên static (thành viên lớp) được chia sẻ chung. Thay đổi ở 1 đối tượng sẽ ảnh hưởng tất cả.'
  },
  {
    id: 12,
    type: 'single',
    content: 'Kết quả in ra của đoạn mã sau?',
    codeSnippet: 'class TestStatic {\n  public static int iStatic = 0;\n  public int iNonStatic = 0;\n}\n// Trong main:\nTestStatic obj1 = new TestStatic();\nobj1.iStatic = 10; \nobj1.iNonStatic = 11;\nTestStatic obj2 = new TestStatic();\nobj2.iStatic = 12;\nobj2.iNonStatic = 13;\nSystem.out.println(obj1.iStatic + "," + obj1.iNonStatic);',
    options: [
      '10,11',
      '12,11',
      '12,13',
      '10,13'
    ],
    correctAnswers: [1],
    rationale: 'Slide 25: `iStatic` bị obj2 ghi đè thành 12 nên obj1.iStatic cũng là 12. `iNonStatic` là của riêng obj1 nên vẫn là 11.'
  },
  {
    id: 13,
    type: 'multiple',
    content: 'Trong một phương thức `static`, bạn KHÔNG THỂ thực hiện những hành động nào dưới đây? (Chọn nhiều đáp án)',
    options: [
      'Sử dụng từ khóa `this`.',
      'Gọi một phương thức `static` khác trong cùng lớp.',
      'Truy cập trực tiếp vào một biến `instance` (non-static) của lớp.',
      'Khởi tạo một đối tượng của lớp đó bằng từ khóa `new`.'
    ],
    correctAnswers: [0, 2],
    rationale: 'Slide 26: Phương thức static không có con trỏ `this` và không thể truy cập trực tiếp thành viên non-static vì chúng thuộc về context của class chứ không phải instance.'
  },
  {
    id: 14,
    type: 'single',
    content: 'Một biến được khai báo `static final` (ví dụ `public static final int MAX = 100;`) được gọi là gì?',
    options: [
      'Biến cục bộ tĩnh.',
      'Biến tham chiếu hằng.',
      'Thành viên hằng của lớp (Class constant).',
      'Biến đối tượng hằng.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 28: `static final` dùng để định nghĩa các hằng số liên quan đến lớp (Class member + hằng số).'
  },
  {
    id: 15,
    type: 'single',
    content: 'Đoạn mã sau có lỗi ở đâu?',
    codeSnippet: 'public class Demo {\n  int i = 0;\n  void tang() { i++; }\n  public static void main(String args[]) {\n    tang();\n  }\n}',
    options: [
      'Lỗi biên dịch tại hàm tang() vì không thể tăng biến i.',
      'Lỗi biên dịch tại main() vì gọi hàm non-static từ context static.',
      'Lỗi Runtime NullPointerException.',
      'Chạy bình thường, i tăng lên 1.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 26: Non-static method tang() cannot be referenced from a static context (hàm main).'
  },
  {
    id: 16,
    type: 'single',
    content: 'Thuộc tính `JOptionPane.ERROR_MESSAGE` là ví dụ của?',
    options: [
      'Thành viên đối tượng (Instance member).',
      'Thành viên lớp (Static variable).',
      'Hằng số lớp (Static final constant).',
      'Biến toàn cục (Global variable).'
    ],
    correctAnswers: [2],
    rationale: 'Slide 28: Trong javax.swing.JOptionPane, các thuộc tính như ERROR_MESSAGE là `public static final int`, tức là hằng số lớp.'
  },
  {
    id: 17,
    type: 'single',
    content: 'Lớp nào trong Java cung cấp hàm `showMessageDialog`?',
    options: [
      'java.lang.System',
      'java.util.Scanner',
      'javax.swing.JOptionPane',
      'java.awt.Dialog'
    ],
    correctAnswers: [2],
    rationale: 'Slide 21: Lớp JOptionPane trong javax.swing chứa phương thức showMessageDialog.'
  },
  {
    id: 18,
    type: 'multiple',
    content: 'Những khai báo thành viên hằng nào sau đây là hợp lệ? (Chọn nhiều đáp án)',
    codeSnippet: '1) final double PI = 3.14;\n2) public final int VAL = 39;\n3) private final int[] A = {1,2};\n4) static final var = 10;',
    options: [
      'Khai báo 1',
      'Khai báo 2',
      'Khai báo 3',
      'Khai báo 4'
    ],
    correctAnswers: [0, 1, 2],
    rationale: 'Slide 27: 1, 2, 3 đều đúng. Khai báo 4 sai cú pháp vì thiếu kiểu dữ liệu sau final (phải là static final int var = 10).'
  },
  {
    id: 19,
    type: 'single',
    content: 'Trong Java, biến kiểu đối tượng (instance) khác với biến lớp (class) ở điểm cốt lõi nào?',
    options: [
      'Giá trị biến instance giống nhau cho mọi đối tượng, biến lớp thì khác.',
      'Biến instance được lưu trên Stack, biến lớp lưu trên Heap.',
      'Mỗi đối tượng có bản sao riêng của biến instance, biến lớp dùng chung 1 bản sao.',
      'Biến instance phải khai báo là final, biến lớp khai báo là static.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 29: Thành viên ĐT (mỗi đối tượng 1 bản sao), Thành viên Lớp (chung 1 bản sao).'
  },
  {
    id: 20,
    type: 'single',
    content: 'Phương thức `showConfirmDialog` trả về kiểu dữ liệu gì?',
    options: [
      'boolean (true/false)',
      'String ("YES"/"NO")',
      'int (đại diện cho YES_OPTION, NO_OPTION...)',
      'void'
    ],
    correctAnswers: [2],
    rationale: 'Slide 21: Bảng mô tả field summary cho thấy các giá trị trả về của showConfirmDialog (như YES_OPTION) là `static int`.'
  },
  
  // --- CHỦ ĐỀ 3: PASS BY VALUE & TRUYỀN THAM SỐ ---
  {
    id: 21,
    type: 'single',
    content: 'Java truyền tham số cho phương thức theo cơ chế nào?',
    options: [
      'Pass-by-reference (Truyền tham chiếu) cho đối tượng, Pass-by-value cho nguyên thủy.',
      'Luôn luôn Pass-by-value (Truyền giá trị).',
      'Luôn luôn Pass-by-reference.',
      'Tùy thuộc vào việc có dùng từ khóa ref hay không.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 32: Java truyền MỌI tham số dưới dạng giá trị (pass-by-value). Với tham chiếu, nó truyền bản sao của tham chiếu gốc.'
  },
  {
    id: 22,
    type: 'single',
    content: 'Hàm `swap` đổi chỗ 2 số nguyên sau đây có hoạt động đúng không? Vì sao?',
    codeSnippet: 'public void swap(int var1, int var2) {\n  int temp = var1;\n  var1 = var2;\n  var2 = temp;\n}',
    options: [
      'Đúng, vì mảng tạm temp đã giữ giá trị.',
      'Sai, vì var1 và var2 là bản sao của đối số truyền vào, không làm thay đổi biến gốc.',
      'Đúng, vì Java tự động mapping biến gốc và tham số.',
      'Sai, vì hàm void không cho phép thực hiện phép gán.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 33: Tham số kiểu nguyên thủy truyền giá trị/bản sao. Thay đổi tham số hình thức không ảnh hưởng đến tham số thực.'
  },
  {
    id: 23,
    type: 'single',
    content: 'Kết quả đoạn mã (Slide 36) in ra là gì?',
    codeSnippet: 'public static void change(Student std) {\n  std.setYear(2000);\n}\n// Gọi:\nStudent std = new Student("Nam", 1990);\nchange(std);\nSystem.out.println(std.getYear());',
    options: [
      '1990',
      '2000',
      'Lỗi biên dịch',
      'Ném ngoại lệ'
    ],
    correctAnswers: [1],
    rationale: 'Slide 36: Vì truyền bản sao của tham chiếu, cả bản sao và tham chiếu gốc cùng trỏ tới 1 đối tượng trên Heap. Gọi hàm `setYear` sẽ thay đổi dữ liệu của đối tượng đó.'
  },
  {
    id: 24,
    type: 'single',
    content: 'Kết quả đoạn mã (Slide 37) in ra là gì?',
    codeSnippet: 'public static void change(Student std) {\n  std = new Student("Hung", 1995);\n}\n// Gọi:\nStudent std = new Student("Nam", 1990);\nchange(std);\nSystem.out.println(std.getYear());',
    options: [
      '1990',
      '1995',
      'Lỗi NullPointerException',
      'In ra tham chiếu bộ nhớ'
    ],
    correctAnswers: [0],
    rationale: 'Slide 37: Việc gán `std = new Student()` bên trong hàm chỉ làm thay đổi bản sao tham chiếu (method reference) trỏ đến object mới, không ảnh hưởng đến tham chiếu gốc bên ngoài.'
  },
  {
    id: 25,
    type: 'single',
    content: 'Hàm `tricky` đổi tham chiếu của pnt1 và pnt2 như sau. Kết quả in ra sau khi gọi `tricky(pnt1, pnt2)` là?',
    codeSnippet: 'public static void tricky(Point arg1, Point arg2) {\n  arg1.setX(100);\n  arg1.setY(100);\n  Point temp = arg1;\n  arg1 = arg2;\n  arg2 = temp;\n}\n// Gọi với pnt1(0,0), pnt2(0,0)',
    options: [
      'pnt1: X:100 Y:100 | pnt2: X:0 Y:0',
      'pnt1: X:0 Y:0 | pnt2: X:100 Y:100',
      'pnt1: X:100 Y:100 | pnt2: X:100 Y:100',
      'pnt1: X:0 Y:0 | pnt2: X:0 Y:0'
    ],
    correctAnswers: [0],
    rationale: 'Slide 39: Lệnh setX, setY làm thay đổi pnt1 gốc. Nhưng phép hoán đổi gán arg1=arg2 chỉ đổi 2 bản sao tham chiếu cục bộ. Do đó pnt1 đổi state thành 100, pnt2 không bị ảnh hưởng.'
  },
  {
    id: 26,
    type: 'single',
    content: 'Cú pháp của Varargs (tham số tuỳ ý) trong Java là?',
    options: [
      'Kieu_dl[] ten_tham_so',
      'Kieu_dl... ten_tham_so',
      'Kieu_dl ten_tham_so...',
      'varargs Kieu_dl ten_tham_so'
    ],
    correctAnswers: [1],
    rationale: 'Slide 41: Cú pháp varargs là `ten_phuong_thuc(Kieu_dl... ten_tham_so)`.'
  },
  {
    id: 27,
    type: 'multiple',
    content: 'Bên trong phương thức, tham số varargs (ví dụ `int... arr`) được xử lý như kiểu dữ liệu nào? (Chọn nhiều đáp án)',
    options: [
      'Như một mảng (Array).',
      'Như một danh sách liên kết (LinkedList).',
      'Có thuộc tính .length.',
      'Sử dụng vòng lặp for-each (for(int i : arr)) để duyệt.'
    ],
    correctAnswers: [0, 2, 3],
    rationale: 'Slide 42 & 43: Varargs được coi như một mảng, có thuộc tính length và duyệt được bằng for-each.'
  },
  {
    id: 28,
    type: 'single',
    content: 'Đoạn mã tính tổng bằng varargs nào sau đây hợp lệ và không lỗi?',
    codeSnippet: '1) int plus(int... arr) { ... }\n2) int plus(int... arr, int b) { ... }\n3) int plus(int a, int... arr) { ... }\n4) int plus(int... a, int... b) { ... }',
    options: [
      'Chỉ 1',
      '1 và 3',
      '1 và 2',
      'Tất cả đều hợp lệ'
    ],
    correctAnswers: [1],
    rationale: 'Kiến thức cốt lõi Java: Varargs phải là tham số CUỐI CÙNG trong danh sách tham số. Nên 1 và 3 hợp lệ.'
  },
  {
    id: 29,
    type: 'single',
    content: 'Nếu có 1 tham số kiểu Object truyền vào hàm nhận bản sao tham chiếu, sau khi hàm kết thúc, Object đó có bị Garbage Collector thu gom ngay không?',
    options: [
      'Có, vì hàm đã kết thúc.',
      'Không, vì tham chiếu gốc bên ngoài vẫn đang trỏ đến Object đó.',
      'Tùy thuộc vào hàm có System.gc() hay không.',
      'Luôn luôn thu gom kể cả còn tham chiếu gốc.'
    ],
    correctAnswers: [1],
    rationale: 'Suy luận từ Slide 34: Original reference vẫn giữ Object trên Heap. Chừng nào original reference chưa bị hủy/gán null thì GC chưa dọn.'
  },
  {
    id: 30,
    type: 'single',
    content: 'Khi gọi phương thức `Math.sqrt(x)`, cơ chế truyền tham số là?',
    options: [
      'Pass-by-value vì x là kiểu nguyên thủy (double).',
      'Pass-by-reference vì Math là lớp Object.',
      'Truyền con trỏ địa chỉ.',
      'Pass-by-value đối với Math nhưng tham chiếu đối với sqrt.'
    ],
    correctAnswers: [0],
    rationale: 'Math.sqrt nhận tham số `double`, kiểu dữ liệu nguyên thủy luôn pass-by-value.'
  },

  // --- CHỦ ĐỀ 4: PACKAGES & WRAPPER CLASS ---
  {
    id: 31,
    type: 'multiple',
    content: 'Package trong Java mang lại những lợi ích gì? (Chọn nhiều đáp án)',
    options: [
      'Tránh xung đột tên lớp (trùng tên).',
      'Tự động giải phóng bộ nhớ.',
      'Bảo vệ các lớp, dữ liệu ở mức độ package (access modifier).',
      'Tổ chức và xác định vị trí lớp dễ dàng.'
    ],
    correctAnswers: [0, 2, 3],
    rationale: 'Slide 45: Package giúp tổ chức lớp, tránh xung đột tên, bảo vệ mã (access modifier).'
  },
  {
    id: 32,
    type: 'single',
    content: 'Tên đầy đủ (Fully qualified class name) của lớp `BankAccount` thuộc package `com.megabank.models` là?',
    options: [
      'models.BankAccount',
      'BankAccount.com.megabank',
      'com.megabank.models.BankAccount',
      'com.megabank.BankAccount'
    ],
    correctAnswers: [2],
    rationale: 'Slide 46: "Fully qualified" class name là com.megabank.models.BankAccount'
  },
  {
    id: 33,
    type: 'single',
    content: 'Package nào được Java import ngầm định vào TẤT CẢ các lớp?',
    options: [
      'java.util',
      'java.lang',
      'java.io',
      'java.math'
    ],
    correctAnswers: [1],
    rationale: 'Slide 50: java.lang được import ngầm định (chứa Object, String, Math...).'
  },
  {
    id: 34,
    type: 'single',
    content: 'Mục đích chính của Wrapper Class trong Java là gì?',
    options: [
      'Giúp chương trình chạy nhanh hơn.',
      'Gói dữ liệu nguyên thủy để cung cấp các phương thức và biến chúng thành Object.',
      'Tiết kiệm bộ nhớ so với dùng kiểu nguyên thủy.',
      'Ngăn chặn việc gán giá trị null.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 52: Gói dữ liệu nguyên thủy và cung cấp phương thức, vì kiểu nguyên thủy không có phương thức (không phải object).'
  },
  {
    id: 35,
    type: 'single',
    content: 'Hàm nào dùng để chuyển từ đối tượng Wrapper (ví dụ Float) về kiểu nguyên thủy tương ứng?',
    options: [
      'parse<type>() (VD: parseFloat)',
      'valueOf()',
      '<type>Value() (VD: floatValue)',
      'toString()'
    ],
    correctAnswers: [2],
    rationale: 'Slide 54: Sử dụng `<type>Value()` (vd `objF.floatValue()`) để chuyển từ object Wrapper thành giá trị nguyên thủy.'
  },
  {
    id: 36,
    type: 'multiple',
    content: 'Các khai báo nào sau đây là hợp lệ để chuyển đổi kiểu? (Chọn nhiều đáp án)',
    codeSnippet: '1) int i = Integer.parseInt("123");\n2) Double d = Double.valueOf("1.5");\n3) float f = Float.parse("4.5");\n4) long l = (new Double("-36.12")).longValue();',
    options: [
      'Khai báo 1',
      'Khai báo 2',
      'Khai báo 3',
      'Khai báo 4'
    ],
    correctAnswers: [0, 1, 3],
    rationale: 'Slide 54: parseInt và valueOf chuẩn cú pháp. Hàm của Float là `parseFloat` chứ không phải `parse`, nên 3 sai.'
  },
  {
    id: 37,
    type: 'single',
    content: 'Giá trị hằng số lớn nhất của kiểu `double` lấy từ wrapper class là gì?',
    options: [
      'Double.MAX_SIZE',
      'Double.MAX_VALUE',
      'Math.MAX_DOUBLE',
      'Double.INFINITY'
    ],
    correctAnswers: [1],
    rationale: 'Slide 56: Bảng hằng số Double chứa `Double.MAX_VALUE`.'
  },

  // --- CHỦ ĐỀ 5: STRING & STRINGBUFFER ---
  {
    id: 38,
    type: 'single',
    content: 'Đặc điểm "bất biến" (immutable) của String nghĩa là gì?',
    options: [
      'Không thể gán lại biến String bằng một String mới.',
      'Không thể truyền biến String vào phương thức.',
      'Đối tượng String không thay đổi giá trị nội dung trên Heap sau khi được tạo ra.',
      'Không thể sử dụng toán tử + với String.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 66: Bất biến nghĩa là đối tượng không thay đổi giá trị sau khi tạo ra. Mọi phép nối chuỗi sẽ tạo ra đối tượng mới.'
  },
  {
    id: 39,
    type: 'single',
    content: 'Kết quả của đoạn code in ra là?',
    codeSnippet: 'System.out.println("answer = " + 1 + 2 + 3);\nSystem.out.println("answer = " + (1 + 2 + 3));',
    options: [
      'answer = 123\nanswer = 6',
      'answer = 6\nanswer = 6',
      'answer = 123\nanswer = 123',
      'Lỗi biên dịch phép cộng khác kiểu'
    ],
    correctAnswers: [0],
    rationale: 'Slide 59: Chuỗi nối từ trái sang phải, "answer = " + 1 -> "answer = 1", nối tiếp thành 123. Khi có ngoặc (1+2+3) tính ra 6 trước rồi mới nối.'
  },
  {
    id: 40,
    type: 'multiple',
    content: 'Chọn những cách so sánh HAI XÂU `s1` và `s2` ĐÚNG BẢN CHẤT nhất trong Java: (Chọn nhiều đáp án)',
    options: [
      'Sử dụng s1 == s2 để so sánh nội dung chuỗi.',
      'Sử dụng s1.equals(s2) để so sánh nội dung chuỗi.',
      'Sử dụng s1.equalsIgnoreCase(s2) để so sánh không phân biệt hoa thường.',
      'Sử dụng s1 == s2 để so sánh địa chỉ (tham chiếu) của 2 đối tượng trên bộ nhớ.'
    ],
    correctAnswers: [1, 2, 3],
    rationale: 'Slide 61: s1 == s2 so sánh tham chiếu. s1.equals so sánh nội dung.'
  },
  {
    id: 41,
    type: 'single',
    content: 'Kết quả in ra là gì?',
    codeSnippet: 'String s1 = "Hello";\nString s2 = "Hello";\nString s4 = new String("Hello");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1 == s4);',
    options: [
      'true\ntrue',
      'false\nfalse',
      'true\nfalse',
      'false\ntrue'
    ],
    correctAnswers: [2],
    rationale: 'Slide 64 & 65: s1 và s2 trỏ chung vào "Hello" trong Common Pool (true). s4 dùng new String() tạo đối tượng mới trên Heap nên khác địa chỉ (false).'
  },
  {
    id: 42,
    type: 'single',
    content: 'Tại sao việc nối String trong vòng lặp lớn (ví dụ 1000 lần) lại bị coi là tốn kém bộ nhớ?',
    options: [
      'Vì biến tham chiếu bị tạo mới liên tục.',
      'Vì chuỗi String không thể bị Garbage Collector thu gom.',
      'Vì String bất biến, mỗi lần cộng chuỗi sẽ sinh ra một đối tượng String mới trên Heap.',
      'Vì Java giới hạn dung lượng của String pool.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 66: Do String là kiểu bất biến (immutable), mỗi lần nối chuỗi sẽ tạo ra đối tượng mới.'
  },
  {
    id: 43,
    type: 'single',
    content: 'Đoạn mã sau sử dụng StringBuffer, kết quả là gì?',
    codeSnippet: 'StringBuffer sb = new StringBuffer("hi");\nStringBuffer tb = sb;\ntb.append("gh");\nSystem.out.println(sb.toString());',
    options: [
      'hi',
      'gh',
      'high',
      'Lỗi NullPointerException'
    ],
    correctAnswers: [2],
    rationale: 'Slide 69: StringBuffer có tính biến đổi (mutable), sb và tb trỏ cùng 1 vùng nhớ. Gọi tb.append("gh") sửa đổi đối tượng đó nên sb cũng thành "high".'
  },
  {
    id: 44,
    type: 'single',
    content: 'Đoạn mã sau in ra giá trị length và capacity nào?',
    codeSnippet: 'StringBuffer buffer = new StringBuffer(15);\nbuffer.append("This is ");\nbuffer.append("String");\nbuffer.insert(7, " a");\nbuffer.append(\'.\');\nSystem.out.println(buffer.length());',
    options: [
      '15',
      '17',
      '32',
      '16'
    ],
    correctAnswers: [1],
    rationale: 'Slide 70: Nội dung thành "This is a String.", độ dài là 17. (Capacity ban đầu 15, sau đó tự mở rộng).'
  },
  {
    id: 45,
    type: 'single',
    content: 'Lệnh String s = "Joe Smith"; s.substring(2,5); trả về chuỗi nào?',
    options: [
      'oe ',
      'e S',
      'e Sm',
      'Joe'
    ],
    correctAnswers: [1],
    rationale: 'Slide 60: s.substring(2,5) lấy từ index 2 (là "e") đến index 4 (5-1) (là "S"). Kết quả "e S".'
  },

  // --- CHỦ ĐỀ 6: MATH & SYSTEM ---
  {
    id: 46,
    type: 'single',
    content: 'Các phương thức của lớp `java.lang.Math` có đặc điểm chung gì?',
    options: [
      'Cần tạo đối tượng Math (new Math()) để sử dụng.',
      'Đều là các thành viên static và thường nhận tham số kiểu double.',
      'Đều ném ra ArithmeticException nếu số âm.',
      'Thuộc package java.util.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 71 & 72: Các hàm của Math đều là static và hầu hết nhận/trả về kiểu double.'
  },
  {
    id: 47,
    type: 'multiple',
    content: 'Lớp `System` (java.lang.System) cung cấp những tính năng/hàm tiện ích nào? (Chọn nhiều đáp án)',
    options: [
      'System.out và System.in (luồng I/O chuẩn).',
      'System.currentTimeMillis()',
      'System.arraycopy()',
      'System.sqrt()'
    ],
    correctAnswers: [0, 1, 2],
    rationale: 'Slide 73 & 74: System cung cấp I/O chuẩn, currentTimeMillis, arraycopy. sqrt thuộc lớp Math.'
  },
  {
    id: 48,
    type: 'single',
    content: 'Lệnh `System.gc();` có chức năng gì?',
    options: [
      'Dừng hoàn toàn máy ảo Java (JVM).',
      'Giải phóng bộ nhớ ngay lập tức (Force).',
      'Yêu cầu (đề nghị) bộ thu gom rác (Garbage Collector) hoạt động.',
      'Đọc thuộc tính cấu hình của hệ điều hành.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 74: gc() chỉ YÊU CẦU bộ thu gom rác hoạt động, JVM quyết định khi nào thực sự dọn.'
  },
  {
    id: 49,
    type: 'single',
    content: 'Hàm nào dùng để lấy thông tin thư mục làm việc hiện tại (working directory) của chương trình?',
    options: [
      'System.getProperty("user.dir")',
      'System.getProperty("user.home")',
      'System.getProperty("java.class.path")',
      'System.getenv("PWD")'
    ],
    correctAnswers: [0],
    rationale: 'Slide 75: user.dir trả về thư mục hiện tại.'
  },
  {
    id: 50,
    type: 'single',
    content: 'Phương thức nào sau đây của System dùng để kết thúc hoạt động của JVM?',
    options: [
      'System.stop()',
      'System.terminate()',
      'System.gc()',
      'System.exit()'
    ],
    correctAnswers: [3],
    rationale: 'Slide 74: System.exit() kết thúc hoạt động JVM.'
  }
];

export default function OOPQuiz() {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8 sticky top-0 z-10 border-b-4 border-red-600">
          <div className="p-6 bg-red-700 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">HUST - Bài thi trắc nghiệm OOP (Bài 5)</h1>
            {submitted && (
              <div className="text-xl font-bold bg-white text-red-700 px-4 py-2 rounded-full shadow">
                Điểm: {score}/{questions.length}
              </div>
            )}
          </div>
          <div className="w-full bg-gray-200 h-2">
            <div className="bg-green-500 h-2 transition-all duration-300" style={{ width: `${progress}%` }}></div>
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
              <div key={q.id} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${submitted ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  <span className="text-red-600 mr-2">Câu {index + 1}:</span> 
                  {q.content} 
                </h3>
                
                {q.codeSnippet && (
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto text-sm my-4 font-mono shadow-inner">
                    <code>{q.codeSnippet}</code>
                  </pre>
                )}

                <div className="space-y-3 mt-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAns.includes(optIdx);
                    const isCorrectOpt = q.correctAnswers.includes(optIdx);
                    
                    let optionClasses = "flex items-center p-3 rounded-md border transition-all ";
                    
                    if (!submitted) {
                      optionClasses += isSelected ? "bg-red-50 border-red-300 shadow-sm" : "border-gray-200 hover:bg-gray-50 cursor-pointer";
                    } else {
                      if (isCorrectOpt) {
                        optionClasses += "bg-green-100 border-green-500 text-green-800 font-medium ";
                      } else if (isSelected && !isCorrectOpt) {
                        optionClasses += "bg-red-100 border-red-500 text-red-800 line-through ";
                      } else {
                        optionClasses += "opacity-60 border-gray-200 bg-gray-50 ";
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
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                            />
                          ) : (
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              readOnly
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                          )}
                        </div>
                        <span className="text-sm md:text-base text-gray-800">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-4 p-4 rounded-md text-sm ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className="font-semibold mb-1 flex items-center">
                      {isCorrect ? (
                        <><span className="text-green-600 text-lg mr-2">✓</span> Trả lời đúng</>
                      ) : (
                        <><span className="text-red-600 text-lg mr-2">✗</span> Trả lời sai</>
                      )}
                    </p>
                    <p className="text-gray-700"><span className="font-semibold text-gray-900">Giải thích:</span> {q.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Nộp Bài
            </button>
          </div>
        )}
        
        {submitted && (
          <div className="mt-8 text-center space-y-4">
             <div className="text-2xl font-bold text-gray-800">
               Kết quả của bạn: <span className={score >= 40 ? 'text-green-600' : 'text-red-600'}>{score} / {questions.length}</span>
             </div>
             <button 
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                Làm Lại Bài Thi
              </button>
          </div>
        )}
      </div>
    </div>
  );
}
