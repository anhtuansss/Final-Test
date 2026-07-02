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
  // ================= 20 CÂU LÝ THUYẾT PHÂN TÍCH SÂU =================
  {
    id: 1,
    type: 'single',
    content: 'Định nghĩa lại/Ghi đè (Method Overriding) có đặc điểm nào sau đây KHÁC BIỆT HOÀN TOÀN so với Chồng phương thức (Method Overloading)?',
    options: [
      'Ghi đè yêu cầu hai phương thức phải nằm trong cùng một lớp.',
      'Ghi đè yêu cầu chữ ký (signature) của phương thức ở lớp con phải hoàn toàn giống với phương thức ở lớp cha.',
      'Ghi đè cho phép lớp con thay đổi kiểu trả về một cách tùy ý.',
      'Ghi đè cho phép thay đổi số lượng tham số truyền vào.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 8: Ghi đè (Overriding) yêu cầu phương thức mới HOÀN TOÀN GIỐNG về chữ ký (tên và danh sách tham số). Nếu khác chữ ký, đó là Chồng phương thức (Overloading).'
  },
  {
    id: 2,
    type: 'single',
    content: 'Theo quy định trong Java, khi lớp con ghi đè một phương thức của lớp cha, chỉ định truy cập (Access Modifier) của phương thức mới phải như thế nào?',
    options: [
      'Bắt buộc phải giữ nguyên như phương thức ở lớp cha.',
      'Bắt buộc phải là public.',
      'Có chỉ định truy cập không giới hạn chặt hơn phương thức trong lớp cha.',
      'Có thể giới hạn chặt hơn (ví dụ cha là public, con có thể là protected).'
    ],
    correctAnswers: [2],
    rationale: 'Slide 14: Phương thức ghi đè phải có chỉ định truy cập "không giới hạn chặt hơn". Ví dụ cha là protected, con có thể là protected hoặc public, nhưng KHÔNG ĐƯỢC là private (weaker access privileges).'
  },
  {
    id: 3,
    type: 'multiple',
    content: 'Những loại phương thức nào trong lớp cha KHÔNG ĐƯỢC PHÉP ghi đè (override) ở lớp con? (Chọn nhiều đáp án)',
    options: [
      'Các phương thức khai báo với từ khóa `public`.',
      'Các phương thức khai báo với từ khóa `static`.',
      'Các phương thức khai báo với từ khóa `final`.',
      'Các phương thức khai báo với từ khóa `private`.'
    ],
    correctAnswers: [1, 2, 3],
    rationale: 'Slide 16: Không được phép ghi đè các phương thức static, private, và final trong lớp cha.'
  },
  {
    id: 4,
    type: 'single',
    content: 'Khi nào ta nên sử dụng từ khóa `final` cho một phương thức?',
    options: [
      'Khi muốn phương thức đó có thể được truy cập từ mọi package.',
      'Khi biết trước sẽ không cần/không cho phép định nghĩa lại (ghi đè) phương thức đó ở lớp dẫn xuất, nhằm đảm bảo tính đúng đắn và hiệu quả.',
      'Khi muốn phương thức đó tự động trở thành một abstract method.',
      'Khi muốn lớp con bắt buộc phải ghi đè phương thức đó.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 17: Dùng final cho phương thức để hạn chế việc định nghĩa lại, bảo vệ tính đúng đắn của logic gốc và tối ưu hiệu năng (kết nối tĩnh).'
  },
  {
    id: 5,
    type: 'single',
    content: 'Nếu một lớp được khai báo với từ khóa `final` (Ví dụ: `public final class A`), điều gì sẽ xảy ra?',
    options: [
      'Lớp đó không thể chứa các thuộc tính non-final.',
      'Lớp đó không thể được khởi tạo (instantiated).',
      'Lớp đó là lớp hằng, không thể có bất kỳ lớp con nào kế thừa từ nó.',
      'Lớp đó chỉ được phép kế thừa từ các lớp abstract.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 19: Lớp được khai báo là final là lớp hằng, không thay đổi, và không thể có lớp con kế thừa (ngăn chặn việc sửa đổi cây kế thừa).'
  },
  {
    id: 6,
    type: 'single',
    content: 'Mục đích chính của "Lớp trừu tượng" (Abstract Class) là gì?',
    options: [
      'Đóng vai trò làm kiểu tổng quát (base class) định nghĩa các khái niệm chung, để các lớp con (concrete class) kế thừa và làm rõ.',
      'Tăng tốc độ thực thi của chương trình nhờ cơ chế binding động.',
      'Để che giấu hoàn toàn dữ liệu, không cho phép lớp con kế thừa thuộc tính.',
      'Để thay thế hoàn toàn cho Interface trong mô hình đa kế thừa.'
    ],
    correctAnswers: [0],
    rationale: 'Slide 25: Lớp trừu tượng dùng để định nghĩa các "khái niệm chung", làm lớp cơ sở cho các lớp cụ thể khác. Không thể tạo đối tượng trực tiếp từ nó.'
  },
  {
    id: 7,
    type: 'single',
    content: 'Phát biểu nào sau đây ĐÚNG về phương thức trừu tượng (Abstract Method)?',
    options: [
      'Có chứa phần thân (body) với các cài đặt mặc định để lớp con dùng lại.',
      'Bắt buộc phải được khai báo với chỉ định truy cập `private`.',
      'Chỉ có chữ ký phương thức (signature) mà không có mã nguồn cài đặt cụ thể.',
      'Có thể khai báo là `final` để lớp con không thể thay đổi.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 26: Phương thức trừu tượng là phương thức chưa hoàn thiện, chỉ có chữ ký mà không có phần cài đặt cụ thể.'
  },
  {
    id: 8,
    type: 'multiple',
    content: 'Các tổ hợp từ khóa nào sau đây bị CẤM khi khai báo một phương thức trừu tượng? (Chọn nhiều đáp án)',
    options: [
      '`abstract public`',
      '`abstract private`',
      '`abstract static`',
      '`abstract final`'
    ],
    correctAnswers: [1, 2, 3],
    rationale: 'Slide 29: Không cho phép kết hợp `abstract private` (vì con không thấy để ghi đè), `abstract static` (thuộc về lớp, không ghi đè đa hình được), `abstract final` (cấm ghi đè).'
  },
  {
    id: 9,
    type: 'single',
    content: 'Theo sự phát triển của Java, Giao diện (Interface) trong Java 8 có thêm tính năng gì mới so với Java 7?',
    options: [
      'Cho phép khai báo thuộc tính private.',
      'Bổ sung Phương thức mặc định (default method) và Phương thức tĩnh (static method) có chứa thân hàm.',
      'Bổ sung Phương thức private (private methods).',
      'Cho phép một lớp kế thừa (extends) nhiều lớp khác nhau.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 56: Bảng so sánh cho thấy Java 8 bổ sung Phương thức mặc định (default) và Phương thức tĩnh (static) vào Interface.'
  },
  {
    id: 10,
    type: 'single',
    content: 'Vào thời điểm Java 9, Giao diện (Interface) được bổ sung thêm tính năng nào?',
    options: [
      'Static fields.',
      'Private methods và Private static methods.',
      'Protected methods.',
      'Abstract attributes.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 56 (và Slide 41): Từ Java 9, Interface có thêm phương thức private và private static để tái sử dụng mã nội bộ bên trong interface.'
  },
  {
    id: 11,
    type: 'single',
    content: 'Nếu bạn khai báo một thuộc tính `int x = 10;` bên trong một Giao diện (Interface), trình biên dịch sẽ ngầm định (implicit) biến này có các từ khóa nào?',
    options: [
      '`public abstract`',
      '`private static final`',
      '`public static final`',
      '`protected final`'
    ],
    correctAnswers: [2],
    rationale: 'Slide 48: Trong một Interface, các thuộc tính mặc định luôn là `public static final` (hằng số lớp).'
  },
  {
    id: 12,
    type: 'single',
    content: 'Lớp con thực thi một Interface (implements) bắt buộc phải làm gì nếu nó KHÔNG được khai báo là lớp trừu tượng (abstract)?',
    options: [
      'Cài đặt chi tiết toàn bộ các phương thức trừu tượng có trong giao diện.',
      'Khai báo lại giao diện đó bằng từ khóa extends.',
      'Tạo ra một đối tượng của giao diện bên trong hàm khởi tạo.',
      'Kế thừa tất cả các thuộc tính private của giao diện.'
    ],
    correctAnswers: [0],
    rationale: 'Slide 43: Lớp thực thi giao diện nếu là lớp cụ thể (concrete) thì bắt buộc phải cài đặt chi tiết toàn bộ các phương thức trong giao diện đó.'
  },
  {
    id: 13,
    type: 'single',
    content: 'Giao diện (Interface) được sinh ra nhằm giải quyết vấn đề cốt lõi nào trong Java?',
    options: [
      'Giải quyết tình trạng thiếu bộ nhớ khi khởi tạo đối tượng.',
      'Thay thế hoàn toàn cho các lớp trừu tượng.',
      'Giải quyết bài toán đa kế thừa (Multiple Inheritance) tránh các rắc rối nhập nhằng ngữ nghĩa (Diamond shape problem).',
      'Đóng gói dữ liệu bảo mật cấp cao.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 38-41: Java chỉ hỗ trợ đơn kế thừa với class. Interface được đưa vào để giải quyết vấn đề đa kế thừa (phòng tránh Diamond shape problem).'
  },
  {
    id: 14,
    type: 'single',
    content: 'Sự khác biệt cốt lõi về "Góc nhìn quan niệm" giữa Abstract Class và Interface là gì?',
    options: [
      'Interface mô tả "Cái gì" (Đặc tả) và ranh giới giao tiếp; Abstract Class thể hiện bản chất di truyền "Là một loại" (IS-A).',
      'Interface cung cấp cài đặt mặc định cho tất cả phương thức, Abstract class thì không.',
      'Interface có thể khởi tạo trực tiếp qua toán tử new, Abstract Class thì không.',
      'Abstract class có thể đa kế thừa, Interface chỉ hỗ trợ đơn kế thừa.'
    ],
    correctAnswers: [0],
    rationale: 'Slide 49 & 54: Interface là 1 "contract", phân chia ranh giới "What" và "How". Lớp trừu tượng thiên về quan hệ "IS-A" (Là một loại gì đó).'
  },
  {
    id: 15,
    type: 'multiple',
    content: 'Phát biểu nào sau đây ĐÚNG khi so sánh Abstract Class và Interface? (Chọn nhiều đáp án)',
    options: [
      'Abstract class có thể chứa thuộc tính non-final; Interface chỉ chứa thuộc tính hằng (final).',
      'Một lớp có thể implements nhiều Interface, nhưng chỉ có thể extends một Abstract class.',
      'Interface có thể chứa các phương thức có access modifier là `protected`.',
      'Abstract class có thể chứa các phương thức khởi tạo (constructors).'
    ],
    correctAnswers: [0, 1, 3],
    rationale: 'Slide 50: Abstract class có thể có thuộc tính non-final, có constructor, chỉ đơn kế thừa. Interface chỉ chứa hằng, đa kế thừa. Interface KHÔNG chứa phương thức protected.'
  },
  {
    id: 16,
    type: 'single',
    content: 'Nhược điểm lớn nhất của Interface (đặc biệt trước Java 8) so với Abstract Class trong việc thiết kế hướng đối tượng là gì?',
    options: [
      'Gây tốn quá nhiều bộ nhớ.',
      'Không hỗ trợ đa kế thừa.',
      'Không cung cấp một cách tự nhiên để tái sử dụng mã nguồn (code reuse) vì các lớp thực thi phải viết lại toàn bộ nội dung phương thức.',
      'Trình biên dịch chạy chậm hơn.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 51: Kế thừa nhằm tăng tái sử dụng mã nguồn, nhưng giao diện (thuần túy abstract methods) không làm được điều này vì lớp thực thi phải tự viết lại toàn bộ mã.'
  },
  {
    id: 17,
    type: 'single',
    content: 'Trong UML, nếu tên lớp hoặc tên phương thức được viết **In Nghiêng** (Italic), điều đó biểu diễn khái niệm gì?',
    options: [
      'Lớp tĩnh (Static Class) / Phương thức tĩnh.',
      'Lớp trừu tượng (Abstract Class) / Phương thức trừu tượng.',
      'Giao diện (Interface).',
      'Thuộc tính riêng tư (Private Attribute).'
    ],
    correctAnswers: [1],
    rationale: 'Slide 34: Biểu diễn trong UML: Tên lớp / tên phương thức chữ nghiêng biểu thị Lớp trừu tượng / Phương thức trừu tượng.'
  },
  {
    id: 18,
    type: 'single',
    content: 'Từ khóa `super.tên_phương_thức(...)` được sử dụng trong trường hợp nào?',
    options: [
      'Để gọi phương thức của đối tượng hiện tại thay vì đối tượng lớp cha.',
      'Để tái sử dụng đoạn mã, gọi lại phiên bản phương thức của LỚP CHA TRỰC TIẾP đã bị lớp con ghi đè.',
      'Để gọi phương thức khởi tạo của lớp cha.',
      'Để truy cập các biến private của lớp cha.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 13 & 20: `super.tên_phương_thức` để gọi các phương thức của lớp cha (tái sử dụng mã, đặc biệt khi phương thức đó đã bị ghi đè).'
  },
  {
    id: 19,
    type: 'single',
    content: 'Cú pháp nào ĐÚNG để một Interface kế thừa từ một Interface khác?',
    options: [
      '`interface A implements B {}`',
      '`interface A extends B {}`',
      '`interface A inherits B {}`',
      '`interface A super B {}`'
    ],
    correctAnswers: [1],
    rationale: 'Slide 42: Cú pháp giao diện con kế thừa giao diện cha là: `<Giao diện con> extends <Giao diện cha> { }`'
  },
  {
    id: 20,
    type: 'single',
    content: 'Khi nào một lớp con extends một Lớp trừu tượng nhưng CŨNG trở thành một Lớp trừu tượng?',
    options: [
      'Khi nó chứa từ khóa `final`.',
      'Khi nó khai báo lại các phương thức thành public.',
      'Khi nó KHÔNG ghi đè (cài đặt chi tiết) tất cả các phương thức trừu tượng của lớp cha.',
      'Bất kỳ lớp nào kế thừa abstract class đều mặc định là abstract class.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 29: Nếu không ghi đè các phương thức trừu tượng thì lớp con cũng trở thành một lớp trừu tượng (và phải khai báo thêm từ khóa abstract).'
  },

  // ================= 30 CÂU PHÂN TÍCH CODE JAVA (BẪY & ĐÁNH ĐỐ) =================
  {
    id: 21,
    type: 'single',
    content: 'Đoạn mã sau bị lỗi biên dịch ở dòng nào? (Lỗi Weak access privileges)',
    codeSnippet: `class Parent {
  protected int doSomething() { return 0; }
}
class Child extends Parent {
  void doSomething() { } // Dòng X
}`,
    options: [
      'Lỗi ở class Parent',
      'Lỗi ở class Child dòng X: attempting to assign weaker access privileges; was protected.',
      'Lỗi ở class Child dòng X: incompatible return type.',
      'Chương trình không có lỗi.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 15: Ở lớp cha, method là `protected`. Ở lớp con, access modifier là `default` (vì không ghi gì). `default` có quyền truy cập hẹp hơn `protected` -> Lỗi attempting to assign weaker access privileges.'
  },
  {
    id: 22,
    type: 'single',
    content: 'Kết quả biên dịch của đoạn mã sau?',
    codeSnippet: `class Parent {
  public void doSomething() {}
}
class Child extends Parent {
  public int doSomething() { return 1; }
}`,
    options: [
      'Chạy bình thường, ghi đè thành công.',
      'Lỗi biên dịch: incompatible return type.',
      'Lỗi biên dịch: overloaded method missing arguments.',
      'Chạy bình thường vì int có thể cast ngầm định.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 15: Ghi đè bắt buộc phải có CÙNG KIỂU TRẢ VỀ (với kiểu nguyên thủy). Đổi từ `void` sang `int` mà giữ nguyên signature sẽ báo lỗi incompatible return type.'
  },
  {
    id: 23,
    type: 'single',
    content: 'Đoạn mã sau có lỗi ở đâu?',
    codeSnippet: `class A {
  final void method() { }
}
class B extends A {
  void method() { System.out.println("B"); }
}`,
    options: [
      'Lỗi ở dòng class B extends A.',
      'Lỗi ở dòng khai báo hàm void method() trong B.',
      'Không có lỗi, in ra "B" nếu được gọi.',
      'Lỗi ở class A vì method final phải trả về giá trị.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 18: Các phương thức được khai báo là `final` KHÔNG THỂ bị ghi đè. Cố tình viết lại `void method()` trong lớp B sẽ gây lỗi biên dịch.'
  },
  {
    id: 24,
    type: 'multiple',
    content: 'Đoạn mã nào sau đây GÂY LỖI biên dịch? (Chọn nhiều đáp án)',
    codeSnippet: `// 1
abstract class Shape {}
Shape s = new Shape();

// 2
abstract class Animal { abstract void run(); }
class Dog extends Animal {}

// 3
abstract class Vehicle { abstract static void run(); }`,
    options: [
      'Đoạn 1',
      'Đoạn 2',
      'Đoạn 3',
      'Tất cả đều đúng, không có lỗi.'
    ],
    correctAnswers: [0, 1, 2],
    rationale: 'Đoạn 1: Lỗi vì instantiate (new) lớp abstract (Slide 27). Đoạn 2: Lỗi vì lớp Dog không cài đặt hàm `run()` cũng không khai báo abstract (Slide 29). Đoạn 3: Lỗi vì kết hợp `abstract static` (Slide 29).'
  },
  {
    id: 25,
    type: 'single',
    content: 'Cú pháp gọi `super` trong đoạn mã sau có đúng không?',
    codeSnippet: `class Person {
  protected String name;
  Person(String n) { name = n; }
}
class Employee extends Person {
  Employee(String n) {
    System.out.println("Init Employee");
    super(n);
  }
}`,
    options: [
      'Đúng, chương trình sẽ in ra "Init Employee" rồi gán name.',
      'Sai, lỗi biên dịch vì lệnh `super(n)` phải là lệnh ĐẦU TIÊN trong hàm khởi tạo của lớp con.',
      'Sai, vì Person không có hàm khởi tạo mặc định (no-args constructor).',
      'Đúng, vì super() có thể đặt ở bất cứ đâu trong hàm khởi tạo.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 13: Lệnh gọi `super(...)` để khởi tạo lớp cha BẮT BUỘC phải nằm ở dòng đầu tiên trong constructor của lớp con.'
  },
  {
    id: 26,
    type: 'single',
    content: 'Đa kế thừa (Multiple Inheritance) với default method ở Java 8. Kết quả in ra là gì?',
    codeSnippet: `interface Interface1 {
  default void doSomething() { System.out.println("I1"); }
}
interface Interface2 {
  default void doSomething() { System.out.println("I2"); }
}
public class MultiInheritance implements Interface1, Interface2 {
  public void doSomething() {
    Interface1.super.doSomething();
  }
  public static void main(String[] args) {
    new MultiInheritance().doSomething();
  }
}`,
    options: [
      'Lỗi biên dịch do đa kế thừa xung đột (Diamond shape).',
      'In ra "I1".',
      'In ra "I2".',
      'Lỗi biên dịch vì cú pháp Interface1.super sai.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 58: Để giải quyết xung đột đa thừa kế default method, lớp con override lại và gọi rõ ràng `Interface1.super.doSomething()`. Đoạn mã hợp lệ và in ra "I1".'
  },
  {
    id: 27,
    type: 'single',
    content: 'Lỗi xảy ra trong đoạn code sau là gì? (Ví dụ về Java 8 Static method trong Interface)',
    codeSnippet: `interface Interface3 {
  static void test() { System.out.println("test"); }
}
class MultiInheritance2 implements Interface3 {
  public static void main(String[] args) {
    MultiInheritance2 m = new MultiInheritance2();
    m.test(); // Dòng X
  }
}`,
    options: [
      'Lỗi tại Dòng X: Không thể gọi static method của Interface thông qua instance của lớp thực thi (m.test()).',
      'Lỗi tại khai báo `static void test()` trong interface (Java không hỗ trợ).',
      'Không có lỗi, in ra "test".',
      'Lỗi do thiếu từ khóa `public` trong hàm test().'
    ],
    correctAnswers: [0],
    rationale: 'Slide 64-65: Phương thức static trong Interface KHÔNG được kế thừa như method bình thường. Bắt buộc phải gọi bằng `InterfaceName.methodName()`. Gọi qua instance `m.test()` hoặc `MultiInheritance2.test()` sẽ báo lỗi biên dịch.'
  },
  {
    id: 28,
    type: 'single',
    content: 'Tiếp tục với Java 8 Interface Static Method. Câu lệnh nào HỢP LỆ để gọi hàm test() ở trên?',
    options: [
      '`m.test();` (m là instance)',
      '`MultiInheritance2.test();` (gọi qua tên class con)',
      '`Interface3.test();` (gọi trực tiếp qua tên Interface)',
      '`super.test();`'
    ],
    correctAnswers: [2],
    rationale: 'Slide 61: Static method của interface chỉ được gọi thông qua tên của chính Interface đó: `Interface3.test();`.'
  },
  {
    id: 29,
    type: 'single',
    content: 'Đoạn mã sau bị lỗi ở đâu?',
    codeSnippet: `interface DoiXung {
  int x = 5;
}
class HinhVuong implements DoiXung {
  public void thayDoi() {
    x = 10;
  }
}`,
    options: [
      'Lỗi ở `int x = 5;` do thiếu từ khóa `public static final`.',
      'Lỗi ở `x = 10;` vì x ngầm định là `final` (hằng số), không thể gán lại giá trị.',
      'Không có lỗi, vì lớp thực thi có quyền thay đổi biến của interface.',
      'Lỗi ở `implements DoiXung` vì HinhVuong không override thuộc tính x.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 48: Các thuộc tính trong Interface tự động là `static` và `final`. Do đó x là hằng số, lệnh `x = 10;` sẽ bị lỗi biên dịch.'
  },
  {
    id: 30,
    type: 'single',
    content: 'Đoạn mã in ra gì?',
    codeSnippet: `interface I {
  void doIt();
}
class A implements I {
  public void doIt() { System.out.print("A"); }
}
public class Main {
  public static void main(String[] args) {
    I obj = new A();
    obj.doIt();
  }
}`,
    options: [
      'Lỗi biên dịch do khởi tạo Interface I.',
      'Lỗi biên dịch vì method doIt() trong A phải là abstract.',
      'In ra "A".',
      'Lỗi Runtime ClassCastException.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 47: Giao diện có thể dùng làm kiểu dữ liệu (reference type) trỏ tới đối tượng của lớp thực thi. Gọi `obj.doIt()` sẽ chạy method của lớp A nhờ đa hình (dynamic binding).'
  },
  {
    id: 31,
    type: 'single',
    content: 'Khởi tạo Abstract Class lồng nhau. In ra gì?',
    codeSnippet: `abstract class Point {
  Point() { System.out.print("P"); }
  abstract void plot();
}
class ColoredPoint extends Point {
  ColoredPoint() { System.out.print("C"); }
  void plot() { System.out.print(" Plot"); }
}
public class Test {
  public static void main(String[] args) {
    Point p = new ColoredPoint();
    p.plot();
  }
}`,
    options: [
      'Lỗi biên dịch vì Point là abstract class.',
      'PC Plot',
      'C Plot',
      'P Plot'
    ],
    correctAnswers: [1],
    rationale: 'Dù Point là abstract class, khi khởi tạo `new ColoredPoint()`, constructor của lớp cha `Point()` vẫn được gọi (ngầm định `super()`). Do đó in "P", rồi đến "C", và cuối cùng gọi `plot()` in ra " Plot".'
  },
  {
    id: 32,
    type: 'single',
    content: 'Trong Interface, khai báo nào sau đây HỢP LỆ? (Xét theo Java 8+)',
    codeSnippet: `1. public static int answer = 42;
2. int answer;
3. final static int answer = 42;
4. private int answer = 42;`,
    options: [
      'Chỉ 1 và 3',
      'Tất cả đều hợp lệ',
      'Chỉ 1, 2, 3',
      'Chỉ 2 và 4'
    ],
    correctAnswers: [0],
    rationale: 'Slide 52 (Bài tập 4): Khai báo hợp lệ phải là khởi tạo có giá trị (vì là `final`). Cú pháp 2 sai vì chưa khởi tạo giá trị. Cú pháp 4 sai vì Interface attributes không được `private`. Do đó 1 và 3 đúng (có gán giá trị).'
  },
  {
    id: 33,
    type: 'single',
    content: 'Sử dụng abstract method trong constructor. Kết quả là gì?',
    codeSnippet: `abstract class Action {
  Action() { doAction(); }
  abstract void doAction();
}
class Game extends Action {
  int level = 5;
  void doAction() { System.out.print("Level " + level); }
}
public class Main {
  public static void main(String[] args) {
    new Game();
  }
}`,
    options: [
      'Level 5',
      'Level 0',
      'Lỗi biên dịch do gọi hàm abstract trong constructor.',
      'Lỗi Runtime.'
    ],
    correctAnswers: [1],
    rationale: 'Rất đánh đố (Polymorphism in constructor): Gọi `new Game()` -> chạy constructor cha `Action()` trước. Cha gọi `doAction()` - do tính đa hình, nó chạy hàm của `Game`. Tuy nhiên, lúc này thuộc tính `level` CHƯA ĐƯỢC gán giá trị 5 (vì thuộc tính con khởi tạo sau khi cha hoàn tất). Nó mang giá trị mặc định của int là 0. -> In ra "Level 0".'
  },
  {
    id: 34,
    type: 'single',
    content: 'Khi một interface extends một interface khác, đoạn code sau đúng hay sai?',
    codeSnippet: `interface A { void methodA(); }
interface B extends A { void methodB(); }
class C implements B {
  public void methodB() { }
}`,
    options: [
      'Đúng, chương trình dịch không lỗi.',
      'Sai, interface không thể extends interface khác.',
      'Sai, lớp C bắt buộc phải implement cả methodA() vì nó implements B (giao diện kế thừa A).',
      'Sai, phương thức methodB phải có từ khóa abstract.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 42 & 43: Interface B kế thừa A, tức là nó mang theo cả `methodA()`. Lớp C implement B, nếu không khai báo là abstract class thì BẮT BUỘC phải cài đặt CẢ `methodA()` và `methodB()`. Lỗi thiếu `methodA()`.'
  },
  {
    id: 35,
    type: 'single',
    content: 'Vấn đề xung đột ưu tiên: Class extends Class và implements Interface.',
    codeSnippet: `interface Interface3 {
  default void doSomething() { System.out.print("Interface3"); }
}
class Parent {
  public void doSomething() { System.out.print("Parent"); }
}
class Child extends Parent implements Interface3 {
  // Trống
}
// Nếu gọi new Child().doSomething();`,
    options: [
      'In ra "Interface3".',
      'In ra "Parent".',
      'Lỗi biên dịch vì đụng độ tên hàm.',
      'In ra cả hai.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 59: Java có quy tắc "Class win" (Lớp được ưu tiên hơn Interface). Khi thừa kế 1 phương thức cụ thể từ Parent và 1 default method cùng tên từ Interface, Java ưu tiên phương thức của Parent. Kết quả in "Parent".'
  },
  {
    id: 36,
    type: 'multiple',
    content: 'Chọn đoạn mã KHAI BÁO LỚP đúng (Chọn nhiều đáp án):',
    codeSnippet: `1. abstract class A extends B, C {}
2. class A implements B, C {}
3. interface A implements B {}
4. interface A extends B, C {}`,
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    correctAnswers: [1, 3],
    rationale: '1 sai vì class chỉ đơn kế thừa (extends 1 class). 2 đúng vì class đa thực thi interfaces. 3 sai vì interface kế thừa interface dùng `extends`. 4 đúng vì interface CÓ THỂ đa kế thừa các interface khác (bằng từ khóa `extends`).'
  },
  {
    id: 37,
    type: 'single',
    content: 'Đoạn mã Lớp trừu tượng (Slide 35, Bài tập 3.1) có lỗi gì không?',
    codeSnippet: `abstract class ABC {
  void firstMethod() { System.out.println("First"); }
  void secondMethod();
}`,
    options: [
      'Không có lỗi.',
      'Lỗi: phương thức secondMethod không có thân hàm nên BẮT BUỘC phải có từ khóa abstract.',
      'Lỗi: Lớp ABC không có phương thức abstract nào nên không được dùng từ khóa abstract.',
      'Lỗi: Lớp trừu tượng không được phép có phương thức đã cài đặt (firstMethod).'
    ],
    correctAnswers: [1],
    rationale: 'Slide 35: Hàm `secondMethod();` chấm phẩy ngay mà không có ngoặc nhọn `{}` tức là hàm trừu tượng. Hàm trừu tượng BẮT BUỘC phải đi kèm từ khóa `abstract` ở khai báo. Lỗi biên dịch.'
  },
  {
    id: 38,
    type: 'single',
    content: 'Class B extends abstract class A (Slide 35, Bài tập 3.2):',
    codeSnippet: `abstract class A { }
class B extends A { }`,
    options: [
      'Đoạn mã lỗi vì lớp A không có hàm abstract nào.',
      'Lớp A và B đều là lớp trừu tượng.',
      'Lớp A là trừu tượng (không thể tạo đối tượng), Lớp B là lớp cụ thể (concrete) và có thể khởi tạo đối tượng (new B()).',
      'Đoạn mã lỗi vì B không override method nào.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 35: Một lớp hoàn toàn có thể được khai báo là `abstract` dù không chứa method abstract nào. Lớp B kế thừa bình thường và không có hàm abstract nào bị ép phải cài đặt -> B là lớp cụ thể có thể tạo đối tượng.'
  },
  {
    id: 39,
    type: 'single',
    content: 'Trong đa kế thừa Interface, làm sao để con truy cập biến của Interface mẹ bị trùng lặp?',
    codeSnippet: `interface I1 { int VALUE = 1; }
interface I2 { int VALUE = 2; }
class C implements I1, I2 {
  public void print() {
    System.out.println(VALUE); // Dòng X
  }
}`,
    options: [
      'In ra 1',
      'In ra 2',
      'Lỗi biên dịch ở Dòng X do nhập nhằng (ambiguous) tham chiếu VALUE.',
      'In ra mảng [1, 2]'
    ],
    correctAnswers: [2],
    rationale: 'Hai giao diện có cùng hằng số `VALUE`. Trong lớp C, gọi trực tiếp `VALUE` trình biên dịch không biết là của I1 hay I2 -> Báo lỗi nhập nhằng (ambiguous). Phải gọi `I1.VALUE` hoặc `I2.VALUE`.'
  },
  {
    id: 40,
    type: 'single',
    content: 'Đoạn mã lỗi ở dòng nào?',
    codeSnippet: `class Vehicle {
  protected void move() {}
}
class Car extends Vehicle {
  public void move(int speed) {} // Dòng 1
  private void move() {} // Dòng 2
}`,
    options: [
      'Dòng 1 bị lỗi do thay đổi tham số truyền vào.',
      'Dòng 2 bị lỗi do attempting to assign weaker access privileges.',
      'Cả hai dòng đều lỗi.',
      'Không có lỗi.'
    ],
    correctAnswers: [1],
    rationale: 'Dòng 1 là Overloading (hợp lệ vì khác tham số). Dòng 2 là Overriding (cùng signature `move()`), cha là `protected`, con hạ xuống `private` là vi phạm quy tắc "không giới hạn chặt hơn". Lỗi tại Dòng 2.'
  },
  {
    id: 41,
    type: 'single',
    content: 'Nếu một phương thức ở lớp cha khai báo ném ngoại lệ (throws Exception), khi override ở lớp con thì sao? (Kiến thức mở rộng logic Ghi đè)',
    options: [
      'Bắt buộc phải ném cùng loại ngoại lệ hoặc ngoại lệ hẹp hơn (sub-class Exception), không được ném ngoại lệ rộng hơn.',
      'Phải bỏ hoàn toàn throws đi.',
      'Có thể ném bất kỳ loại ngoại lệ nào.',
      'Không quan tâm ngoại lệ, chỉ cần chữ ký và kiểu trả về giống.'
    ],
    correctAnswers: [0],
    rationale: 'Quy tắc chuẩn Java về Override: Lớp con không được phép ném ra Checked Exception mới hoặc rộng hơn (broader) so với ngoại lệ mà lớp cha khai báo.'
  },
  {
    id: 42,
    type: 'single',
    content: 'Java 8 Default methods: Đoạn code sau có biên dịch được không?',
    codeSnippet: `interface Test {
  default String getMessage();
}`,
    options: [
      'Được, đây là hàm trừu tượng mặc định.',
      'Lỗi, vì method `default` BẮT BUỘC PHẢI có thân hàm (body: `{}`).',
      'Được, nếu class kế thừa tự viết thân hàm.',
      'Lỗi, vì thiếu từ khóa `abstract`.'
    ],
    correctAnswers: [1],
    rationale: 'Từ khóa `default` trong Interface sinh ra để cung cấp CÀI ĐẶT MẶC ĐỊNH. Do đó nó KHÔNG THỂ vắng mặt thân hàm `{ ... }`. Dấu chấm phẩy `;` sẽ gây lỗi biên dịch.'
  },
  {
    id: 43,
    type: 'single',
    content: 'Tính chất kế thừa bắc cầu (Grandparent - Parent - Child):',
    codeSnippet: `class A { void show() { System.out.print("A"); } }
class B extends A { void show() { System.out.print("B"); } }
class C extends B { 
  void callA() { 
    super.super.show(); // Dòng X
  }
}`,
    options: [
      'In ra "A".',
      'In ra "B".',
      'Lỗi biên dịch: Không cho phép cú pháp `super.super`.',
      'Lỗi Runtime.'
    ],
    correctAnswers: [2],
    rationale: 'Cú pháp Java cấm việc bỏ qua hệ thống kế thừa bằng cách sử dụng `super.super`. Dòng X gây lỗi biên dịch trực tiếp. Thiết kế OOP buộc tương tác qua thế hệ trực tiếp (cha).'
  },
  {
    id: 44,
    type: 'multiple',
    content: 'Đoạn mã xây dựng Shape (Slide 70). Phân tích đúng/sai: (Chọn nhiều đáp án)',
    codeSnippet: `abstract class Shape {
  protected String color;
  public Shape(String c) { color = c; }
  abstract double getArea();
}
class Circle extends Shape {
  // Code here
}`,
    options: [
      'Nếu Circle không override getArea(), Circle sẽ bị lỗi trừ khi nó khai báo là abstract class.',
      'Nếu Circle không khai báo hàm tạo gọi super(c), trình biên dịch sẽ báo lỗi vì Shape không có constructor mặc định.',
      'Circle có thể tự do thay đổi biến `color` vì nó được kế thừa dạng protected.',
      'Shape s = new Shape("Red"); là câu lệnh hợp lệ.'
    ],
    correctAnswers: [0, 1, 2],
    rationale: '1 đúng (Slide 29). 2 đúng (Slide 13, bắt buộc gọi super nếu cha không có default constructor). 3 đúng (`protected` biến thừa kế dùng được trong lớp con). 4 sai vì Shape là abstract không thể new.'
  },
  {
    id: 45,
    type: 'single',
    content: 'Cách gọi `this()` trong constructor.',
    codeSnippet: `class MyClass {
  int x, y;
  MyClass() { this(1, 1); System.out.print("A"); }
  MyClass(int x, int y) { this.x = x; this.y = y; System.out.print("B"); }
}
// Khi gọi new MyClass() in ra gì?`,
    options: [
      'A B',
      'B A',
      'Chỉ in A',
      'Lỗi biên dịch'
    ],
    correctAnswers: [1],
    rationale: '`new MyClass()` chạy vào constructor không tham số. Lệnh đầu tiên `this(1,1)` chuyển hướng điều khiển sang constructor 2 tham số. Nó gán x, y và in ra "B". Xong quay lại in tiếp "A". Output: B A.'
  },
  {
    id: 46,
    type: 'single',
    content: 'Lỗi che khuất biến (Variable Hiding):',
    codeSnippet: `class Parent { String name = "Parent"; }
class Child extends Parent { 
  String name = "Child";
  void print() { System.out.println(name + " " + super.name); }
}
// Gọi new Child().print();`,
    options: [
      'Child Parent',
      'Child Child',
      'Parent Parent',
      'Lỗi vì không được khai báo trùng tên biến.'
    ],
    correctAnswers: [0],
    rationale: 'Được phép khai báo trùng tên (Variable hiding). Biến `name` nội bộ ưu tiên lấy của Child. `super.name` truy cập bản sao của Parent. Output: Child Parent.'
  },
  {
    id: 47,
    type: 'single',
    content: 'Chức năng thực sự của `abstract` method là gì khi không có body?',
    options: [
      'Để gây khó dễ cho người dùng API.',
      'Để trình biên dịch tự động sinh code tối ưu.',
      'Để ép buộc (force) mọi lớp con (concrete subclass) phải tuân thủ và triển khai hành vi đó theo nghiệp vụ riêng của nó (Contract).',
      'Để lưu tạm tên hàm khi lập trình viên chưa nghĩ ra cách viết.'
    ],
    correctAnswers: [2],
    rationale: 'Tạo ra bản giao kèo (Contract). Ép các lớp con cụ thể phải tự implement logic riêng (ví dụ Hàm getArea() cho từng hình dạng khác nhau).'
  },
  {
    id: 48,
    type: 'multiple',
    content: 'Cho đoạn mã Đa kế thừa giao diện:',
    codeSnippet: `interface CanFly { void fly(); }
interface CanSwim { void swim(); }
class Bird implements CanFly, CanSwim {
  public void fly() {}
  public void swim() {}
}`,
    options: [
      'Mã hợp lệ, Java cho phép đa kế thừa nhiều Interfaces.',
      'Lỗi vì class Bird không thể implements hơn 1 interface.',
      'Các hàm fly() và swim() trong Bird bắt buộc phải là public.',
      'Nếu Bird không implement fly(), Bird phải khai báo abstract.'
    ],
    correctAnswers: [0, 2, 3],
    rationale: 'Java hỗ trợ đa thừa kế interface (Slide 43). Phương thức trong interface mặc định là `public abstract`, nên khi override ở class bắt buộc phải để `public` (không hạ quyền truy cập). Nếu thiếu hàm thì class phải là abstract.'
  },
  {
    id: 49,
    type: 'single',
    content: 'Có thể tạo đối tượng của Lớp trừu tượng thông qua Anonymous Class (Lớp ẩn danh) không?',
    codeSnippet: `abstract class Base { abstract void log(); }
// Bên trong hàm main:
Base b = new Base() { 
  void log() { System.out.println("Ok"); } 
};`,
    options: [
      'Không, tuyệt đối không thể dùng toán tử new với tên lớp abstract.',
      'Có, đoạn mã trên hợp lệ vì nó sinh ra một lớp con ẩn danh implements tức thời các hàm abstract.',
      'Lỗi vì cú pháp {} đi ngay sau new Base().',
      'Lỗi vì hàm log() thiếu từ khóa override.'
    ],
    correctAnswers: [1],
    rationale: 'Tuyệt chiêu OOP: Có thể khởi tạo thông qua Anonymous Inner Class. Code tạo ra một subclass vô danh kế thừa Base và cung cấp implementation ngay tại chỗ.'
  },
  {
    id: 50,
    type: 'single',
    content: 'Khi sử dụng Ép kiểu (Casting) trong phân cấp Kế thừa:',
    codeSnippet: `Person p = new Employee();
Employee e = (Employee) p; // Dòng 1
Manager m = (Manager) p; // Dòng 2`,
    options: [
      'Dòng 1 đúng (Downcasting hợp lệ), Dòng 2 ném ClassCastException (Runtime Error).',
      'Dòng 1 và 2 đều ném lỗi.',
      'Lỗi biên dịch ngay từ dòng 1.',
      'Dòng 1 và 2 đều chạy tốt do tính đa hình.'
    ],
    correctAnswers: [0],
    rationale: 'Biến `p` bản chất đang trỏ tới object `Employee`. Ép về `Employee` (Dòng 1) là đúng bản chất. Ép về `Manager` (Dòng 2) là sai bản chất của vùng nhớ -> Ném lỗi ClassCastException lúc chạy.'
  }
];

export default function OOPInheritanceQuiz() {
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
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8 sticky top-0 z-10 border-b-4 border-blue-600">
          <div className="p-6 bg-blue-700 text-white flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">HUST - Bài thi OOP (Bài 7: Các Kỹ Thuật Trong Kế Thừa)</h1>
            {submitted && (
              <div className="text-xl font-bold bg-white text-blue-700 px-4 py-2 rounded-full shadow">
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-relaxed">
                  <span className="text-blue-600 mr-2">Câu {index + 1}:</span> 
                  {q.content} {q.type === 'multiple' && <span className="text-sm font-normal text-blue-500 ml-1">(Chọn nhiều đáp án)</span>}
                </h3>
                
                {q.codeSnippet && (
                  <pre className="bg-slate-800 text-green-400 p-4 rounded-md overflow-x-auto text-sm my-4 font-mono shadow-inner">
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
                        ? "bg-blue-50 border-blue-300 shadow-sm text-blue-900 font-medium" 
                        : "border-gray-200 hover:bg-gray-50 cursor-pointer text-gray-800";
                    } else {
                      if (isCorrectOpt) {
                        optionClasses += "bg-green-100 border-green-500 text-green-800 font-medium ";
                      } else if (isSelected && !isCorrectOpt) {
                        optionClasses += "bg-red-100 border-red-500 text-red-800 line-through ";
                      } else {
                        optionClasses += "opacity-60 border-gray-200 bg-gray-50 text-gray-800 ";
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
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                          ) : (
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              readOnly
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          )}
                        </div>
                        <span className="text-sm md:text-base">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-4 p-4 rounded-md text-sm ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className="font-semibold mb-2 flex items-center">
                      {isCorrect ? (
                        <><span className="text-green-600 text-lg mr-2">✓</span> Trả lời đúng</>
                      ) : (
                        <><span className="text-red-600 text-lg mr-2">✗</span> Trả lời sai</>
                      )}
                    </p>
                    <p className="text-gray-700 leading-relaxed"><span className="font-semibold text-gray-900">Giải thích:</span> {q.rationale}</p>
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
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Nộp Bài & Chấm Điểm
            </button>
          </div>
        )}
        
        {submitted && (
          <div className="mt-10 p-6 bg-white rounded-lg shadow-xl text-center space-y-4 border-t-4 border-blue-600">
             <div className="text-3xl font-bold text-gray-800">
               Kết quả của bạn: <span className={score >= 40 ? 'text-green-600' : 'text-red-600'}>{score} / {questions.length}</span>
             </div>
             <p className="text-gray-600">
               {score >= 45 ? 'Xuất sắc! Bạn nắm cực kỳ vững bản chất của Lập trình Hướng đối tượng.' 
                : score >= 35 ? 'Rất tốt! Bạn đã vượt qua được hầu hết các bẫy cơ bản.' 
                : 'Bạn cần ôn tập kỹ hơn về Ghi đè phương thức, Lớp trừu tượng và Giao diện nhé!'}
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